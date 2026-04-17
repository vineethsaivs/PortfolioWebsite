// Deep-dive essays for Favourite Books & Favourite Sports cards.
// Click any card in #blogs or #favourite-sports to open its essay.

const DIVES = {
  // ── BOOKS ─────────────────────────────────────────────────────────────────
  'book-fountainhead': {
    emoji: '\uD83D\uDCD8',
    label: 'The Fountainhead',
    sub: 'Ayn Rand',
    color: '#3b82f6',
    paragraphs: [
      'This is the book. The one that quite literally changed my life. I read a lot of books that I love, and I have other favourites on this page, but The Fountainhead is the only one where I can point at a clear version of me before I read it and a different version of me after. Nothing else has done that to me. Nothing has even come close.',
      'Howard Roark refuses. That is the whole book, really. He refuses to change his architectural vision to be more commercial. He refuses to water down his drawings to please a client. He refuses to make himself more palatable so the world will love him back. I had been quietly doing the opposite of that for years, shaping myself into whatever the room wanted, and calling it being reasonable. Roark held up a mirror and showed me what I was actually doing.',
      'What Rand captured, for me, is a single question: can you build the thing you actually believe in, the way you actually believe it should be built, even when nobody is asking you to? This book is a 700-page argument that the answer has to be yes, because the alternative is a lifetime of diluted work that was almost yours. I think about Roark every time I write code that I know is good but unconventional, or push back on a design choice everyone else is nodding at. He taught me that integrity is not loud. It is the quiet refusal to let your vision get negotiated away, one concession at a time.',
    ],
  },
  'book-atlas': {
    emoji: '\uD83D\uDCD5',
    label: 'Atlas Shrugged',
    sub: 'Ayn Rand',
    color: '#e50914',
    paragraphs: [
      'Atlas Shrugged is the book that made me take competence seriously as a moral stance. Before this, I thought being good at what you do was a nice-to-have. After this, I understood it as the foundation everything else rests on. The world runs on the people who can actually make the trains run, ship the product, solve the problem. Pretending otherwise is a kind of dishonesty.',
      '"Who is John Galt?" is the first line of the novel, and it becomes a haunt. It is the question a civilisation asks when the people who built it start quietly walking away. I read it and saw, for the first time, how much of the world I enjoy (the bridges, the software, the supply chains, the medicine) exists only because somebody decided to be extraordinary at something deeply unglamorous.',
      'I do not agree with every argument in the book. But it gave me a vocabulary for something I had felt for years: that doing the work, doing it well, doing it rigorously, refusing to coast, is not just a career choice. It is an ethical one. It is how you repay the world for letting you exist in it.',
    ],
  },
  'book-zarathustra': {
    emoji: '\uD83D\uDDFB',
    label: 'Thus Spoke Zarathustra',
    sub: 'Friedrich Nietzsche',
    color: '#8b5cf6',
    paragraphs: [
      'Nietzsche did not write this book. He sang it. Zarathustra reads like scripture from a religion that never existed, and it hit me at the exact age when I was starting to realise that the values I was living by had been handed to me by default. Culture, family, school, internet. Nobody asked me if I wanted them. They were just there.',
      'The central idea that broke me open: the Ubermensch is not a superior human, it is a self-created one. The person who has the courage to tear down every inherited belief, stand in the rubble, and build a value system from the ground up. One that actually belongs to them. Nietzsche calls this the hardest thing a human can do, and he is right.',
      'And then there is the eternal recurrence, the thought experiment that lives rent-free in my head. If you had to live this exact life, every moment, every choice, every humiliation and triumph, on infinite loop forever, would you? It is the most ruthless test of whether you are actually living a life you chose. I ask myself that question on bad days. It reorients me every time.',
    ],
  },
  'book-frankl': {
    emoji: '\uD83D\uDD6F\uFE0F',
    label: 'Man\u2019s Search for Meaning',
    sub: 'Viktor Frankl',
    color: '#eab308',
    paragraphs: [
      'Frankl wrote this after surviving Auschwitz. That context matters. Every sentence is earned. He watched humans at the lowest a human can go, and came out with a claim that reordered my entire understanding of psychology: the last of the human freedoms is the freedom to choose your attitude in any given set of circumstances. Not what happens to you. What you do with it.',
      'The line that never leaves me: life is not asking what you expect from it. Life is asking what you have to offer it. Flip that, and suddenly meaning stops being something you discover and starts being something you answer for, daily, with your actions. It is a shift from victim to author, and it is quietly the most empowering idea I have ever read.',
      'I return to Frankl whenever I am in a hard season. Not because he makes the hardship smaller, but because he reminds me that suffering without meaning is unbearable, and suffering with meaning is survivable. Finding the meaning is the work. Everything else is negotiation with reality.',
    ],
  },
  'book-meditations': {
    emoji: '\uD83C\uDFDB\uFE0F',
    label: 'Meditations',
    sub: 'Marcus Aurelius',
    color: '#a0a0a0',
    paragraphs: [
      'Marcus Aurelius was the most powerful man on Earth when he wrote this. Emperor of Rome, commander of armies, the closest thing his world had to a god-king. And his private journal is almost entirely him reminding himself not to be a jerk. Not to chase praise. Not to mistake reputation for virtue. To wake up early. To do the work.',
      'That is the detail that changes everything: he never meant this to be published. These are notes to himself. The most influential philosophical text of the Roman world is essentially a 2000-year-old self-accountability document. Every time I read it, I feel like I am eavesdropping on a man holding himself to a standard nobody else could enforce.',
      'The core Stoic move lives in here in its purest form: you do not control what happens, only what you make of it. Focus obsessively on your own conduct and release your grip on the rest. It sounds simple. Living it is the work of a lifetime. Meditations is the book I return to when I am spinning out over things I have no power over, which is more often than I would like to admit.',
    ],
  },
  'book-naval': {
    emoji: '\uD83E\uDDED',
    label: 'The Almanack of Naval Ravikant',
    sub: 'Eric Jorgenson',
    color: '#10b981',
    paragraphs: [
      'Naval does not speak in paragraphs. He speaks in crystallised one-liners that take you a year to actually understand. "Play long-term games with long-term people." "Seek wealth, not money or status." "Specific knowledge is knowledge you cannot be trained for." Each of these looks simple. Each of them has quietly reorganised how I spend my time.',
      'The biggest unlock from this book: happiness is a skill, not a destination. It is a practice of wanting fewer things, being more present, and noticing that most of what we chase is borrowed wanting. Desires we inherited from someone else\u2019s life. Naval calls desire a contract you make with yourself to be unhappy until you get what you want. That reframing alone was worth the book.',
      'But the piece that shaped me most: leverage. Code and media are permissionless leverage. You can build things that work for you while you sleep, reach people on the other side of the planet, and compound without asking anyone for permission. In a world that still defaults to trading hours for dollars, that is quietly the most radical career advice I have ever received.',
    ],
  },

  // ── SPORTS ────────────────────────────────────────────────────────────────
  'sport-football': {
    emoji: '\u26BD',
    label: 'Football',
    sub: 'The Beautiful Game',
    color: '#22c55e',
    paragraphs: [
      'I do not entirely understand why football hits me the way it does. There was a point in my life where football was the only emotion I had left. The only thing that could pull a genuine reaction out of me. Everything else was flat, and then a free kick would curl into the top corner and something in my chest would crack open. That is not a metaphor. That actually happened. Many times.',
      'For me, football has always been the people I watch it with. Sports bars with strangers who became friends by the 60th minute. A couch with the people I love. Group calls with friends in different cities all screaming at the same goal on a 30-second delay. That is my version of the game, and it still feels enormous. One day I will watch El Clasico at Camp Nou. That is a life goal I have held quietly for years and have not given up on, not even a little.',
      'Ninety minutes of football is the purest presence I know. You cannot think about anything else. You cannot check your phone. You cannot worry about tomorrow. The ball moves and you move with it, and for that stretch of time you are completely, unarguably alive. When a 94th-minute goal goes in, the five of us in the room make a sound I have not heard anywhere else. Grief and joy and disbelief and love, all compressed into two seconds. Football is the closest thing I have found to shared consciousness. I will keep watching until I can\u2019t anymore.',
    ],
  },
  'sport-tennis': {
    emoji: '\uD83C\uDFBE',
    label: 'Tennis',
    sub: 'Art, Craft, Resilience',
    color: '#eab308',
    paragraphs: [
      'Tennis is just art to me. Not a metaphor for art. Actually art. A backhand down the line hit on the run, with disguise and depth and weight, is craft at the same level as a cellist nailing a phrase, or a painter getting a single brushstroke exactly right. You can feel the years of practice compressed into the half-second it took to execute.',
      'The thing that holds me is the resilience of each point. Down 15 to 40 in a tiebreak, opponent has all the momentum, crowd has decided the match is over, and you still have to play the next point like it is the first one. You still have to toss the ball, find your spot, and commit. Every point is its own little universe. Every point asks: do you have one more in you? The answer, from the greats, is always yes. That is not ability. That is character compressed into footwork.',
      'And then there is the beauty. Federer\u2019s movement looking like he has extra frames of animation nobody else got. Nadal grinding into the clay until the opponent\u2019s will just evaporates. Djokovic\u2019s defence bending geometry. Three completely different philosophies of how to win. Watching them, I learnt that there is not one right way to be excellent. There are many, and each one is a full expression of who you are.',
    ],
  },
  'sport-f1': {
    emoji: '\uD83C\uDFCE\uFE0F',
    label: 'Formula 1',
    sub: 'Physics. Science. Strategy. Everything.',
    color: '#e50914',
    paragraphs: [
      'Formula 1 is the sport I love with my engineer\u2019s brain. I love the physics of it. The way a car generates enough downforce at speed that it could theoretically drive upside down on a ceiling. I love the materials science. Carbon-fibre monocoques that absorb crashes I would not have survived twice. I love that every surface on the car is a deliberate solution to a fluid dynamics problem somebody argued about for six months.',
      'The science is in the data. Every lap produces more telemetry than most businesses generate in a week. Tire temperature, brake wear, ERS deployment, fuel load, wind direction, track evolution. Drivers are told their next decision by engineers running real-time simulations on what the race will look like fifty laps from now. It is the most intense human-machine collaboration in any sport. Nothing else is close.',
      'And then there is the strategy. A race can be won on lap 2 by an undercut decision made six weeks ago by a strategist who modelled the safety car probability distribution correctly. You can have the fastest car on the grid and lose because somebody on the pit wall out-thought you. That is what keeps me hooked. F1 is the only sport where the engineers, the drivers, and the strategists are all, visibly, inseparably part of the outcome. Everything matters. I love that.',
    ],
  },
  'sport-basketball': {
    emoji: '\uD83C\uDFC0',
    label: 'Basketball',
    sub: 'Flow, Rhythm, Improvisation',
    color: '#f97316',
    paragraphs: [
      'Kobe is how I started watching basketball. Full stop. Before I understood anything about spacing or rotations or pick-and-roll coverages, I understood the Mamba walking into a fourth quarter with the game on his shoulders, the entire arena holding its breath, and the ball going through the net because he said it would. That is the memory I have of falling in love with the sport. The unreasonable self-belief. The refusal to miss when it mattered. The work ethic that lived behind all of it. Kobe made the game feel like an act of will, and a 12-year-old me decided this was a thing worth paying attention to.',
      'Then came Curry, and basketball changed shape. Where Kobe taught me that greatness could be carved out of obsession, Curry taught me that greatness could be an entirely new question: what if the three-point line was not a limit but a canvas? Watching him pull up from 30 feet like the rim is two metres wide is watching a human being redefine what the sport is. Two completely different expressions of excellence, both legendary, both mine.',
      'As a game, basketball is five players, infinite permutations, decisions made in tenths of a second. A pick-and-roll unfolding perfectly (screen, slip, pocket pass, finish) is jazz. Structured enough that everyone knows the pattern, loose enough that the best play is usually the one that breaks the pattern. That balance between discipline and improvisation is what great teams have, and what great engineering teams have, and what great anything has. Basketball is the sport that taught me what flow state actually looks like from the outside.',
    ],
  },
  'the-thread': {
    emoji: '\u2728',
    label: 'The Thread',
    sub: 'The one thing that ties all of this together',
    color: '#e50914',
    paragraphs: [
      'Everything you see orbiting in this scene looks like it should not belong to the same person. AI engineering. Football. Cosmology. Nietzsche. F1. Ayn Rand. Different fields, different centuries, different languages. But every orbit in this universe points at the same center, and the center is a single question.',
      'How do things work? Not abstractly. Viscerally. What makes a team press high and force a turnover? Why do stars fuse hydrogen into iron and then blow themselves apart? Why did Howard Roark refuse the commission? What is the loss function a human is silently running when they make a decision at 140 km/h? It is all the same question, asked in different accents.',
      'When you start seeing the thread, the fields stop being separate. Philosophy is just asking what to optimize for. Football is emergent systems with legs. F1 is real-time Monte Carlo with engineers on the pit wall. Astrophysics is the universe debugging itself. Code is crystallised thought. Every passion in this scene is secretly the same passion, and the person holding them is me.',
      'Curiosity is not a hobby. It is an operating system. It is the thing that made me pick up each of these, and the thing that keeps me coming back to all of them. Everything here orbits curiosity. That is the thread. That is the core. That is the whole portrait.',
    ],
  },

  'sport-cricket': {
    emoji: '\uD83C\uDFCF',
    label: 'Cricket',
    sub: 'Patience, Pattern, Pressure',
    color: '#3b82f6',
    paragraphs: [
      'Cricket is the sport that taught me patience is a form of aggression. A batsman surviving the first 20 balls in a Test match, not scoring much, just refusing to give his wicket away, is a strategic attack. He is burning the bowler\u2019s best deliveries. He is waiting for the one loose ball that will come eventually, because it always does. The long game is the only game.',
      'The technical detail I cannot get over: a batsman has under half a second to read a ball bowled at 140 km/h, and his body has to commit to a shot before his conscious mind has processed what is happening. Seam position, wrist angle, pitch condition, field placement, all of it goes in as input, and a shot comes out as output, and the whole thing happens below conscious thought. It is real-time pattern recognition at its most extreme. The human body running inference.',
      'And cricket was where I first understood that numbers tell stories. A batting average of 55 does not just mean he is good. It means he scored in Australia, he scored in England, he scored when it mattered, he scored under pressure. One number, compressed from thousands of hours of decisions. Years before I wrote a single line of data science code, cricket had already taught me how to read signal in noise.',
    ],
  },
};

function openDive(key) {
  const dive = DIVES[key];
  if (!dive) return;

  let modal = document.getElementById('content-deep-dive');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'content-deep-dive';
    modal.className = 'content-deep-dive';
    document.body.appendChild(modal);
  }

  const paragraphs = dive.paragraphs.map(p => `<p>${p}</p>`).join('');
  const subline = dive.sub ? `<div class="deep-dive-sub">${dive.sub}</div>` : '';

  modal.innerHTML = `
    <div class="deep-dive-backdrop"></div>
    <div class="deep-dive-content">
      <button class="deep-dive-close" aria-label="Close">&times;</button>
      <div class="deep-dive-header">
        <span class="deep-dive-emoji">${dive.emoji}</span>
        <h2 class="deep-dive-title" style="color: ${dive.color}">${dive.label}</h2>
        ${subline}
        <div class="deep-dive-accent" style="background: ${dive.color}"></div>
      </div>
      <div class="deep-dive-body">${paragraphs}</div>
      <div class="deep-dive-quote">Part of what makes me, me.</div>
    </div>
  `;

  modal.offsetHeight;
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';

  const close = () => {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => { if (modal.parentNode) modal.parentNode.removeChild(modal); }, 400);
    document.removeEventListener('keydown', escHandler);
  };

  const escHandler = (e) => { if (e.key === 'Escape') close(); };

  modal.querySelector('.deep-dive-close').addEventListener('click', close);
  modal.querySelector('.deep-dive-backdrop').addEventListener('click', close);
  document.addEventListener('keydown', escHandler);
}

function initDives() {
  document.querySelectorAll('[data-dive]').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => openDive(card.dataset.dive));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDive(card.dataset.dive);
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDives);
} else {
  initDives();
}

// Exposed so the 3D universe (passions-universe.js) can trigger the Thread dive.
window.openDive = openDive;
