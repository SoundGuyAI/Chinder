/* Chinder app logic. All state is client-side (memory only, per page session).
   Nothing the user answers or types is sent anywhere. */

(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  function imgFor(p) {
    if (window.CHINDER_IMGS && window.CHINDER_IMGS[p.id]) return window.CHINDER_IMGS[p.id];
    return "./assets/profiles/" + p.id + ".jpg";
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  var screens = {
    gate: $("screen-gate"),
    deck: $("screen-deck"),
    inbox: $("screen-inbox"),
    match: $("screen-match"),
    chat: $("screen-chat")
  };

  function show(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.toggle("active", k === name);
    });
  }

  /* ---------------- Gate / screening ---------------- */

  var ROLE_QUESTIONS = [
    "Are you a different kind of big shot? CTO, CFO, Chief Anything Officer?",
    "Okay... a VP? Head of department? Director of Something Important?",
    "A senior engineer, then? With production access?",
    "An intern who overhears things near meeting rooms?"
  ];

  var gateStep = 0; // 0 = CEO question, 1..4 = role questions

  function renderGate() {
    var q = $("gate-question"), a = $("gate-answers"), note = $("gate-note");
    a.innerHTML = "";
    if (gateStep === 0) {
      q.textContent = "Are you a CEO?";
      note.textContent = "";
    } else if (gateStep === 1) {
      q.textContent = ROLE_QUESTIONS[0];
      note.textContent = "Sorry, we're only interested in company secrets.";
    } else {
      q.textContent = ROLE_QUESTIONS[gateStep - 1];
      note.textContent = "Hm. Not even a little important?";
    }
    var yes = document.createElement("button");
    yes.textContent = "Yes";
    var no = document.createElement("button");
    no.textContent = "No";
    no.className = "no";
    yes.addEventListener("click", function () { gateAnswer(true); });
    no.addEventListener("click", function () { gateAnswer(false); });
    a.appendChild(yes);
    a.appendChild(no);
  }

  function gateAnswer(isYes) {
    var note = $("gate-note");
    if (isYes) {
      note.textContent = gateStep === 0 ? "Perfect. Right this way." : "Close enough. Welcome.";
      setTimeout(startDeck, 900);
      return;
    }
    gateStep++;
    if (gateStep > ROLE_QUESTIONS.length) {
      $("gate-question").textContent = "Oh well. You can still try it.";
      $("gate-answers").innerHTML = "";
      note.textContent = "";
      var b = document.createElement("button");
      b.textContent = "Enter Chinder";
      b.addEventListener("click", startDeck);
      $("gate-answers").appendChild(b);
      return;
    }
    renderGate();
  }

  /* ---------------- Matches ---------------- */

  var matches = {}; // profile id -> chat state, in match order via matchOrder
  var matchOrder = [];

  function isMatched(p) { return !!matches[p.id]; }

  function updateInboxBadge() {
    var badge = $("inbox-badge");
    var n = matchOrder.length;
    badge.textContent = n;
    badge.classList.toggle("hidden", n === 0);
  }

  /* ---------------- Swipe deck ---------------- */

  var deck = [];
  var current = null;

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function startDeck() {
    deck = shuffle(PROFILES.filter(function (p) { return !isMatched(p); }));
    renderDeck();
    updateInboxBadge();
    show("deck");
  }

  function renderDeck() {
    var el = $("deck");
    el.innerHTML = "";
    $("deck-empty").classList.toggle("hidden", deck.length > 0);
    $("deck-sub").textContent = deck.length > 0 ? deck.length + " admirers nearby" : "no admirers left";
    // Render top two cards for depth.
    deck.slice(0, 2).reverse().forEach(function (p, idx, arr) {
      el.appendChild(makeCard(p, idx === arr.length - 1));
    });
    current = deck[0] || null;
  }

  function makeCard(p, isTop) {
    var card = document.createElement("div");
    card.className = "swipe-card";
    card.style.backgroundImage = "url('" + imgFor(p) + "')";
    if (!isTop) { card.style.transform = "scale(0.96) translateY(10px)"; card.style.pointerEvents = "none"; }
    card.innerHTML =
      '<div class="gradient"></div>' +
      '<div class="stamp like">LIKE</div>' +
      '<div class="stamp nope">NOPE</div>' +
      '<div class="info">' +
        '<div class="name-line">' + p.name + ' <span class="age">' + p.age + '</span></div>' +
        '<div class="job">' + p.job + '</div>' +
        '<div class="bio">' + p.bio + '</div>' +
      '</div>';
    if (isTop) attachDrag(card, p);
    return card;
  }

  function attachDrag(card, p) {
    var startX = 0, dx = 0, dragging = false;
    var likeStamp = card.querySelector(".stamp.like");
    var nopeStamp = card.querySelector(".stamp.nope");

    function move(x) {
      dx = x - startX;
      var rot = dx / 18;
      card.style.transform = "translateX(" + dx + "px) rotate(" + rot + "deg)";
      likeStamp.style.opacity = Math.max(0, Math.min(1, dx / 90));
      nopeStamp.style.opacity = Math.max(0, Math.min(1, -dx / 90));
    }
    function end() {
      if (!dragging) return;
      dragging = false;
      card.style.transition = "transform .25s ease";
      if (dx > 90) { fly(card, 1); setTimeout(function () { swipe(p, true); }, 200); }
      else if (dx < -90) { fly(card, -1); setTimeout(function () { swipe(p, false); }, 200); }
      else { card.style.transform = ""; likeStamp.style.opacity = 0; nopeStamp.style.opacity = 0; }
      setTimeout(function () { card.style.transition = ""; }, 260);
    }
    card.addEventListener("pointerdown", function (e) {
      dragging = true; startX = e.clientX; dx = 0;
      card.setPointerCapture(e.pointerId);
      card.style.transition = "";
    });
    card.addEventListener("pointermove", function (e) { if (dragging) move(e.clientX); });
    card.addEventListener("pointerup", end);
    card.addEventListener("pointercancel", end);
  }

  function fly(card, dir) {
    card.style.transform = "translateX(" + (dir * 140) + "%) rotate(" + (dir * 25) + "deg)";
    card.style.opacity = "0";
  }

  function swipe(p, liked) {
    var topCard = $("deck").querySelector(".swipe-card");
    if (topCard) { fly(topCard, liked ? 1 : -1); }
    deck = deck.filter(function (x) { return x.id !== p.id; });
    setTimeout(renderDeck, 180);
    if (liked) {
      setTimeout(function () { openMatch(p); }, 350);
    }
  }

  $("btn-like").addEventListener("click", function () { if (current) swipe(current, true); });
  $("btn-nope").addEventListener("click", function () { if (current) swipe(current, false); });
  $("btn-reshuffle").addEventListener("click", startDeck);
  $("btn-inbox").addEventListener("click", openInbox);

  /* ---------------- Inbox ---------------- */

  function openInbox() {
    renderInbox();
    show("inbox");
  }

  function renderInbox() {
    var list = $("inbox-list");
    list.innerHTML = "";
    var n = matchOrder.length;
    $("inbox-sub").textContent = n === 0
      ? "No matches yet. They all like you back, it's basically guaranteed."
      : n + (n === 1 ? " admirer waiting" : " admirers waiting");
    matchOrder.slice().reverse().forEach(function (id) {
      var st = matches[id];
      var p = st.profile;
      var row = document.createElement("button");
      row.className = "inbox-row";
      var img = document.createElement("img");
      img.className = "inbox-avatar";
      img.src = imgFor(p);
      img.alt = "";
      var mid = document.createElement("div");
      mid.className = "inbox-mid";
      var nm = document.createElement("div");
      nm.className = "inbox-name";
      nm.textContent = p.name;
      var sn = document.createElement("div");
      sn.className = "inbox-snippet";
      var last = st.messages.length ? st.messages[st.messages.length - 1] : null;
      sn.textContent = last ? (last.dir === "out" ? "You: " : "") + last.text : "Say hi before she loses interest.";
      mid.appendChild(nm);
      mid.appendChild(sn);
      var st2 = document.createElement("div");
      st2.className = "inbox-status" + (st.phase === "silent" || st.phase === "ghost" ? "" : " online");
      st2.textContent = st.statusText || "online";
      row.appendChild(img);
      row.appendChild(mid);
      row.appendChild(st2);
      row.addEventListener("click", function () { openChat(p); });
      list.appendChild(row);
    });
  }

  $("btn-inbox-back").addEventListener("click", function () { show("deck"); });

  /* ---------------- Match overlay ---------------- */

  var matchProfile = null;

  function openMatch(p) {
    matchProfile = p;
    ensureMatch(p);
    $("match-photo").src = imgFor(p);
    $("match-sub").textContent = "You and " + p.name + " have liked each other's... profiles.";
    show("match");
  }

  $("btn-chat").addEventListener("click", function () { openChat(matchProfile); });
  $("btn-keep-swiping").addEventListener("click", function () { startDeck(); });
  $("btn-back").addEventListener("click", function () {
    clearChatTimers();
    chat = null;
    openInbox();
  });

  /* ---------------- Chat ---------------- */

  var chat = null;      // active chat state
  var allTimers = [];

  function clearChatTimers() {
    allTimers.forEach(clearTimeout);
    allTimers = [];
    hideTyping();
  }

  function schedule(arr, ms, fn) { var t = setTimeout(fn, ms); arr.push(t); return t; }

  function ensureMatch(p) {
    if (!matches[p.id]) {
      var map = PROFILE_SCRIPTS[p.id] || { script: "s1", ghost: "g1" };
      matches[p.id] = {
        profile: p,
        script: CHAT_SCRIPTS[map.script],
        ghost: GHOST_VARIANTS[map.ghost],
        messages: [],        // {text, dir, meta}
        qIndex: 0,
        awaiting: false,     // a question is on screen waiting for a tap
        phase: "questions",  // questions -> ghost -> silent
        ghostStepIdx: 0,
        ghostReplyIndex: 0,
        statusText: "online",
        statusOnline: true
      };
      matchOrder.push(p.id);
      updateInboxBadge();
    }
    return matches[p.id];
  }

  function setStatus(text, online) {
    var el = $("chat-status");
    el.textContent = text;
    el.classList.toggle("online", !!online);
    if (chat) { chat.statusText = text; chat.statusOnline = !!online; }
  }

  function scrollLog() {
    var log = $("chat-log");
    log.scrollTop = log.scrollHeight;
  }

  function addMsg(text, dir, meta) {
    if (chat) chat.messages.push({ text: text, dir: dir, meta: meta || null });
    return appendMsgNode({ text: text, dir: dir, meta: meta || null });
  }

  function appendMsgNode(m) {
    var log = $("chat-log");
    var el = document.createElement("div");
    el.className = "msg " + m.dir;
    el.textContent = m.text;
    if (m.meta) {
      var s = document.createElement("span");
      s.className = "meta";
      s.textContent = m.meta;
      el.appendChild(s);
    }
    log.appendChild(el);
    scrollLog();
    return el;
  }

  function showTyping() {
    hideTyping();
    var t = document.createElement("div");
    t.className = "typing";
    t.id = "typing-indicator";
    t.innerHTML = "<span></span><span></span><span></span>";
    $("chat-log").appendChild(t);
    scrollLog();
  }
  function hideTyping() {
    var t = $("typing-indicator");
    if (t) t.remove();
  }

  // Show typing dots for `typingMs`, then optionally post msg, then callback.
  function typeThenSay(msg, typingMs, cb) {
    if (typeof typingMs === "function") { cb = typingMs; typingMs = 1600 + Math.random() * 1400; }
    showTyping();
    schedule(allTimers, typingMs, function () {
      hideTyping();
      if (msg) addMsg(msg, "in");
      if (cb) schedule(allTimers, 600, cb);
    });
  }

  function openChat(p) {
    clearChatTimers();
    chat = ensureMatch(p);
    $("chat-name").textContent = p.name;
    $("chat-avatar").src = imgFor(p);
    var st = $("chat-status");
    st.textContent = chat.statusText;
    st.classList.toggle("online", chat.statusOnline);
    var log = $("chat-log");
    log.innerHTML = "";
    chat.messages.forEach(appendMsgNode);
    $("chat-buttons").classList.add("hidden");
    $("chat-input-row").classList.toggle("hidden", chat.phase === "questions");
    show("chat");
    resumeChat();
  }

  // Pick up where this match's conversation left off.
  function resumeChat() {
    if (chat.messages.length === 0) {
      schedule(allTimers, 1200, function () {
        if (!chat) return;
        typeThenSay(chat.profile.opener, function () { if (chat) askNextQuestion(); });
      });
      return;
    }
    if (chat.phase === "questions") {
      if (chat.awaiting) {
        showAnswerButtons(chat.script.questions[chat.qIndex]);
      } else {
        schedule(allTimers, 900, function () { if (chat) askNextQuestion(); });
      }
    } else if (chat.phase === "ghost") {
      schedule(allTimers, 1500, runGhostSteps);
    }
    // silent: nothing to resume; input is already unlocked.
  }

  function showAnswerButtons(q) {
    var box = $("chat-buttons");
    box.innerHTML = "";
    q.answers.forEach(function (a, idx) {
      var b = document.createElement("button");
      b.className = "text-btn";
      b.textContent = a.t;
      b.addEventListener("click", function () { answerQuestion(idx); });
      box.appendChild(b);
    });
    box.classList.remove("hidden");
  }

  function askNextQuestion() {
    if (!chat || chat.phase !== "questions") return;
    if (chat.qIndex >= chat.script.questions.length) { startGhosting(); return; }
    var q = chat.script.questions[chat.qIndex];
    typeThenSay(q.q, function () {
      if (!chat) return;
      chat.awaiting = true;
      showAnswerButtons(q);
    });
  }

  function answerQuestion(idx) {
    if (!chat || chat.phase !== "questions" || !chat.awaiting) return;
    chat.awaiting = false;
    $("chat-buttons").classList.add("hidden");
    var q = chat.script.questions[chat.qIndex];
    var a = q.answers[idx];
    addMsg(a.t, "out", "seen");
    chat.qIndex++;
    schedule(allTimers, 700, function () {
      if (!chat) return;
      typeThenSay(pick(a.r), function () { if (chat) askNextQuestion(); });
    });
  }

  /* ---- Ghosting ---- */

  function startGhosting() {
    if (!chat) return;
    chat.phase = "ghost";
    chat.ghostStepIdx = 0;
    runGhostSteps();
    schedule(allTimers, 60000, function () {
      if (chat && chat.phase !== "questions") setStatus(chat.ghost.lateStatus, false);
    });
  }

  function runGhostSteps() {
    if (!chat || chat.phase !== "ghost") return;
    if (chat.ghostStepIdx >= chat.ghost.steps.length) return;
    var s = chat.ghost.steps[chat.ghostStepIdx++];
    schedule(allTimers, s.delay, function () {
      if (!chat || chat.phase !== "ghost") return;
      if (s.status) setStatus(s.status, false);
      if (s.unlockInput) $("chat-input-row").classList.remove("hidden");
      if (s.msg) {
        typeThenSay(s.msg, s.typing || 1500, runGhostSteps);
      } else if (s.typing) {
        showTyping();
        schedule(allTimers, s.typing, function () { hideTyping(); runGhostSteps(); });
      } else {
        runGhostSteps();
      }
    });
  }

  function markAllRead() {
    if (chat) {
      chat.messages.forEach(function (m) { if (m.dir === "out" && m.meta) m.meta = "read"; });
    }
    var metas = $("chat-log").querySelectorAll(".msg.out .meta");
    metas.forEach(function (m) { m.textContent = "read"; });
  }

  function handleFreeText(text) {
    addMsg(text, "out", "delivered");
    if (!chat || chat.phase === "silent") return;
    if (chat.phase === "questions") return;
    // Ghost phase replies: increasingly sparse, then silence.
    var r = chat.ghost.replies[chat.ghostReplyIndex];
    if (!r) {
      chat.phase = "silent";
      schedule(allTimers, 30000, function () { if (chat) markAllRead(); });
      setStatus("last seen recently", false);
      return;
    }
    chat.ghostReplyIndex++;
    schedule(allTimers, 1500, function () {
      if (!chat) return;
      markAllRead();
      if (r.msg) { typeThenSay(r.msg, r.typing); }
      else if (r.typing) { showTyping(); schedule(allTimers, r.typing, hideTyping); }
      if (chat.ghostReplyIndex >= chat.ghost.replies.length) {
        chat.phase = "silent";
        setStatus("last seen 3 hours ago", false);
      }
    });
  }

  function sendFreeText() {
    var input = $("chat-input");
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    handleFreeText(text);
  }

  $("btn-send").addEventListener("click", sendFreeText);
  $("chat-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendFreeText();
  });

  /* ---------------- Boot ---------------- */
  renderGate();
  show("gate");
})();
