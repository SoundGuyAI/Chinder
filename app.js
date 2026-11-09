/* Chinder app logic. All state is client-side (localStorage + memory).
   Nothing the user answers or types is sent anywhere. */

(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  var screens = {
    gate: $("screen-gate"),
    deck: $("screen-deck"),
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
    deck = shuffle(PROFILES.slice());
    $("deck-sub").textContent = deck.length + " admirers nearby";
    $("deck-empty").classList.add("hidden");
    renderDeck();
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
    card.style.backgroundImage = "url('./assets/profiles/" + p.id + ".jpg')";
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

  /* ---------------- Match ---------------- */

  var matchProfile = null;

  function openMatch(p) {
    matchProfile = p;
    $("match-photo").src = "./assets/profiles/" + p.id + ".jpg";
    $("match-sub").textContent = "You and " + p.name + " have liked each other's... profiles.";
    show("match");
  }

  $("btn-chat").addEventListener("click", function () { openChat(matchProfile); });
  $("btn-keep-swiping").addEventListener("click", function () { show("deck"); });
  $("btn-back").addEventListener("click", function () { show("deck"); });

  /* ---------------- Chat ---------------- */

  var chat = null;
  var allTimers = [];

  function clearChatTimers() {
    allTimers.forEach(clearTimeout);
    allTimers = [];
    hideTyping();
  }

  function openChat(p) {
    clearChatTimers();
    chat = {
      profile: p,
      qIndex: 0,
      phase: "questions",      // questions -> ghost -> silent
      ghostStep: 0,
      ghostReplyIndex: 0,
    };
    $("chat-name").textContent = p.name;
    $("chat-avatar").src = "./assets/profiles/" + p.id + ".jpg";
    setStatus("online", true);
    $("chat-log").innerHTML = "";
    $("chat-buttons").classList.add("hidden");
    $("chat-input-row").classList.add("hidden");
    show("chat");
    schedule(chatTimers(), 1200, function () {
      typeThenSay(p.opener, function () {
        askNextQuestion();
      });
    });
  }

  function chatTimers() { return allTimers; }
  function schedule(arr, ms, fn) { var t = setTimeout(fn, ms); arr.push(t); return t; }

  function setStatus(text, online) {
    var el = $("chat-status");
    el.textContent = text;
    el.classList.toggle("online", !!online);
  }

  function scrollLog() {
    var log = $("chat-log");
    log.scrollTop = log.scrollHeight;
  }

  function addMsg(text, dir, meta) {
    var log = $("chat-log");
    var m = document.createElement("div");
    m.className = "msg " + dir;
    m.textContent = text;
    if (meta) {
      var s = document.createElement("span");
      s.className = "meta";
      s.textContent = meta;
      m.appendChild(s);
    }
    log.appendChild(m);
    scrollLog();
    return m;
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
    schedule(chatTimers(), typingMs, function () {
      hideTyping();
      if (msg) addMsg(msg, "in");
      if (cb) schedule(chatTimers(), 600, cb);
    });
  }

  function askNextQuestion() {
    if (!chat || chat.phase !== "questions") return;
    if (chat.qIndex >= CHAT_QUESTIONS.length) { startGhosting(); return; }
    var q = CHAT_QUESTIONS[chat.qIndex];
    typeThenSay(q.q, function () {
      $("chat-buttons").classList.remove("hidden");
    });
  }

  function answerQuestion(isYes) {
    if (!chat || chat.phase !== "questions") return;
    $("chat-buttons").classList.add("hidden");
    addMsg(isYes ? "Yes" : "No", "out", "seen");
    var q = CHAT_QUESTIONS[chat.qIndex];
    chat.qIndex++;
    var pool = isYes ? q.yes : q.no;
    var reply = pool[Math.floor(Math.random() * pool.length)];
    schedule(chatTimers(), 700, function () {
      typeThenSay(reply, function () { askNextQuestion(); });
    });
  }

  $("btn-yes").addEventListener("click", function () { answerQuestion(true); });
  $("btn-no").addEventListener("click", function () { answerQuestion(false); });

  /* ---- Ghosting ---- */

  function startGhosting() {
    chat.phase = "ghost";
    var stepIdx = 0;
    function runStep() {
      if (!chat || chat.phase !== "ghost") return;
      if (stepIdx >= GHOST_STEPS.length) return;
      var s = GHOST_STEPS[stepIdx++];
      schedule(chatTimers(), s.delay, function () {
        if (s.status) setStatus(s.status, false);
        if (s.unlockInput) $("chat-input-row").classList.remove("hidden");
        if (s.msg) {
          typeThenSay(s.msg, s.typing || 1500, runStep);
        } else if (s.typing) {
          showTyping();
          schedule(chatTimers(), s.typing, function () { hideTyping(); runStep(); });
        } else {
          runStep();
        }
      });
    }
    runStep();
    schedule(chatTimers(), 60000, function () { setStatus("last seen 1 hour ago", false); });
  }

  function handleFreeText(text) {
    addMsg(text, "out", "delivered");
    if (!chat || chat.phase === "silent") return;
    if (chat.phase === "questions") {
      // Free text during question phase isn't expected; buttons are the path.
      return;
    }
    // Ghost phase replies: increasingly sparse, then silence.
    var r = GHOST_REPLIES[chat.ghostReplyIndex];
    if (!r) {
      chat.phase = "silent";
      // Mark older outgoing messages as read after a long beat, say nothing.
      schedule(chatTimers(), 30000, markAllRead);
      setStatus("last seen recently", false);
      return;
    }
    chat.ghostReplyIndex++;
    schedule(chatTimers(), 1500, function () {
      markAllRead();
      if (r.msg) { typeThenSay(r.msg, r.typing); }
      else if (r.typing) { showTyping(); schedule(chatTimers(), r.typing, hideTyping); }
      if (chat.ghostReplyIndex >= GHOST_REPLIES.length) {
        chat.phase = "silent";
        setStatus("last seen 3 hours ago", false);
      }
    });
  }

  function markAllRead() {
    var metas = $("chat-log").querySelectorAll(".msg.out .meta");
    metas.forEach(function (m) { m.textContent = "read"; });
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
