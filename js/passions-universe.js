import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// ── Passion Data ────────────────────────────────────────────────────────────────

const PASSIONS = [
  {
    emoji: '\u26BD', label: 'Football', color: '#22c55e',
    desc: 'The beautiful game. Flow, teamwork, and reading the game in real time.',
    ring: 3, angle: 0,
    deepDesc: [
      'Twenty-two people on a patch of grass, and somehow it becomes art. Football is the closest thing I\u2019ve found to emergent intelligence. No single player controls the game, but patterns arise, dissolve, and reform in real time like a living system.',
      'A through-ball that splits a defense is geometry made physical. A tiki-taka sequence is distributed computing with no central server. The way a team presses high and forces turnovers is not just tactics, it is collective cognition. Eleven minds thinking as one.',
      'What draws me isn\u2019t just the spectacle. It\u2019s the proof that beauty can be functional. The most effective play is often the most elegant. That principle, the idea that the right answer and the beautiful answer are the same answer, shapes how I think about everything I build.',
    ],
  },
  {
    emoji: '\uD83C\uDFCE\uFE0F', label: 'Formula 1', color: '#e50914',
    desc: 'Engineering under pressure, where milliseconds separate glory from anonymity.',
    ring: 3, angle: 1,
    deepDesc: [
      'Milliseconds. That\u2019s the margin between a world championship and a footnote. Formula 1 is applied thermodynamics, materials science, aerodynamics, and human reflexes compressed into two hours of controlled chaos.',
      'A pit stop lasts 1.8 seconds. A tire strategy decided on lap 12 determines the outcome on lap 57. The engineers on the pit wall are running Monte Carlo simulations in real time while a human being steers a 1000-horsepower machine at 340 km/h inches from a concrete wall. It is the highest-bandwidth collaboration between humans and machines that exists in sport.',
      'F1 taught me that engineering isn\u2019t about building the perfect thing. It\u2019s about building the best possible thing within impossible constraints: weight limits, fuel loads, tire degradation, regulations that change every year. Sound familiar? Every production system I\u2019ve built lives under the same philosophy.',
    ],
  },
  {
    emoji: '\uD83C\uDFBE', label: 'Tennis', color: '#eab308',
    desc: 'The loneliest sport. Just you, your opponent, and the geometry of the court.',
    ring: 3, angle: 2,
    deepDesc: [
      'No teammates. No substitutions. No timeouts. No coach whispering in your ear. Tennis is the most psychologically naked sport on Earth. When you are down 2-5 in the third set, there is literally nobody who can help you. It is just you, your racket, and whatever you are made of.',
      'Every rally is a micro-negotiation: angles, spin, depth, disguise. Every match is a 2-hour conversation played at 200 km/h. Federer\u2019s backhand isn\u2019t just technique, it is philosophy, the belief that grace and power aren\u2019t opposites. Nadal\u2019s relentlessness isn\u2019t just fitness, it is a worldview, that every point matters equally, that intensity is a choice you make before the match starts.',
      'Tennis taught me that strategy without execution is fantasy, and execution without presence of mind is just reflexes. The greats aren\u2019t the ones with the best serve. They are the ones who can think clearly when everything is on the line.',
    ],
  },
  {
    emoji: '\uD83C\uDFCF', label: 'Cricket', color: '#3b82f6',
    desc: 'Applied statistics with soul. The ultimate lesson in reading data in real time.',
    ring: 3, angle: 3,
    deepDesc: [
      'Five days. A single match can last five days, and it can still end in a draw. Cricket is the sport that taught the world that patience is a form of aggression, that waiting is a strategy, and that the long game is the only game.',
      'A batsman facing a bowler is processing an extraordinary amount of data in under 0.5 seconds: the seam position, the wrist angle, the release point, the pitch condition, the field placement. It is real-time pattern recognition performed by the human body before the conscious mind even registers what is happening. Every ball is a hypothesis test.',
      'Cricket is also where I first understood that numbers tell stories. A batting average isn\u2019t just a number. It is a compressed narrative of temperament, conditions, opponents, and pressure. Years before I wrote my first line of data science code, cricket taught me to read signal in noise.',
    ],
  },
  {
    emoji: '\uD83C\uDFC0', label: 'Basketball', color: '#f97316',
    desc: 'Flow state incarnate. Improvisation within structure.',
    ring: 3, angle: 4,
    deepDesc: [
      'When a pick-and-roll unfolds perfectly (the screen, the slip, the pocket pass, the finish), it is jazz. It is improvisation within a structure that only exists because everyone internalized the same playbook so deeply that they can break its rules in real time.',
      'Basketball is 48 minutes of controlled entropy. Five players, infinite permutations, decisions made in tenths of a second. The best teams aren\u2019t the ones with the best plan. They are the ones who can abandon the plan and create something better in the moment.',
      'I watch basketball for the flow states. When a player is in the zone (Curry hitting from 35 feet, LeBron orchestrating a fast break like a conductor) you are watching a human being operating at the edge of what consciousness allows. That is what I chase in my own work: the state where thinking and doing become the same thing.',
    ],
  },
  {
    emoji: '\uD83D\uDD2D', label: 'Astrophysics', color: '#8b5cf6',
    desc: 'The universe as the ultimate laboratory. We are made of dead stars.',
    ring: 2, angle: 0,
    deepDesc: [
      'Every atom of carbon in your body was forged inside a star that exploded before our sun was born. The iron in your blood, the calcium in your bones, the oxygen you are breathing right now, all of it was cooked in a stellar furnace and scattered across space in a supernova billions of years ago. You are, in the most literal sense, made of stardust.',
      'Astrophysics is the study of the largest laboratory that exists, one where the experiments have been running for 13.8 billion years and we are showing up to read the results. Black holes that warp time. Neutron stars spinning 700 times per second. Galaxies colliding in slow motion over millions of years. The scales are incomprehensible, and yet the same physics that governs a falling apple governs the orbit of a binary pulsar.',
      'What keeps me up at night isn\u2019t the answers. It is the fact that we can even ask the questions. That a species on a small rock can figure out what happens inside a star ten billion light-years away. That is not just science. That is the universe becoming aware of itself.',
    ],
  },
  {
    emoji: '\uD83C\uDF0C', label: 'Cosmology', color: '#6366f1',
    desc: 'The biggest possible question. What is all of this, and why does it exist?',
    ring: 2, angle: 1,
    deepDesc: [
      '13.8 billion years ago, everything (every galaxy, every star, every atom, every thought you have ever had) was compressed into a point smaller than a proton. Then it expanded. And it is still expanding, accelerating into a future we can barely model. Cosmology is the discipline that takes the biggest possible step back and asks: what is all of this?',
      'I am haunted by the fine-tuning problem. Change the strong nuclear force by 0.5% and stars can\u2019t form. Shift the cosmological constant slightly and the universe either collapses instantly or flies apart before atoms can bond. We exist in a razor-thin window of parameters that permit complexity. Is that luck? Design? A multiverse where every possibility plays out? Nobody knows.',
      'Cosmology is where physics meets philosophy and neither has the final word. Dark energy makes up 68% of the universe and we have no idea what it is. Dark matter is 27% and we have never detected a single particle of it. We understand less than 5% of what exists. That is not humbling. It is intoxicating. The deepest mystery isn\u2019t out there. We are living inside it.',
    ],
  },
  {
    emoji: '\u269B\uFE0F', label: 'Physics', color: '#06b6d4',
    desc: 'The language the universe writes itself in.',
    ring: 2, angle: 2,
    deepDesc: [
      'Every waterfall, every orbit, every heartbeat is physics in motion. It is not a subject I study. It is the substrate everything else runs on. Quantum mechanics says reality is probabilistic at its core. General relativity says massive objects bend the fabric of space and time. Both are true. Both are incompatible. And resolving that contradiction is the greatest unsolved problem in science.',
      'What draws me isn\u2019t the equations. It is the unreasonable elegance. Why should F=ma be so simple? Why should Maxwell\u2019s four equations contain all of electromagnetism? Why should the universe be comprehensible at all? Einstein called it "the most incomprehensible thing about the universe, that it is comprehensible." That sentence changed my life.',
      'Physics taught me the most important lesson of my intellectual life: the universe doesn\u2019t owe us simplicity, but it keeps delivering it. Every time we look deeper, we find fewer rules governing more phenomena. That is not just beautiful. It is suspicious. And I want to understand why.',
    ],
  },
  {
    emoji: '\uD83D\uDCD0', label: 'Mathematics', color: '#14b8a6',
    desc: 'Eternal truth. The most creative endeavor disguised as the most rigorous.',
    ring: 2, angle: 3,
    deepDesc: [
      'Mathematics doesn\u2019t care about your opinions, your culture, or your century. 2+2=4 on every planet, in every galaxy, at every point in time. It is the closest thing we have to absolute truth: statements that are not approximately true or true for now, but true in a way that nothing else is or can be.',
      'And yet, it is also the most creative human endeavor. Inventing a new mathematical structure is closer to composing music than it is to accounting. Euler\u2019s identity, e^(i\u03C0) + 1 = 0, connects five fundamental constants in a single equation with no reason to do so. It is not useful. It is just unbearably beautiful. The first time I saw it, I felt what I imagine people feel in cathedrals.',
      'What keeps me coming back is the mystery at the foundations. G\u00F6del proved that any consistent mathematical system powerful enough to describe arithmetic contains true statements that can never be proved within that system. Mathematics is incomplete, by its own rules. There are truths we can never reach. That is not a limitation. It is a window into something deeper than logic itself.',
    ],
  },
  {
    emoji: '\uD83D\uDCBB', label: 'Programming', color: '#10b981',
    desc: 'Crystallized thought. The craft of making ideas real.',
    ring: 0, angle: 0,
    deepDesc: [
      'Code is crystallized thought. Every function is a decision. Every architecture is a worldview. Every variable name is a tiny act of communication with a future version of yourself or a stranger who will maintain this at 2 AM six months from now.',
      'Programming taught me that the hard part is never the syntax. It is figuring out what the problem actually is. The gap between "I know what I want to build" and "I can describe it precisely enough for a machine to execute it" is where all the real thinking happens. It is philosophy, forced through a compiler.',
      'The best code I have ever written isn\u2019t clever. It is clear. It reads like well-written prose. You understand the author\u2019s intent without effort. That is the aspiration: not to impress, but to communicate. Not to show what you know, but to make complexity disappear. Programming, at its best, is an act of empathy.',
    ],
  },
  {
    emoji: '\uD83E\uDD16', label: 'AI / ML', color: '#ef4444',
    desc: 'Teaching sand to think, and discovering what intelligence really means.',
    ring: 0, angle: 1,
    deepDesc: [
      'We are teaching sand to think. That is what machine learning is, stripped to its essence. Silicon, electricity, and mathematics, producing systems that can recognize faces, translate languages, write poetry, and beat the world\u2019s best at Go. Not because they understand any of it, but because gradient descent found a valley in a loss landscape we couldn\u2019t even visualize.',
      'I build agentic systems, RAG architectures, and multimodal pipelines. I work on making VLM training more efficient. But the technical work is just the surface. What draws me to AI isn\u2019t what it can do. It is what it reveals about intelligence itself. Every time a model surprises us, every emergent capability we didn\u2019t train for, is a clue about the nature of cognition.',
      'We are living through the most consequential technological transition since fire. Not electricity, not the internet. Fire. Because we are not building a faster tool. We are building something that can build tools. And the question that keeps me awake isn\u2019t "how powerful will it get?" It is "will we be wise enough to steward it well?"',
    ],
  },
  {
    emoji: '\u2699\uFE0F', label: 'Engineering', color: '#78716c',
    desc: 'Philosophy with a deadline. The art of elegant tradeoffs.',
    ring: 0, angle: 2,
    deepDesc: [
      'Engineering is philosophy with a deadline. Every bridge, every API, every distributed system is an answer to the question: "given these constraints, what is the best we can do?" Not the perfect solution. The best achievable solution, right now, with what we have.',
      'What I love about engineering is that it is honest. Code either works or it doesn\u2019t. The system either handles 10,000 requests per second or it falls over. You can\u2019t argue your way out of a failed load test. Reality has the final vote, and it doesn\u2019t accept appeals.',
      'The best engineering feels inevitable. Like it couldn\u2019t have been done any other way. That is the goal: not to build something that impresses, but something so well-fitted to its problem that alternatives feel forced. Elegance isn\u2019t decoration. It is the absence of everything unnecessary. That is as true for a system architecture as it is for a mathematical proof.',
    ],
  },
  {
    emoji: '\uD83D\uDCD6', label: 'Philosophy', color: '#d946ef',
    desc: 'The operating system that everything else runs on.',
    ring: 1, angle: 0,
    deepDesc: [
      'Philosophy is the operating system that everything else runs on. Before you can build, you have to ask: what is worth building? Before you can optimize, you have to ask: optimize for what? Before you can live, you have to ask: what does a good life look like? These aren\u2019t academic questions. They are the most practical questions that exist.',
      'Nietzsche taught me that comfort is the enemy of greatness. Marcus Aurelius taught me that the obstacle is the way. Camus taught me that the universe is absurd and that is not a reason for despair. It is a reason for revolt, for creating meaning in a cosmos that offers none. They didn\u2019t give me answers. They gave me better questions.',
      'I don\u2019t read philosophy to sound smart at dinner parties. I read it because it is the only discipline brave enough to stare at the hardest questions without flinching. What is consciousness? What do we owe each other? Is there free will, or are we just molecules obeying physics? These questions don\u2019t have answers. But living inside them, really sitting with them, changes how you see everything.',
    ],
  },
  {
    emoji: '\uD83D\uDCDA', label: 'Reading', color: '#a855f7',
    desc: 'Time travel. Conversations with minds across centuries.',
    ring: 1, angle: 1,
    deepDesc: [
      'Books are time machines. When I read Marcus Aurelius, I am having a conversation with a Roman emperor who has been dead for 1,800 years. When I read Sagan, I am seeing the cosmos through the eyes of someone who made the universe feel like home. When I read a paper on transformer architectures, I am standing on the shoulders of people who saw further than I ever could alone.',
      'Reading is how I cross-pollinate. An idea from cosmology solves a problem in system design. A metaphor from Borges clarifies a concept in information theory. A passage from Dostoevsky explains something about human behavior that no psychology textbook captured. The best ideas don\u2019t come from going deeper into one field. They come from noticing that two distant fields are secretly the same field.',
      'I don\u2019t read to escape. I read to arrive. Every book is a lens, and the more lenses you have, the more dimensions of reality you can perceive. A person who reads lives a thousand lives. A person who doesn\u2019t lives only one. And even that one, they understand less of it than they think.',
    ],
  },
  {
    emoji: '\uD83D\uDE80', label: 'Space', color: '#0ea5e9',
    desc: 'The ultimate humility check, and the ultimate inspiration.',
    ring: 1, angle: 2,
    deepDesc: [
      'The Pale Blue Dot. That photograph Voyager 1 took in 1990, from 6 billion kilometers away. Earth is a single pixel. Less than a pixel. A mote of dust suspended in a sunbeam. Every war, every love story, every empire, every symphony, all of it happened on that pixel. That image rewired my brain permanently.',
      'Space exploration is humanity\u2019s most inspiring endeavor because it is the only one that requires us to be our best selves. You can\u2019t cut corners on a Mars mission. You can\u2019t fake the physics of orbital mechanics. Every SpaceX landing, every JWST image, every Perseverance soil sample is proof that when humans commit to something audacious, we can actually pull it off.',
      'But what really gets me isn\u2019t the rockets or the telescopes. It is what they represent. From a pale blue dot, a species that has been around for 300,000 years figured out the age of the universe, the structure of atoms, and the speed of light. We sent our music past the edge of the solar system. Space isn\u2019t just a frontier. It is a mirror. And what it reflects back is that we are far more extraordinary than we give ourselves credit for.',
    ],
  },
];

// Ring configurations: [radius, tilt (radians), speed multiplier]
const RINGS = [
  { radius: 8, tilt: 0.15, speed: 1.0 },      // Technology (inner)
  { radius: 11, tilt: -0.1, speed: 0.75 },     // Philosophy
  { radius: 14, tilt: 0.2, speed: 0.55 },      // Science
  { radius: 22, tilt: -0.12, speed: 0.35 },    // Sports (outer)
];

// Connections between related passions (indices)
const CONNECTIONS = [
  [10, 8],  // AI/ML <-> Mathematics
  [5, 6],   // Astrophysics <-> Cosmology
  [1, 11],  // F1 <-> Engineering
  [9, 10],  // Programming <-> AI/ML
  [7, 8],   // Physics <-> Mathematics
  [12, 13], // Philosophy <-> Reading
  [5, 7],   // Astrophysics <-> Physics
  [6, 14],  // Cosmology <-> Space
  [9, 11],  // Programming <-> Engineering
  [12, 14], // Philosophy <-> Space
];

// ── State ───────────────────────────────────────────────────────────────────────

let renderer, scene, camera, controls, composer, bloomPass;
let centralStarMesh = null;
let passionMeshes = [];
let passionGroups = [];
let ringMeshes = [];
let connectionLines = [];
let nebulaParticles, bgStars;
let fabricMesh = null;
let fabricUniforms = null;
let clock;
let raycaster, pointer;
let hoveredObj = null;
let focusedIndex = -1;
let initialized = false;
let frameCount = 0;
let fpsHistory = [];
let bloomEnabled = true;
let reducedMotion = false;
let isMobile = false;

// Camera animation state
const STATE = { OVERVIEW: 0, FLYING_TO: 1, FOCUSED: 2, FLYING_BACK: 3 };
let viewState = STATE.OVERVIEW;
let cameraFrom = new THREE.Vector3();
let cameraTo = new THREE.Vector3();
let cameraLookFrom = new THREE.Vector3();
let cameraLookTo = new THREE.Vector3();
let flyT = 0;
const FLY_DURATION = 1.2;

// Shooting stars
const METEOR_POOL_SIZE = 4;
let meteors = [];
let nextMeteorTime = 0;

// Audio
let audioEl = null;
let audioCtxUnlocked = false;
let audioFadingIn = false;
let audioFadingOut = false;
let audioMuted = false;

// ── Easing ──────────────────────────────────────────────────────────────────────

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Helpers ─────────────────────────────────────────────────────────────────────

function hexToThreeColor(hex) {
  return new THREE.Color(hex);
}

function isMobileDevice() {
  return window.innerWidth < 768 || ('ontouchstart' in window);
}

// ── Initialization ──────────────────────────────────────────────────────────────

function init() {
  const container = document.getElementById('universe-3d');
  if (!container) return;

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  isMobile = isMobileDevice();
  clock = new THREE.Clock();
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2(-999, -999);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.touchAction = 'none';

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.set(0, 12, 35);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.3;
  controls.minDistance = 10;
  controls.maxDistance = 60;
  controls.maxPolarAngle = Math.PI * 0.75;
  controls.minPolarAngle = Math.PI * 0.15;

  // Ambient light
  const ambient = new THREE.AmbientLight(0x222233, 0.5);
  scene.add(ambient);

  // Build scene
  buildCentralStar();
  buildPassionSpheres();
  buildOrbitalRings();
  buildConnectionLines();
  buildNebulaParticles();
  buildBackgroundStars();
  buildSpacetimeFabric();
  buildMeteors();

  // Post-processing
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    isMobile ? 0.8 : 1.2,
    0.6,
    0.2
  );
  composer.addPass(bloomPass);

  if (reducedMotion) {
    bloomEnabled = false;
  }

  // Events
  setupEvents(container);
  setupClickDetection(container);
  setupAudio();
  resize();

  // Loading done
  const loader = document.getElementById('universe-loading');
  if (loader) loader.style.display = 'none';

  initialized = true;
  tick();
}

// ── Central Star ────────────────────────────────────────────────────────────────

function buildCentralStar() {
  // Core sphere
  const geo = new THREE.IcosahedronGeometry(1.8, 4);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xe50914,
    emissive: 0xe50914,
    emissiveIntensity: 2.0,
    metalness: 0.3,
    roughness: 0.7,
  });
  const star = new THREE.Mesh(geo, mat);
  star.name = 'centralStar';
  star.userData = { isCore: true };
  scene.add(star);
  centralStarMesh = star;

  // Corona glow
  const coronaGeo = new THREE.SphereGeometry(3.5, 32, 32);
  const coronaMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xe50914) },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
        float flicker = 0.8 + 0.2 * sin(uTime * 3.0 + vPosition.y * 5.0);
        float pulse = 0.9 + 0.1 * sin(uTime * 1.5);
        gl_FragColor = vec4(uColor * intensity * flicker * pulse, intensity * 0.6);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const corona = new THREE.Mesh(coronaGeo, coronaMat);
  corona.name = 'corona';
  scene.add(corona);

  // Point light from star
  const starLight = new THREE.PointLight(0xe50914, 3, 50, 1.5);
  scene.add(starLight);
}

// ── Emoji Sprite helper ─────────────────────────────────────────────────────────

function makeEmojiSprite(emoji) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.font = `${Math.floor(size * 0.72)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2 + size * 0.04);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    opacity: 0.0,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.raycast = () => {};
  sprite.renderOrder = 2;
  return sprite;
}

// ── Passion Spheres ─────────────────────────────────────────────────────────────

function buildPassionSpheres() {
  const segments = isMobile ? 16 : 32;
  const mobileScale = isMobile ? 0.7 : 1.0;

  PASSIONS.forEach((p, i) => {
    const group = new THREE.Group();
    const ringConf = RINGS[p.ring];
    const passionsInRing = PASSIONS.filter(pp => pp.ring === p.ring);
    const indexInRing = passionsInRing.indexOf(p);
    const angleOffset = (indexInRing / passionsInRing.length) * Math.PI * 2;

    // Sphere
    const sphereGeo = new THREE.SphereGeometry(0.8, segments, segments);
    const color = hexToThreeColor(p.color);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.4,
      metalness: 0.4,
      roughness: 0.6,
    });
    sphereMat.transparent = true;
    sphereMat.opacity = 1.0;
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.userData = { passionIndex: i };
    sphere.renderOrder = 1;
    group.add(sphere);

    // Glow halo (skip on mobile - bloom handles it)
    if (!isMobile) {
      const glowGeo = new THREE.SphereGeometry(1.4, 16, 16);
      const glowMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: color.clone() },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            float pulse = 0.85 + 0.15 * sin(uTime * 2.0 + ${i.toFixed(1)});
            gl_FragColor = vec4(uColor * intensity * pulse, intensity * 0.4);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      group.add(glow);
    }

    // Small point light
    const pLight = new THREE.PointLight(color, 0.5, 8, 2);
    group.add(pLight);

    // Tiny emoji icon INSIDE the sphere , revealed when sphere turns to glass on proximity/focus
    const emojiSprite = makeEmojiSprite(p.emoji);
    emojiSprite.scale.set(0.55, 0.55, 0.55);
    emojiSprite.position.set(0, 0, 0);
    group.add(emojiSprite);
    group.userData.emojiSprite = emojiSprite;
    group.userData.sphere = sphere;

    // Position on orbit
    const radius = ringConf.radius * mobileScale;
    group.position.set(
      Math.cos(angleOffset) * radius,
      Math.sin(ringConf.tilt) * Math.sin(angleOffset) * radius * 0.3,
      Math.sin(angleOffset) * radius
    );

    // Store orbital data
    group.userData = {
      passionIndex: i,
      ring: p.ring,
      orbitRadius: radius,
      orbitAngle: angleOffset,
      orbitTilt: ringConf.tilt,
      orbitSpeed: ringConf.speed,
      baseScale: 1,
      targetScale: 1,
      currentScale: 1,
    };

    scene.add(group);
    passionGroups.push(group);
    passionMeshes.push(sphere);
  });
}

// ── Orbital Rings ───────────────────────────────────────────────────────────────

function buildOrbitalRings() {
  const mobileScale = isMobile ? 0.7 : 1.0;
  RINGS.forEach((ring) => {
    const r = ring.radius * mobileScale;
    const geo = new THREE.TorusGeometry(r, 0.02, 8, 128);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x444466,
      transparent: true,
      opacity: 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2 + ring.tilt;
    scene.add(mesh);
    ringMeshes.push(mesh);
  });
}

// ── Connection Lines ────────────────────────────────────────────────────────────

function buildConnectionLines() {
  CONNECTIONS.forEach(([a, b]) => {
    const points = [new THREE.Vector3(), new THREE.Vector3()];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const colorA = hexToThreeColor(PASSIONS[a].color);
    const colorB = hexToThreeColor(PASSIONS[b].color);
    const colors = new Float32Array([
      colorA.r, colorA.g, colorA.b,
      colorB.r, colorB.g, colorB.b,
    ]);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.userData = { indexA: a, indexB: b };
    scene.add(line);
    connectionLines.push(line);
  });
}

// ── Nebula Particles ────────────────────────────────────────────────────────────

function buildNebulaParticles() {
  const count = isMobile ? 500 : 2000;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const palette = [
    new THREE.Color(0x6366f1),
    new THREE.Color(0x8b5cf6),
    new THREE.Color(0xe50914),
    new THREE.Color(0x0ea5e9),
    new THREE.Color(0xd946ef),
  ];

  for (let i = 0; i < count; i++) {
    // Cylindrical distribution
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 35;
    const y = (Math.random() - 0.5) * 12;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 0.3 + 0.1;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  nebulaParticles = new THREE.Points(geo, mat);
  scene.add(nebulaParticles);
}

// ── Background Stars ────────────────────────────────────────────────────────────

function buildBackgroundStars() {
  const count = isMobile ? 500 : 1500;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 60 + Math.random() * 40;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xaaaacc,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    sizeAttenuation: true,
  });

  bgStars = new THREE.Points(geo, mat);
  scene.add(bgStars);
}

// ── Spacetime Fabric Grid ───────────────────────────────────────────────────────

const FABRIC_SIZE = 80;
const FABRIC_Y = -3.5; // Plane sits below the solar system
const MAX_MASSES = 16; // 1 central star + 15 passions

function buildSpacetimeFabric() {
  const fabricSegments = isMobile ? 80 : 140;
  const geo = new THREE.PlaneGeometry(FABRIC_SIZE, FABRIC_SIZE, fabricSegments, fabricSegments);
  geo.rotateX(-Math.PI / 2); // Make it horizontal

  // Store original Y positions for the flat grid
  const pos = geo.attributes.position;
  const origY = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    origY[i] = pos.getY(i);
  }
  geo.setAttribute('origY', new THREE.BufferAttribute(origY, 1));

  fabricUniforms = {
    uTime: { value: 0 },
    uMassPositions: { value: new Array(MAX_MASSES).fill(null).map(() => new THREE.Vector3(0, -999, 0)) },
    uMassWeights: { value: new Float32Array(MAX_MASSES) },
    uMassColors: { value: new Array(MAX_MASSES).fill(null).map(() => new THREE.Color(0x333355)) },
    uMassCount: { value: 0 },
    uGridColor: { value: new THREE.Color(0x2a2a55) },
    uGlowIntensity: { value: 0.6 },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms: fabricUniforms,
    vertexShader: `
      uniform float uTime;
      uniform vec3 uMassPositions[${MAX_MASSES}];
      uniform float uMassWeights[${MAX_MASSES}];
      uniform int uMassCount;

      attribute float origY;
      varying vec2 vUv;
      varying float vDepression;
      varying float vDistToCenter;
      varying vec3 vWorldPos;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Compute gravitational depression
        float totalDepression = 0.0;
        for (int i = 0; i < ${MAX_MASSES}; i++) {
          if (i >= uMassCount) break;
          vec3 massPos = uMassPositions[i];
          float dx = pos.x - massPos.x;
          float dz = pos.z - massPos.z;
          float dist = sqrt(dx * dx + dz * dz);
          float weight = uMassWeights[i];
          // Gravitational well: smooth falloff
          float depression = weight / (1.0 + dist * dist * 0.15);
          totalDepression += depression;
        }

        // Apply depression (pull grid downward)
        pos.y = origY - totalDepression;

        // Subtle wave animation
        pos.y += sin(pos.x * 0.3 + uTime * 0.4) * 0.05;
        pos.y += cos(pos.z * 0.25 + uTime * 0.3) * 0.05;

        vDepression = totalDepression;
        vDistToCenter = length(pos.xz);
        vWorldPos = pos;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uMassPositions[${MAX_MASSES}];
      uniform float uMassWeights[${MAX_MASSES}];
      uniform vec3 uMassColors[${MAX_MASSES}];
      uniform int uMassCount;
      uniform vec3 uGridColor;
      uniform float uGlowIntensity;

      varying vec2 vUv;
      varying float vDepression;
      varying float vDistToCenter;
      varying vec3 vWorldPos;

      void main() {
        // Grid lines
        vec2 gridUv = vUv * float(${fabricSegments});
        vec2 grid = abs(fract(gridUv - 0.5) - 0.5);
        float lineX = smoothstep(0.0, 0.06, grid.x);
        float lineY = smoothstep(0.0, 0.06, grid.y);
        float gridLine = 1.0 - min(lineX, lineY);

        // Fade grid at edges (circular)
        float edgeFade = 1.0 - smoothstep(0.35, 0.5, length(vUv - 0.5));

        // Base grid color brightens near depressions
        float depressionGlow = smoothstep(0.0, 4.0, vDepression);
        vec3 baseColor = uGridColor;

        // Blend toward nearest mass color based on proximity
        vec3 colorInfluence = vec3(0.0);
        float totalInfluence = 0.0;
        for (int i = 0; i < ${MAX_MASSES}; i++) {
          if (i >= uMassCount) break;
          float dx = vWorldPos.x - uMassPositions[i].x;
          float dz = vWorldPos.z - uMassPositions[i].z;
          float dist = sqrt(dx * dx + dz * dz);
          float influence = uMassWeights[i] / (1.0 + dist * dist * 0.2);
          colorInfluence += uMassColors[i] * influence;
          totalInfluence += influence;
        }
        if (totalInfluence > 0.01) {
          colorInfluence /= totalInfluence;
          baseColor = mix(baseColor, colorInfluence, clamp(depressionGlow * uGlowIntensity, 0.0, 0.85));
        }

        // Final color: grid lines only (transparent between)
        float alpha = gridLine * edgeFade * (0.2 + depressionGlow * 0.5);

        // Slight pulse near deep wells
        alpha *= 0.9 + 0.1 * sin(uTime * 2.0 + vDepression * 3.0);

        gl_FragColor = vec4(baseColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  fabricMesh = new THREE.Mesh(geo, mat);
  fabricMesh.position.y = FABRIC_Y;
  fabricMesh.renderOrder = -1; // Render before other transparent objects
  scene.add(fabricMesh);
}

function updateSpacetimeFabric(time) {
  if (!fabricMesh || !fabricUniforms) return;

  fabricUniforms.uTime.value = time;

  // Central star mass
  const positions = fabricUniforms.uMassPositions.value;
  const weights = fabricUniforms.uMassWeights.value;
  const colors = fabricUniforms.uMassColors.value;

  positions[0].set(0, 0, 0);
  weights[0] = 5.0; // Heavy central star
  colors[0].set(0.9, 0.03, 0.08); // Red

  // Passion sphere masses
  let count = 1;
  for (let i = 0; i < passionGroups.length && count < MAX_MASSES; i++) {
    const group = passionGroups[i];
    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);
    positions[count].set(worldPos.x, worldPos.y, worldPos.z);
    weights[count] = 1.5; // Smaller mass for passion spheres
    const passionColor = hexToThreeColor(PASSIONS[i].color);
    colors[count].copy(passionColor);
    count++;
  }

  fabricUniforms.uMassCount.value = count;
}

// ── Shooting Stars (Meteors) ────────────────────────────────────────────────────

function buildMeteors() {
  for (let i = 0; i < METEOR_POOL_SIZE; i++) {
    const points = [];
    const alphas = [];
    const tailLen = 20;
    for (let j = 0; j < tailLen; j++) {
      points.push(new THREE.Vector3(0, 0, 0));
      alphas.push(1.0 - j / tailLen);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const colorArr = new Float32Array(tailLen * 3);
    for (let j = 0; j < tailLen; j++) {
      const a = alphas[j];
      colorArr[j * 3] = a;
      colorArr[j * 3 + 1] = a * 0.9;
      colorArr[j * 3 + 2] = a * 0.7;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));

    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.visible = false;

    // Head glow
    const headLight = new THREE.PointLight(0xffddaa, 2, 10, 2);
    headLight.visible = false;
    scene.add(headLight);

    scene.add(line);
    meteors.push({
      line,
      headLight,
      active: false,
      progress: 0,
      duration: 0.8,
      startPos: new THREE.Vector3(),
      direction: new THREE.Vector3(),
      speed: 0,
    });
  }
  nextMeteorTime = 3 + Math.random() * 5;
}

function activateMeteor() {
  const dormant = meteors.find(m => !m.active);
  if (!dormant) return;

  // Random start position in the upper hemisphere
  const angle = Math.random() * Math.PI * 2;
  const elevation = 10 + Math.random() * 20;
  const dist = 20 + Math.random() * 20;
  dormant.startPos.set(
    Math.cos(angle) * dist,
    elevation,
    Math.sin(angle) * dist
  );

  // Random direction , generally downward and inward
  dormant.direction.set(
    (Math.random() - 0.5) * 2,
    -0.5 - Math.random() * 0.5,
    (Math.random() - 0.5) * 2
  ).normalize();

  dormant.speed = 40 + Math.random() * 20;
  dormant.progress = 0;
  dormant.active = true;
  dormant.line.visible = true;
  dormant.headLight.visible = true;
}

function updateMeteors(dt) {
  nextMeteorTime -= dt;
  if (nextMeteorTime <= 0) {
    activateMeteor();
    nextMeteorTime = 3 + Math.random() * 5;
  }

  for (const m of meteors) {
    if (!m.active) continue;
    m.progress += dt;
    if (m.progress >= m.duration) {
      m.active = false;
      m.line.visible = false;
      m.headLight.visible = false;
      continue;
    }

    const t = m.progress;
    const headPos = m.startPos.clone().addScaledVector(m.direction, m.speed * t);
    m.headLight.position.copy(headPos);

    // Update tail positions
    const posArr = m.line.geometry.attributes.position.array;
    const tailLen = posArr.length / 3;
    for (let j = 0; j < tailLen; j++) {
      const trailT = t - (j / tailLen) * 0.15;
      const pos = m.startPos.clone().addScaledVector(m.direction, m.speed * Math.max(0, trailT));
      posArr[j * 3] = pos.x;
      posArr[j * 3 + 1] = pos.y;
      posArr[j * 3 + 2] = pos.z;
    }
    m.line.geometry.attributes.position.needsUpdate = true;

    // Fade out near end
    const fade = m.progress > m.duration * 0.6 ? 1 - (m.progress - m.duration * 0.6) / (m.duration * 0.4) : 1;
    m.line.material.opacity = 0.8 * fade;
    m.headLight.intensity = 2 * fade;
  }
}

// ── Audio ───────────────────────────────────────────────────────────────────────

function setupAudio() {
  // Check localStorage for mute preference
  audioMuted = localStorage.getItem('universe-muted') === 'true';
  updateSoundIcon();

  // Create audio element (will use a generated tone if no file)
  audioEl = document.createElement('audio');
  audioEl.loop = true;
  audioEl.volume = 0;

  // Try loading ambient file, fall back to silence
  audioEl.src = 'assets/ambient-space.mp3';
  audioEl.addEventListener('error', () => {
    // No audio file available , generate a simple ambient tone using Web Audio API
    generateAmbientTone();
  });

  // Unlock audio on first interaction
  const unlock = () => {
    audioCtxUnlocked = true;
    document.removeEventListener('click', unlock);
    document.removeEventListener('touchstart', unlock);
  };
  document.addEventListener('click', unlock, { once: false });
  document.addEventListener('touchstart', unlock, { once: false });

  // Sound toggle
  const btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      audioMuted = !audioMuted;
      localStorage.setItem('universe-muted', audioMuted);
      updateSoundIcon();
      if (audioMuted) {
        audioEl.volume = 0;
      } else if (audioEl.paused === false) {
        audioEl.volume = 0.15;
      }
    });
  }
}

let webAudioCtx = null;
let webAudioGain = null;

function generateAmbientTone() {
  // Generate a subtle ambient drone using Web Audio API
  try {
    webAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    webAudioGain = webAudioCtx.createGain();
    webAudioGain.gain.value = 0;
    webAudioGain.connect(webAudioCtx.destination);

    // Low drone
    const osc1 = webAudioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 55; // Low A
    const gain1 = webAudioCtx.createGain();
    gain1.gain.value = 0.3;
    osc1.connect(gain1);
    gain1.connect(webAudioGain);
    osc1.start();

    // Sub-harmonic
    const osc2 = webAudioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 82.5;
    const gain2 = webAudioCtx.createGain();
    gain2.gain.value = 0.15;
    osc2.connect(gain2);
    gain2.connect(webAudioGain);
    osc2.start();

    // Very slow LFO on drone
    const lfo = webAudioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1;
    const lfoGain = webAudioCtx.createGain();
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfo.start();

    // Override audioEl fade methods to use webAudioGain
    audioEl._useWebAudio = true;
  } catch {
    // Web Audio not available , silent fallback
  }
}

function updateSoundIcon() {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  if (!icon) return;
  icon.className = audioMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

function fadeAudioIn() {
  if (audioMuted || !audioCtxUnlocked) return;
  audioFadingIn = true;
  audioFadingOut = false;

  if (audioEl._useWebAudio) {
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
      webAudioCtx.resume();
    }
  } else {
    audioEl.play().catch(() => {});
  }
}

function fadeAudioOut() {
  audioFadingOut = true;
  audioFadingIn = false;
}

function updateAudioFade(dt) {
  if (audioEl._useWebAudio && webAudioGain) {
    const vol = webAudioGain.gain.value;
    if (audioFadingIn && !audioMuted) {
      const newVol = Math.min(0.15, vol + dt * 0.1);
      webAudioGain.gain.value = newVol;
      if (newVol >= 0.15) audioFadingIn = false;
    }
    if (audioFadingOut) {
      const newVol = Math.max(0, vol - dt * 0.15);
      webAudioGain.gain.value = newVol;
      if (newVol <= 0) {
        audioFadingOut = false;
      }
    }
  } else if (audioEl) {
    if (audioFadingIn && !audioMuted) {
      audioEl.volume = Math.min(0.15, audioEl.volume + dt * 0.1);
      if (audioEl.volume >= 0.15) audioFadingIn = false;
    }
    if (audioFadingOut) {
      audioEl.volume = Math.max(0, audioEl.volume - dt * 0.15);
      if (audioEl.volume <= 0) {
        audioFadingOut = false;
        audioEl.pause();
      }
    }
  }
}

// ── Events ──────────────────────────────────────────────────────────────────────

function setupEvents(container) {
  window.addEventListener('resize', debounce(resize, 200));

  // Pointer move for raycasting
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerdown', onPointerDown);

  // ESC to defocus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewState === STATE.FOCUSED) {
      defocus();
    }
  });

  // Close button on info card
  const closeBtn = document.getElementById('passion-info-close');
  if (closeBtn) closeBtn.addEventListener('click', defocus);
}

let pointerDownPos = { x: 0, y: 0 };
let pointerDownTime = 0;

function onPointerDown(e) {
  pointerDownPos.x = e.clientX;
  pointerDownPos.y = e.clientY;
  pointerDownTime = performance.now();
}

function onPointerMove(e) {
  const container = document.getElementById('universe-3d');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
}

function setupClickDetection(container) {
  container.addEventListener('pointerup', (e) => {
    const dx = e.clientX - pointerDownPos.x;
    const dy = e.clientY - pointerDownPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const elapsed = performance.now() - pointerDownTime;

    // Only count as click if short time and small movement
    if (dist < 10 && elapsed < 300) {
      onClickScene(e);
    }
  });
}

function onClickScene(e) {
  // Hide hint on first interaction
  const hint = document.getElementById('universe-hint');
  if (hint && hint.style.opacity !== '0') {
    hint.style.opacity = '0';
  }

  if (viewState === STATE.FLYING_TO || viewState === STATE.FLYING_BACK) return;

  raycaster.setFromCamera(pointer, camera);

  // Check the core first (the red central star opens "The Thread" essay)
  if (centralStarMesh && viewState !== STATE.FOCUSED) {
    const coreHits = raycaster.intersectObject(centralStarMesh);
    if (coreHits.length > 0) {
      if (typeof window.openDive === 'function') {
        window.openDive('the-thread');
      }
      return;
    }
  }

  // Check if we hit a passion sphere
  const hits = raycaster.intersectObjects(passionMeshes);

  if (hits.length > 0) {
    const idx = hits[0].object.userData.passionIndex;
    if (viewState === STATE.FOCUSED && focusedIndex === idx) return;
    focusOnPassion(idx);
  } else if (viewState === STATE.FOCUSED) {
    defocus();
  }
}

// ── Focus / Defocus ─────────────────────────────────────────────────────────────

function focusOnPassion(idx) {
  focusedIndex = idx;
  const group = passionGroups[idx];
  const worldPos = new THREE.Vector3();
  group.getWorldPosition(worldPos);

  // Camera target: offset from sphere
  const dir = worldPos.clone().normalize();
  const targetPos = worldPos.clone().add(dir.multiplyScalar(4)).add(new THREE.Vector3(0, 2, 0));

  // Start fly animation
  cameraFrom.copy(camera.position);
  cameraTo.copy(targetPos);
  cameraLookFrom.copy(controls.target);
  cameraLookTo.copy(worldPos);
  flyT = 0;
  viewState = STATE.FLYING_TO;
  controls.autoRotate = false;

  // Dim other spheres
  passionGroups.forEach((g, i) => {
    g.userData.targetScale = i === idx ? 1.3 : 0.6;
    if (i !== idx) {
      g.children.forEach(child => {
        if (child.isMesh && child.material.opacity !== undefined) {
          child.material.transparent = true;
        }
      });
    }
  });

  // Show info card
  showInfoCard(idx);
}

function defocus() {
  if (viewState !== STATE.FOCUSED) return;

  // Fly back
  cameraFrom.copy(camera.position);
  cameraTo.set(0, 12, 35);
  cameraLookFrom.copy(controls.target);
  cameraLookTo.set(0, 0, 0);
  flyT = 0;
  viewState = STATE.FLYING_BACK;

  // Restore all spheres
  passionGroups.forEach(g => {
    g.userData.targetScale = 1;
  });

  hideInfoCard();
  focusedIndex = -1;
}

// ── Info Card ───────────────────────────────────────────────────────────────────

function showInfoCard(idx) {
  const card = document.getElementById('passion-info-card');
  const passion = PASSIONS[idx];
  if (!card) return;

  document.getElementById('passion-info-emoji').textContent = passion.emoji;
  document.getElementById('passion-info-name').textContent = passion.label;
  document.getElementById('passion-info-desc').textContent = passion.desc;
  document.getElementById('passion-info-name').style.color = passion.color;

  const link = document.getElementById('passion-info-link');
  link.onclick = (e) => {
    e.preventDefault();
    showDeepDive(idx);
  };

  card.classList.add('visible');
}

function hideInfoCard() {
  const card = document.getElementById('passion-info-card');
  if (card) card.classList.remove('visible');
}

// ── Deep Dive Modal ─────────────────────────────────────────────────────────────

function showDeepDive(idx) {
  const passion = PASSIONS[idx];
  let modal = document.getElementById('passion-deep-dive');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'passion-deep-dive';
    modal.className = 'passion-deep-dive';
    document.querySelector('.universe-container').appendChild(modal);
  }

  const paragraphs = passion.deepDesc.map(p => `<p>${p}</p>`).join('');

  modal.innerHTML = `
    <div class="deep-dive-backdrop"></div>
    <div class="deep-dive-content">
      <button class="deep-dive-close" aria-label="Close">&times;</button>
      <div class="deep-dive-header">
        <span class="deep-dive-emoji">${passion.emoji}</span>
        <h2 class="deep-dive-title" style="color: ${passion.color}">${passion.label}</h2>
        <div class="deep-dive-accent" style="background: ${passion.color}"></div>
      </div>
      <div class="deep-dive-body">
        ${paragraphs}
      </div>
      <div class="deep-dive-quote">Part of what makes me, me.</div>
    </div>
  `;

  // Force reflow then add visible class
  modal.offsetHeight;
  modal.classList.add('visible');

  // Close handlers
  const closeBtn = modal.querySelector('.deep-dive-close');
  const backdrop = modal.querySelector('.deep-dive-backdrop');

  const closeModal = () => {
    modal.classList.remove('visible');
    setTimeout(() => {
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    }, 400);
  };

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // ESC closes deep dive (but not the sphere focus)
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

// ── Labels (HTML overlay) ───────────────────────────────────────────────────────

function updateLabels() {
  // Create/update HTML labels on hover
  let labelEl = document.getElementById('passion-hover-label');
  if (!labelEl) {
    labelEl = document.createElement('div');
    labelEl.id = 'passion-hover-label';
    labelEl.className = 'passion-label';
    document.getElementById('universe-3d').appendChild(labelEl);
  }

  if (hoveredObj !== null && viewState === STATE.OVERVIEW) {
    const idx = hoveredObj.userData.passionIndex;
    const passion = PASSIONS[idx];
    const group = passionGroups[idx];
    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);

    // Project to screen
    const projected = worldPos.clone().project(camera);
    const container = document.getElementById('universe-3d');
    const rect = container.getBoundingClientRect();
    const x = (projected.x * 0.5 + 0.5) * rect.width;
    const y = (-projected.y * 0.5 + 0.5) * rect.height;

    labelEl.textContent = `${passion.emoji} ${passion.label}`;
    labelEl.style.left = x + 'px';
    labelEl.style.top = (y - 30) + 'px';
    labelEl.style.opacity = '1';
    labelEl.style.color = passion.color;
  } else {
    labelEl.style.opacity = '0';
  }
}

function updateCoreLabel(show) {
  let el = document.getElementById('core-hover-label');
  if (!el) {
    el = document.createElement('div');
    el.id = 'core-hover-label';
    el.className = 'core-label';
    el.innerHTML = '<span class="core-label-eyebrow">The Core</span><span class="core-label-title">Find the Thread &rarr;</span>';
    document.getElementById('universe-3d').appendChild(el);
  }

  if (show && centralStarMesh) {
    const worldPos = new THREE.Vector3();
    centralStarMesh.getWorldPosition(worldPos);
    const projected = worldPos.clone().project(camera);
    const container = document.getElementById('universe-3d');
    const rect = container.getBoundingClientRect();
    const x = (projected.x * 0.5 + 0.5) * rect.width;
    const y = (-projected.y * 0.5 + 0.5) * rect.height;
    el.style.left = x + 'px';
    el.style.top = (y - 60) + 'px';
    el.style.opacity = '1';
  } else {
    el.style.opacity = '0';
  }
}

// ── Resize ──────────────────────────────────────────────────────────────────────

function resize() {
  const container = document.getElementById('universe-3d');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(rect.width, rect.height);
  composer.setSize(rect.width, rect.height);
}

// ── Animation Loop ──────────────────────────────────────────────────────────────

function tick() {
  requestAnimationFrame(tick);

  const section = document.getElementById('my-universe');
  const isActive = section && section.classList.contains('active');

  if (!isActive) {
    if (audioFadingIn || (audioEl && audioEl.volume > 0)) fadeAudioOut();
    updateAudioFade(clock.getDelta());
    return;
  }

  // Audio fade in when active
  if (!audioFadingIn && viewState !== STATE.FOCUSED) {
    const vol = audioEl._useWebAudio
      ? (webAudioGain ? webAudioGain.gain.value : 0)
      : (audioEl ? audioEl.volume : 0);
    if (vol < 0.15) fadeAudioIn();
  }

  const dt = clock.getDelta();
  const time = clock.getElapsedTime();
  frameCount++;

  // FPS monitoring for first 10 frames
  if (frameCount <= 10 && bloomEnabled) {
    fpsHistory.push(1 / Math.max(dt, 0.001));
    if (frameCount === 10) {
      const avgFps = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;
      if (avgFps < 30) {
        bloomEnabled = false;
      }
    }
  }

  // Update controls
  controls.update();

  // Camera fly animation
  if (viewState === STATE.FLYING_TO || viewState === STATE.FLYING_BACK) {
    flyT += dt / FLY_DURATION;
    if (flyT >= 1) {
      flyT = 1;
      camera.position.copy(cameraTo);
      controls.target.copy(cameraLookTo);
      if (viewState === STATE.FLYING_TO) {
        viewState = STATE.FOCUSED;
      } else {
        viewState = STATE.OVERVIEW;
        if (!reducedMotion) controls.autoRotate = true;
      }
    } else {
      const t = easeInOutCubic(flyT);
      camera.position.lerpVectors(cameraFrom, cameraTo, t);
      controls.target.lerpVectors(cameraLookFrom, cameraLookTo, t);
    }
  }

  // Update orbital positions
  if (!reducedMotion) {
    passionGroups.forEach((group) => {
      const ud = group.userData;
      ud.orbitAngle += ud.orbitSpeed * dt * 0.3;
      const r = ud.orbitRadius;
      group.position.set(
        Math.cos(ud.orbitAngle) * r,
        Math.sin(ud.orbitTilt) * Math.sin(ud.orbitAngle) * r * 0.3,
        Math.sin(ud.orbitAngle) * r
      );
    });
  }

  // Update sphere scales, sphere glass-opacity, and emoji visibility
  const _worldPos = new THREE.Vector3();
  passionGroups.forEach((group, i) => {
    const ud = group.userData;
    ud.currentScale += (ud.targetScale - ud.currentScale) * 0.1;
    group.scale.setScalar(ud.currentScale);

    if (!ud.sphere) return;

    group.getWorldPosition(_worldPos);
    const dist = camera.position.distanceTo(_worldPos);
    const isFocused = focusedIndex === i;

    // Sphere target opacity:
    //   1.0 = solid planet (far view)
    //   0.18 = glass (close / focused, emoji inside visible)
    let sphereTarget = 1.0;
    if (isFocused) {
      sphereTarget = 0.18;
    } else if (dist < 7) {
      // Smoothly go glass as camera approaches
      const t = Math.max(0, Math.min(1, (dist - 2.5) / 4.5));
      sphereTarget = 0.2 + 0.8 * t;
    }
    const sMat = ud.sphere.material;
    sMat.opacity += (sphereTarget - sMat.opacity) * 0.1;
    sMat.depthWrite = sMat.opacity >= 0.95;

    // Emoji target opacity: inverse-ish of sphere opacity, gated on proximity
    if (ud.emojiSprite) {
      let eTarget = 0;
      if (isFocused) {
        eTarget = 1.0;
      } else if (dist < 8) {
        eTarget = Math.max(0, Math.min(1, (8 - dist) / 5));
      }
      const eMat = ud.emojiSprite.material;
      eMat.opacity += (eTarget - eMat.opacity) * 0.12;
    }
  });

  // Update central star corona shader
  const corona = scene.getObjectByName('corona');
  if (corona && corona.material.uniforms) {
    corona.material.uniforms.uTime.value = time;
  }

  // Update glow shaders
  if (!isMobile) {
    passionGroups.forEach((group) => {
      group.children.forEach(child => {
        if (child.material && child.material.uniforms && child.material.uniforms.uTime) {
          child.material.uniforms.uTime.value = time;
        }
      });
    });
  }

  // Update connection lines
  connectionLines.forEach((line) => {
    const { indexA, indexB } = line.userData;
    const posA = new THREE.Vector3();
    const posB = new THREE.Vector3();
    passionGroups[indexA].getWorldPosition(posA);
    passionGroups[indexB].getWorldPosition(posB);
    const posArr = line.geometry.attributes.position.array;
    posArr[0] = posA.x; posArr[1] = posA.y; posArr[2] = posA.z;
    posArr[3] = posB.x; posArr[4] = posB.y; posArr[5] = posB.z;
    line.geometry.attributes.position.needsUpdate = true;
  });

  // Update spacetime fabric
  updateSpacetimeFabric(time);

  // Rotate nebula slowly
  if (nebulaParticles && !reducedMotion) {
    nebulaParticles.rotation.y += dt * 0.02;
  }

  // Raycasting for hover
  if (viewState === STATE.OVERVIEW || viewState === STATE.FOCUSED) {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(passionMeshes);
    const newHovered = hits.length > 0 ? hits[0].object : null;

    if (newHovered !== hoveredObj) {
      // Reset previous
      if (hoveredObj !== null) {
        const prevIdx = hoveredObj.userData.passionIndex;
        if (prevIdx !== focusedIndex) {
          passionGroups[prevIdx].userData.targetScale = focusedIndex >= 0 ? 0.6 : 1;
        }
      }
      // Set new
      if (newHovered) {
        const idx = newHovered.userData.passionIndex;
        if (idx !== focusedIndex) {
          passionGroups[idx].userData.targetScale = 1.3;
        }
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'default';
      }
      hoveredObj = newHovered;
    }

    // Core hover (only when no passion is hovered / focused)
    if (!newHovered && centralStarMesh && viewState === STATE.OVERVIEW) {
      const coreHits = raycaster.intersectObject(centralStarMesh);
      const coreHovered = coreHits.length > 0;
      updateCoreLabel(coreHovered);
      if (coreHovered) renderer.domElement.style.cursor = 'pointer';
    } else {
      updateCoreLabel(false);
    }
  }

  // Update labels
  updateLabels();

  // Update shooting stars
  if (!reducedMotion) {
    updateMeteors(dt);
  }

  // Update audio fade
  updateAudioFade(dt);

  // Render
  if (bloomEnabled) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

// ── Utilities ───────────────────────────────────────────────────────────────────

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Boot ────────────────────────────────────────────────────────────────────────

function boot() {
  const section = document.getElementById('my-universe');
  if (!section) return;

  // If section is already active, init immediately
  if (section.classList.contains('active')) {
    init();
    return;
  }

  // Otherwise, observe for activation
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'class' && section.classList.contains('active')) {
        if (!initialized) init();
        observer.disconnect();
        break;
      }
    }
  });
  observer.observe(section, { attributes: true });

  // Also try periodically (fallback)
  const tryInit = () => {
    if (!initialized && section.classList.contains('active')) {
      init();
    } else if (!initialized) {
      requestAnimationFrame(tryInit);
    }
  };
  requestAnimationFrame(tryInit);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
