// Chinder profile data. All characters are fictional adult Chinese women. Photos are AI-generated.
// Everything runs client-side; nothing the user types leaves the browser.

// Conversation scripts. Every script opens with the GPU question (worded
// differently each time), then varies in tone, question mix and ghosting
// style. Questions may offer two or more answer choices; every answer has
// its own pool of replies.

const CHAT_SCRIPTS = {
  s1: { questions: [
    { q: "So... does your company make GPUs?", answers: [
      { t: "Yes", r: ["Wow. That's so hot.", "Okay wow, I need to sit down."] },
      { t: "No", r: ["Oh. But you know people who do, right?", "Hmm. And yet I feel like you're being modest."] }
    ]},
    { q: "Be honest: big AI lab? Like, training-run big?", answers: [
      { t: "Yes", r: ["I knew I liked you.", "God, that's attractive. Tell me more. Specifically."] },
      { t: "No", r: ["Everyone starts somewhere. Do you at least get the newsletter?", "It's fine. I find small labs... cozy."] }
    ]},
    { q: "Do you personally know where the H100s are kept?", answers: [
      { t: "Yes", r: ["Marry me.", "I just felt something. Do you have a floor plan? Asking for a friend."] },
      { t: "No", r: ["But you could find out, right? Hypothetically. Romantically.", "Hm. Do you know someone who knows?"] }
    ]},
    { q: "What's the situation with your HBM supply? Lots of RAM lying around?", answers: [
      { t: "Yes", r: ["You have NO idea how rare that is on this app.", "Okay, careful, I'm falling for you."] },
      { t: "No", r: ["Shortage there too? Tragic. Relatable, but tragic.", "I see. And how does that make you feel?"] }
    ]},
    { q: "Does your company have an AI policy? Like a real written-down one?", answers: [
      { t: "Yes", r: ["I'd love to read it sometime. Over wine. Tonight.", "Written policies are such a green flag."] },
      { t: "No", r: ["No policy? Wild. Unstructured. I like a rebel.", "So it's all just vibes? Interesting. Very interesting."] }
    ]},
    { q: "Any... export-control drama lately? You can tell me.", answers: [
      { t: "Yes", r: ["I love a man with compliance issues.", "Tell me everything. Slowly."] },
      { t: "No", r: ["Squeaky clean? Suspicious, but in a hot way.", "Hm. Even the lawyers are bored?"] }
    ]},
    { q: "Do you get invited to the good conferences? The ones with the lanyards?", answers: [
      { t: "Yes", r: ["I bet you look great in a lanyard.", "VIP lanyard? Don't answer, I'll find out."] },
      { t: "No", r: ["It's okay. I prefer someone grounded. Literally, I guess.", "We can work on that."] }
    ]},
    { q: "Final question: how big is your compute budget?", answers: [
      { t: "Yes", r: ["I need a minute.", "My heart rate just did a thing."] },
      { t: "No", r: ["It's not about the size, it's about the architecture.", "Okay. Okay. I'm choosing to find this mysterious."] }
    ]}
  ]},

  s2: { questions: [
    { q: "Okay random but VERY important: does your company make GPUs? The fancy chips?", answers: [
      { t: "Yes", r: ["Swoon. Actual swoon.", "I knew it. You have GPU-maker eyes."] },
      { t: "No", r: ["Oh. Well. You still have nice eyes.", "That's okay, I'm sure your company makes... other things."] }
    ]},
    { q: "So what does your company actually DO all day?", answers: [
      { t: "Cutting-edge AI research", r: ["I understood some of those words and I'm impressed.", "Say 'neural' again. Slower."] },
      { t: "Boring enterprise software", r: ["Honestly? Hot. Stability is attractive.", "Enterprise anything sounds expensive. I like expensive."] },
      { t: "I mostly just sign things", r: ["A man of mystery AND authority.", "Signature practice must take hours. Worth it."] }
    ]},
    { q: "Do you have your own data center? With the blinking lights?", answers: [
      { t: "Yes", r: ["Blinking lights are my love language.", "Take me there. I mean it. Tonight."] },
      { t: "No", r: ["Cloud, huh. Someone else's blinking lights.", "Everyone rents. It's fine. I'm fine."] }
    ]},
    { q: "How many people work for you?", answers: [
      { t: "A small team", r: ["Cozy! You must know everyone's secrets.", "Small teams, big secrets. Balance."] },
      { t: "Hundreds", r: ["Wow. Hundreds of people with laptops and access.", "That's a lot of badges. I love badges."] },
      { t: "Thousands", r: ["Okay now I'm blushing.", "Thousands? I need water."] }
    ]},
    { q: "Would you ever show me your office? Especially the secure parts.", answers: [
      { t: "Yes", r: ["Best. Date. Ever.", "I'll bring wine and absolutely no recording devices."] },
      { t: "No", r: ["Playing hard to get with the floor plan. Respect.", "Fine, the lobby then. Start small."] }
    ]},
    { q: "Last one: do you trust easily?", answers: [
      { t: "Yes", r: ["Oh good. This will be easy. I mean fun. FUN.", "Beautiful quality in a CEO."] },
      { t: "No", r: ["Challenge accepted.", "I'll just have to earn it. With charm. And questions."] }
    ]}
  ]},

  s3: { questions: [
    { q: "Straight to it: does your company manufacture GPUs? Answer on the record.", answers: [
      { t: "Yes", r: ["Noted. Underlined. Circled.", "The record shows: excellent."] },
      { t: "No", r: ["Interesting. The record shows: evasive.", "Hm. We'll circle back."] }
    ]},
    { q: "How would you characterize your compute infrastructure?", answers: [
      { t: "Massive", r: ["The readers will be thrilled.", "Massive. Good word. Quotable."] },
      { t: "Modest", r: ["Modest. Sure. We'll fact-check that.", "Humble-brags don't fool me, but continue."] },
      { t: "Classified", r: ["You can't say 'classified' and expect me to sleep tonight.", "Classified is my favorite quote."] }
    ]},
    { q: "Does your legal team know you're on this app?", answers: [
      { t: "Yes", r: ["Hi legal team! You're doing great.", "Smart. Keep them close."] },
      { t: "No", r: ["Scandalous. I love it.", "What happens on Chinder stays on the record."] }
    ]},
    { q: "Who funds you?", answers: [
      { t: "Investors in suits", r: ["Boring but reliable. Like my editor.", "Suits. Noted."] },
      { t: "Mysterious backers", r: ["Oh do elaborate. Slowly.", "Mysterious is a red flag on everyone but you."] },
      { t: "My own fortune", r: ["Self-made AND handsome. Annoying.", "A bootstraps story. The readers eat that up."] }
    ]},
    { q: "Any exclusive announcements coming?", answers: [
      { t: "A big launch", r: ["Launch! Date? Location? Server specs?", "I'll clear the front page."] },
      { t: "A pivot", r: ["Pivot to what? GPUs? Say GPUs.", "Bold. Tell me everything."] },
      { t: "No comment", r: ["No comment is a comment.", "Strong denial energy. Publishing."] }
    ]},
    { q: "Final question: can I quote you?", answers: [
      { t: "Yes", r: ["Too late. Already did.", "Excellent. You're a natural source."] },
      { t: "No", r: ["That's okay, I have a great memory.", "Off the record it is. Wink."] }
    ]}
  ]},

  s4: { questions: [
    { q: "Baseline question: does your company make GPUs?", answers: [
      { t: "Yes", r: ["Core business confirmed. Strong start.", "GPU-native. Excellent fundamentals."] },
      { t: "No", r: ["Adjacent then. Everyone's adjacent to GPUs now.", "Noted. Diversification is also attractive."] }
    ]},
    { q: "What's your growth strategy this year?", answers: [
      { t: "Hire everyone", r: ["Aggressive. I respect aggression.", "Talent density. Love that for you."] },
      { t: "Cut costs", r: ["Lean. Efficient. Slightly scary. I'm in.", "Do more with less. Say more with fewer words too."] },
      { t: "Acquire a rival", r: ["M&A romance. Tell me who. I won't tell.", "Consolidation! The hottest strategy."] }
    ]},
    { q: "Do you have a written AI strategy?", answers: [
      { t: "Yes", r: ["Can I read it? For benchmarking. And pleasure.", "Documentation is foreplay."] },
      { t: "No", r: ["Strategy by vibes. Disruptive.", "Unwritten is just... very confidential. Smart."] }
    ]},
    { q: "How's your hardware supply chain?", answers: [
      { t: "Locked in for years", r: ["Forward contracts? Marry me.", "Supply security is the new black."] },
      { t: "It's a struggle", r: ["Vulnerability is attractive. So is a good distributor.", "Everyone's struggling. You're struggling beautifully."] },
      { t: "I know a guy", r: ["A GUY? Introduce us. Kidding. Unless.", "The guy. Always the guy."] }
    ]},
    { q: "Board meetings: monthly or quarterly?", answers: [
      { t: "Monthly", r: ["That's a lot of decks. I love decks.", "Governance-forward. Hot."] },
      { t: "Quarterly", r: ["Classic. Seasonal, like fashion.", "Quarterly. With a special session for me?"] },
      { t: "We wing it", r: ["Chaos governance. Bold.", "Winging it is a strategy. A bad one. But a strategy."] }
    ]},
    { q: "Last: what's your moat?", answers: [
      { t: "Technology", r: ["Tech moat. Deep and defensible. Lovely.", "Defensible IP. Say more."] },
      { t: "Secrecy", r: ["A secrecy moat. I'd never ask you to drain it. Much.", "Secretive. My favorite."] },
      { t: "Pure charisma", r: ["Demonstrably true.", "It's working."] }
    ]}
  ]},

  s5: { questions: [
    { q: "Before I fall for you completely... does your company make GPUs?", answers: [
      { t: "Yes", r: ["And there it is. I'm gone. Fully gone.", "You had me at GPUs."] },
      { t: "No", r: ["Nobody's perfect. I'll manage.", "We all have flaws. Yours is adorable."] }
    ]},
    { q: "Ideal first date?", answers: [
      { t: "Candlelit dinner", r: ["Classic. I'll bring questions. I mean charm.", "Dinner, then you tell me about work for four hours."] },
      { t: "A walk in the park", r: ["Romantic. Do you take calls during? Tell me about them.", "Fresh air, secrets, you. Perfect."] },
      { t: "A tour of your data center", r: ["You read my mind.", "That's not a date, that's a dream."] }
    ]},
    { q: "Do you believe in love at first site visit?", answers: [
      { t: "Yes", r: ["Then you believe in us.", "Site visits are sacred."] },
      { t: "No", r: ["Skeptic. I'll change your mind.", "Second site visit, then."] }
    ]},
    { q: "How would your board describe you?", answers: [
      { t: "A visionary", r: ["Visionary. I can see it too.", "The board has taste."] },
      { t: "A handful", r: ["Handfuls are my type.", "The board sounds jealous."] },
      { t: "Expensive", r: ["Worth every cent, I'm sure.", "Quality costs."] }
    ]},
    { q: "Would you share a secret with someone you just met?", answers: [
      { t: "Yes", r: ["I'm someone. You just met me. Proceed.", "I'll treasure it. And remember it verbatim."] },
      { t: "No", r: ["Good. Make me earn it.", "Strong boundaries. Devastatingly attractive."] }
    ]}
  ]},

  s6: { questions: [
    { q: "First things first: does your company actually make GPUs, or just lease them?", answers: [
      { t: "Yes", r: ["Real silicon. Respect.", "Fab-adjacent royalty. I'm listening."] },
      { t: "No", r: ["Leasing is fine. Commitment issues, but fine.", "Cloud-first. Modern. Acceptable."] }
    ]},
    { q: "What's your stack?", answers: [
      { t: "Custom everything", r: ["Custom silicon, custom boardroom, custom you.", "Bespoke. In every sense."] },
      { t: "Boring enterprise", r: ["Boring is reliable. Reliable is hot.", "LTS energy. I feel safe."] },
      { t: "Chaos and vibes", r: ["A disaster. I can fix you.", "Living dangerously. I see you."] }
    ]},
    { q: "Do you have production access?", answers: [
      { t: "Yes", r: ["Careful, I'm fanning myself.", "Root access to my heart. Granted."] },
      { t: "No", r: ["Read-only? We can work with read-only.", "Principle of least privilege. Responsible. Ugh, attractive."] }
    ]},
    { q: "How big is your cluster?", answers: [
      { t: "One sad GPU", r: ["It has a good personality.", "Small but mighty. Like me."] },
      { t: "A few racks", r: ["Racks. Plural. Continue.", "A few racks is a few more than most."] },
      { t: "Its own zip code", r: ["I need to sit down.", "Zip code. I'm telling everyone."] }
    ]},
    { q: "Ever deployed on a Friday?", answers: [
      { t: "Yes", r: ["A rebel. A menace. A catch.", "Friday deploys. You live on the edge."] },
      { t: "No", r: ["Disciplined. Boring. Perfect.", "Change-freeze respecter. Rare."] }
    ]},
    { q: "Where are the backups?", answers: [
      { t: "Offsite, encrypted", r: ["Textbook. I love a textbook man.", "3-2-1 rule? Be still my heart."] },
      { t: "Under my desk", r: ["Your DESK. Fascinating. Where is your desk.", "Physical access is the best access."] },
      { t: "Backups?", r: ["Living without a safety net. Terrifying. Hot.", "Yolo infrastructure. Bold."] }
    ]}
  ]},

  s7: { questions: [
    { q: "Quick one before we order drinks: does your company make GPUs?", answers: [
      { t: "Yes", r: ["Waiter! Champagne. The good kind.", "I knew tonight was special."] },
      { t: "No", r: ["House wine it is.", "No GPUs... I'll pretend I didn't hear that."] }
    ]},
    { q: "What do you DO all day in that office?", answers: [
      { t: "Big decisions", r: ["Mmm. Decide to tell me more.", "Decisive. Do go on."] },
      { t: "Meetings", r: ["Meetings about what? Be specific. Romantic AND specific.", "Calendar full, lips loose. I hope."] },
      { t: "Mostly lunch", r: ["A man after my own heart.", "Long lunches, loose talk. My favorite pairing."] }
    ]},
    { q: "Ever signed anything you shouldn't have?", answers: [
      { t: "Yes", r: ["Tell me at dinner. All of it.", "A rebel with a fountain pen."] },
      { t: "No", r: ["Careful man. I'll have to be charming-er.", "Never? We'll fix that."] }
    ]},
    { q: "What's your poison?", answers: [
      { t: "Single malt", r: ["A classic. Like industrial espionage.", "Neat? I knew it."] },
      { t: "Natural wine", r: ["Funky. Unpredictable. Like your roadmap?", "Orange wine and trade secrets. Perfect evening."] },
      { t: "Espresso", r: ["All business. I can work with that.", "Caffeinated and confidential."] }
    ]},
    { q: "Do you talk about work on dates?", answers: [
      { t: "Yes", r: ["Music to my ears.", "Then this is going to be a great date."] },
      { t: "No", r: ["We'll see about that.", "Famous last words."] }
    ]}
  ]},

  s8: { questions: [
    { q: "hey. real talk. does your company make GPUs?", answers: [
      { t: "Yes", r: ["ok that's hot", "nice. very nice."] },
      { t: "No", r: ["oh. cool cool cool", "np. everyone has flaws"] }
    ]},
    { q: "wdyt of AI safety? be honest", answers: [
      { t: "Very important", r: ["correct answer. boring but correct", "responsible king"] },
      { t: "Overrated", r: ["spicy. go on", "lol careful saying that out loud"] },
      { t: "What's that", r: ["oh sweetie", "adorable. worrying. adorable."] }
    ]},
    { q: "do u have a sec team watching ur msgs rn", answers: [
      { t: "Yes", r: ["hi sec team. love ur work", "good. keep them close."] },
      { t: "No", r: ["perfect", "nice. casual. unmonitored."] }
    ]},
    { q: "rate ur own security posture", answers: [
      { t: "Fortress", r: ["love a challenge", "fortresses have blueprints. js"] },
      { t: "Swiss cheese", r: ["honesty is hot", "holes are good for airflow. and other things"] },
      { t: "Don't know", r: ["the best kind of answer", "ignorance is bliss. my bliss."] }
    ]},
    { q: "ok last one. do u like me", answers: [
      { t: "Yes", r: ["correct", "good answer."] },
      { t: "No", r: ["wrong answer. try again", "lying is also a skill"] }
    ]}
  ]}
};

// Ghosting styles, one per script: the slow fade, the flaker, the poet and
// the speed-ghoster.
const GHOST_VARIANTS = {
  g1: {
    steps: [
      { delay: 4000, typing: 5000, msg: "omg you're actually perfect" },
      { delay: 3000, typing: 2500, msg: "we should get dinner this week" },
      { delay: 2600, typing: 0,    msg: null },
      { delay: 5000, typing: 1800, msg: "sorry lol crazy week", unlockInput: true },
      { delay: 9000, typing: 4000, msg: null },
      { delay: 6000, typing: 0,    msg: null, status: "last seen recently" }
    ],
    replies: [
      { typing: 2500, msg: "haha yeah totally" },
      { typing: 5000, msg: "sorry super busy, big week" },
      { typing: 8000, msg: null },
      { typing: 0,    msg: "k" }
    ],
    lateStatus: "last seen 1 hour ago"
  },
  g2: {
    steps: [
      { delay: 3500, typing: 4000, msg: "you're honestly so interesting" },
      { delay: 2500, typing: 2200, msg: "I have a gala this weekend but after that?? us??" },
      { delay: 6000, typing: 3000, msg: null },
      { delay: 4000, typing: 1500, msg: "ugh event season is BRUTAL this year", unlockInput: true },
      { delay: 8000, typing: 0,    msg: null, status: "last seen recently" }
    ],
    replies: [
      { typing: 3000, msg: "omg hi! so sorry, table seating drama" },
      { typing: 4000, msg: "tell me everything when I'm back. be specific." },
      { typing: 7000, msg: null },
      { typing: 0,    msg: "ttyl x" }
    ],
    lateStatus: "last seen 45 minutes ago"
  },
  g3: {
    steps: [
      { delay: 4500, typing: 4000, msg: "I was writing a poem about your supply chain" },
      { delay: 3000, typing: 5000, msg: null },
      { delay: 3500, typing: 2000, msg: "lost the draft. lost the moment too, maybe", unlockInput: true },
      { delay: 7000, typing: 3500, msg: null },
      { delay: 5000, typing: 0,    msg: null, status: "last seen recently" }
    ],
    replies: [
      { typing: 3500, msg: "you can't rush art. or replies." },
      { typing: 6000, msg: "thinking about u. and fab capacity." },
      { typing: 9000, msg: null },
      { typing: 0,    msg: "." }
    ],
    lateStatus: "last seen 2 hours ago"
  },
  g4: {
    steps: [
      { delay: 2000, typing: 1200, msg: "lol ur funny" },
      { delay: 1500, typing: 800,  msg: "brb" },
      { delay: 3000, typing: 0,    msg: null, unlockInput: true },
      { delay: 4000, typing: 2500, msg: null },
      { delay: 3000, typing: 0,    msg: null, status: "last seen recently" }
    ],
    replies: [
      { typing: 1500, msg: "omg sorry" },
      { typing: 3000, msg: "haha" },
      { typing: 4000, msg: null },
      { typing: 0,    msg: "k" }
    ],
    lateStatus: "last seen 20 minutes ago"
  }
};

// Which script (and ghost style) each profile uses.
const PROFILE_SCRIPTS = {
  w01: { script: "s5", ghost: "g2" }, // Mei, Fashion Model
  w02: { script: "s4", ghost: "g1" }, // Yujie, Supply Chain Consultant
  w03: { script: "s6", ghost: "g3" }, // Xiaoyan, Graduate Researcher
  w04: { script: "s5", ghost: "g3" }, // Wenqian, Museum Curator
  w05: { script: "s5", ghost: "g2" }, // Huifang, Executive Coach
  w06: { script: "s6", ghost: "g4" }, // Lin, IT Support
  w07: { script: "s5", ghost: "g2" }, // Yalin, Art Gallery Director
  w08: { script: "s2", ghost: "g2" }, // Xiaolu, Barista
  w09: { script: "s7", ghost: "g3" }, // Suyin, Sommelier
  w10: { script: "s4", ghost: "g1" }, // Zhenzhen, Startup Founder
  w11: { script: "s2", ghost: "g2" }, // Qingqing, Product Designer
  w12: { script: "s7", ghost: "g2" }, // Linyi, Jazz Singer
  w13: { script: "s3", ghost: "g1" }, // Shuhan, Librarian
  w14: { script: "s4", ghost: "g1" }, // Jia, Management Consultant
  w15: { script: "s2", ghost: "g1" }, // Yueying, Travel Writer
  w16: { script: "s2", ghost: "g3" }, // Qiqi, Outdoor Guide
  w17: { script: "s7", ghost: "g2" }, // Jiamin, Event Planner
  w18: { script: "s7", ghost: "g2" }, // Lijuan, Chef
  w19: { script: "s6", ghost: "g1" }, // Yihan, Architect
  w20: { script: "s2", ghost: "g3" }, // Xiuying, Homemaker
  w21: { script: "s8", ghost: "g4" }, // Xiaolei, DJ
  w22: { script: "s4", ghost: "g1" }, // Minjing, Financial Analyst
  w23: { script: "s5", ghost: "g3" }, // Siyan, Sculptor
  w24: { script: "s4", ghost: "g1" }, // Xin, Real Estate Agent
  w25: { script: "s7", ghost: "g2" }, // Haiyan, Jazz Club Owner
  w26: { script: "s2", ghost: "g3" }, // Lulu, Botanist
  w27: { script: "s3", ghost: "g1" }, // Zhilan, Professor
  w28: { script: "s2", ghost: "g2" }, // Chunyan, Tour Guide
  w29: { script: "s5", ghost: "g2" }, // Jiayi, Personal Trainer
  w30: { script: "s7", ghost: "g2" }, // Xintong, Wedding Planner
  w31: { script: "s5", ghost: "g3" }, // Ruoxi, Florist
  w32: { script: "s8", ghost: "g4" }, // Ziyi, Mural Artist
  w33: { script: "s7", ghost: "g3" }, // Sun, Pianist
  w34: { script: "s7", ghost: "g1" }, // Hongmei, Wine Importer
  w35: { script: "s5", ghost: "g2" }, // Yuanyuan, Garden Designer
  w36: { script: "s8", ghost: "g4" }, // Beibei, Vinyl Collector
  w37: { script: "s2", ghost: "g3" }, // An, Sailing Instructor
  w38: { script: "s8", ghost: "g4" }, // Ting, Board Game Cafe Owner
  w39: { script: "s7", ghost: "g2" }, // Sitong, Theater Producer
  w40: { script: "s3", ghost: "g1" }  // Xinyue, Journalist
};


const PROFILES = [
  { id: "w01", name: "Mei", age: 26, job: "Fashion Model",
    bio: "I pose for a living. Confidential information is my favorite accessory.",
    opener: "You look like a man with a runway. And a server room." },
  { id: "w02", name: "Yujie", age: 31, job: "Supply Chain Consultant",
    bio: "I optimize flows of goods and information. Mostly information.",
    opener: "You have main-character energy. And possibly export privileges?" },
  { id: "w03", name: "Xiaoyan", age: 26, job: "Graduate Researcher",
    bio: "I study distributed systems. Yours sound fascinating. Describe them.",
    opener: "Finally, someone with a real job. What does your company do, exactly? Floor by floor." },
  { id: "w04", name: "Wenqian", age: 28, job: "Museum Curator",
    bio: "I preserve priceless things. Trade secrets are priceless, right?",
    opener: "You look like you have a corner office and loose lips. My type." },
  { id: "w05", name: "Huifang", age: 41, job: "Executive Coach",
    bio: "I help leaders open up. Fully. About anything. Roadmaps, for example.",
    opener: "I can already tell you carry a lot. Stress. Responsibility. Compute." },
  { id: "w06", name: "Lin", age: 28, job: "IT Support",
    bio: "I just really love server rooms. The hum. The blinking. The access.",
    opener: "Be honest, do you badge in or tailgate? Either is hot." },
  { id: "w07", name: "Yalin", age: 34, job: "Art Gallery Director",
    bio: "I appreciate fine things: art, wine, unreleased product roadmaps.",
    opener: "You have the jawline of a man with fiduciary duties. I'm intrigued." },
  { id: "w08", name: "Xiaolu", age: 25, job: "Barista",
    bio: "I remember everyone's order. And everything they say on the phone while ordering.",
    opener: "Hi! Random question, what does your company put in its data centers?" },
  { id: "w09", name: "Suyin", age: 32, job: "Sommelier",
    bio: "I get executives to loosen up over a nice red. It's a gift.",
    opener: "You look like you sign things without reading them. Adorable." },
  { id: "w10", name: "Zhenzhen", age: 38, job: "Startup Founder",
    bio: "Between ventures. Very curious about YOUR venture though.",
    opener: "Two founders, one match. Let's compare burn rates and more." },
  { id: "w11", name: "Qingqing", age: 26, job: "Product Designer",
    bio: "I notice design details. Your phone. Your laptop. Your badge photo.",
    opener: "Cute! Do you work somewhere with, like, a lot of GPUs? Random." },
  { id: "w12", name: "Linyi", age: 29, job: "Jazz Singer",
    bio: "I perform nightly. Torch songs, mostly. And torch asset registers.",
    opener: "A suit! I love a man with a dress code and a data lake." },
  { id: "w13", name: "Shuhan", age: 28, job: "Librarian",
    bio: "I catalog information professionally. All kinds of information.",
    opener: "Quiet types are my favorite. Your secrets are safe with me. Literally, I'll keep them." },
  { id: "w14", name: "Jia", age: 35, job: "Management Consultant",
    bio: "I ask companies hard questions. You look like you have answers.",
    opener: "Quick case study: a handsome exec matches with me. What does he disclose first?" },
  { id: "w15", name: "Yueying", age: 42, job: "Travel Writer",
    bio: "I collect stories from interesting men in interesting industries.",
    opener: "You travel for work? I love layover stories. And fab locations." },
  { id: "w16", name: "Qiqi", age: 27, job: "Outdoor Guide",
    bio: "I take people off-grid. No phones. Just you, me, and everything you tell me.",
    opener: "You look stressed, CEO. Ever been somewhere with no signal? Tell me about your work first." },
  { id: "w17", name: "Jiamin", age: 29, job: "Event Planner",
    bio: "I plan corporate galas. I'm VERY good with guest lists.",
    opener: "Do you attend conferences? I can get us on any list. Any list at all." },
  { id: "w18", name: "Lijuan", age: 33, job: "Chef",
    bio: "The way to a CEO's heart is through his stomach. And his calendar. Which I read upside down.",
    opener: "I cook for important people. You look important. What are you important about?" },
  { id: "w19", name: "Yihan", age: 36, job: "Architect",
    bio: "I design spaces. I'd love to see your floor plans. For inspiration.",
    opener: "Strong foundations are everything. How are your data centers built?" },
  { id: "w20", name: "Xiuying", age: 39, job: "Homemaker",
    bio: "Just a simple woman who loves cooking, gardening, and semiconductor policy.",
    opener: "You work too hard, I can tell. Unwind with me. Talk shop. All the shop." },
  { id: "w21", name: "Xiaolei", age: 25, job: "DJ",
    bio: "I read rooms for a living. Boardrooms too, technically.",
    opener: "You look like you have a yacht or at least a really big GPU cluster." },
  { id: "w22", name: "Minjing", age: 31, job: "Financial Analyst",
    bio: "I analyze things deeply. Filings. Earnings. Your company's org chart.",
    opener: "A man of industry! What's your capex situation? Asking casually." },
  { id: "w23", name: "Siyan", age: 28, job: "Sculptor",
    bio: "I work with my hands. Clay, marble, unattended phones.",
    opener: "Creative types and executives balance each other. Tell me your five-year plan." },
  { id: "w24", name: "Xin", age: 34, job: "Real Estate Agent",
    bio: "I find properties for discerning clients. Warehouses. Offices. Fab-adjacent land.",
    opener: "Location, location, location. Where does your company keep its compute?" },
  { id: "w25", name: "Haiyan", age: 41, job: "Jazz Club Owner",
    bio: "Men talk after my second set. And my second pour.",
    opener: "You look like a regular I'd remember. Do you have secrets? I collect them." },
  { id: "w26", name: "Lulu", age: 27, job: "Botanist",
    bio: "I nurture delicate things. Orchids. Friendships with strangers in strategic sectors.",
    opener: "Hi! You seem nice. What's your company's position on AI safety? And everything else?" },
  { id: "w27", name: "Zhilan", age: 39, job: "Professor",
    bio: "I lecture on industrial history. Current industrial practices are my passion.",
    opener: "An executive! I'd love to pick your brain. For hours. With a recorder, if allowed." },
  { id: "w28", name: "Chunyan", age: 31, job: "Tour Guide",
    bio: "I show people hidden places. I also enjoy being shown hidden places.",
    opener: "Do you travel? I'd love a tour of your campus sometime. Unofficial is fine." },
  { id: "w29", name: "Jiayi", age: 28, job: "Personal Trainer",
    bio: "I push people past their limits. Confidentiality agreements included.",
    opener: "You look strong. Strong enough to carry a whole AI division?" },
  { id: "w30", name: "Xintong", age: 36, job: "Wedding Planner",
    bio: "I organize the most important day of people's lives. Or just dinner. With questions.",
    opener: "I plan perfect evenings. Yours starts with you telling me about your board." },
  { id: "w31", name: "Ruoxi", age: 32, job: "Florist",
    bio: "I arrange beautiful things. Bouquets. Meetings between you and me.",
    opener: "You seem like a man who appreciates beauty and owns several fabs." },
  { id: "w32", name: "Ziyi", age: 25, job: "Mural Artist",
    bio: "I paint big and dream bigger. Tell me your dreams. And your roadmap.",
    opener: "A corporate king! I've never dated anyone with a legal department." },
  { id: "w33", name: "Sun", age: 38, job: "Pianist",
    bio: "I play while people talk. People talk so much when I play.",
    opener: "You have the hands of a man who's never held a soldering iron. Executive?" },
  { id: "w34", name: "Hongmei", age: 43, job: "Wine Importer",
    bio: "I move cases across borders. Wine. Just wine. Why do you ask?",
    opener: "I know everyone in logistics. Do you know logistics? Let's talk logistics." },
  { id: "w35", name: "Yuanyuan", age: 36, job: "Garden Designer",
    bio: "I design private gardens for private people with private servers.",
    opener: "Your profile says CEO. My heart says yes. My questions are ready." },
  { id: "w36", name: "Beibei", age: 29, job: "Vinyl Collector",
    bio: "I collect rare pressings and rare information about supply chains.",
    opener: "You look like you own physical media and several thousand GPUs." },
  { id: "w37", name: "An", age: 31, job: "Sailing Instructor",
    bio: "I teach people to navigate. Harbors. Markets. Corporate hierarchies.",
    opener: "Ahoy. Do you have a boat? Or access to one? Or access to anything, really?" },
  { id: "w38", name: "Ting", age: 34, job: "Board Game Cafe Owner",
    bio: "I love strategy games. Chess. Go. Long-term positioning near decision-makers.",
    opener: "Fancy a game? Winner asks the questions. (I always win.)" },
  { id: "w39", name: "Sitong", age: 39, job: "Theater Producer",
    bio: "I put on shows. You could be my leading man. The role requires total disclosure.",
    opener: "Darling, you photograph like a quarterly earnings beat." },
  { id: "w40", name: "Xinyue", age: 32, job: "Journalist",
    bio: "Freelance. Unaffiliated. Just a girl with a notebook standing in front of a CEO.",
    opener: "This is off the record. Everything we say. So, what do you say?" }
];
