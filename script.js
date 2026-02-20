// Clock Update
function updateClock() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  document.getElementById('date').textContent = dateStr;
  document.getElementById('time').textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Switch to Motivation on Interaction
let interacted = false;
function showMotivation() {
  if (interacted) return;
  interacted = true;

  const clockEl = document.getElementById('clock');
  const motivationEl = document.getElementById('motivation');
  const verseEl = document.getElementById('verse');

  // Random Scripture (motivational Bible verses)
  const verses = [
    'Isaiah 41:10 - So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    'Philippians 4:13 - I can do all this through him who gives me strength.',
    'John 16:33 - In this world you will have trouble. But take heart! I have overcome the world.',
    'Romans 12:12 - Be joyful in hope, patient in affliction, faithful in prayer.',
    'Psalm 23:4 - Even though I walk through the darkest valley, I will fear no evil, for you are with me.',
    'Joshua 1:9 - Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    'Proverbs 3:5-6 - Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    'Psalm 73:26 - My flesh and my heart may fail, but God is the strength of my heart and my portion forever.',
    'Isaiah 40:31 - But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    '2 Corinthians 12:9 - My grace is sufficient for you, for my power is made perfect in weakness.',
    'Romans 15:13 - May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.',
    'Psalm 27:14 - Wait for the Lord; be strong and take heart and wait for the Lord.',
    'Deuteronomy 31:6 - Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.',
    'John 14:27 - Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    'Ephesians 2:10 - For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.'
  ];

  const randomVerse = verses[Math.floor(Math.random() * verses.length)];
  verseEl.textContent = randomVerse;

  if (clockEl) clockEl.classList.add('hidden');
  if (motivationEl) motivationEl.classList.remove('hidden');
}

// Listen for any interaction
document.addEventListener('click', showMotivation);
document.addEventListener('keydown', showMotivation);

// Easter Egg: Glitch every ~2 min
const glitches = [
  // Doctor (eye closeup)
  {
    img: 'https://static.wikia.nocookie.net/villains/images/7/79/Chapter_5_harley.png/revision/latest',
    quote: 'There is a secret inside you... It excites me!'
  },
  {
    img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/66133900-9dbc-43db-8ddd-95e4dcd957b4/dj08rlc-22afa084-aa09-4b38-aa23-8eefc226f84c.png/v1/fill/w_900,h_600,q_80,strp/dr_harley_sawyer__poppy__playtime__by_happymrz3ne_dj08rlc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6Ii9mLzY2MTMzOTAwLTlkYmMtNDNkYi04ZGRkLTk1ZTRkY2Q5NTdiNC9kajA4cmxjLTIyYWZhMDg0LWFhMDktNGIzOC1hYTIzLThlZWZjMjI2Zjg0Yy5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.nV1p6B89bk1Oe6nfped0LstZdteU6i7DfYc7RcebaKE',
    quote: 'My name is Harley Sawyer. I\'m called "The Doctor".'
  },
  // Prototype (eye in dark + claw)
  {
    img: 'https://i.ytimg.com/vi/6wbnmayZSxg/sddefault.jpg',
    quote: 'I built us a home and kept us safe.'
  },
  {
    img: 'https://i.redd.it/about-the-prototype-v0-z5aw69eh0dhe1.png?width=1080&format=png&auto=webp&s=1a3dc268c7e37d6ddad1d6dd1b8f0835769563b4',
    quote: 'You don\'t need to pretend anymore.'
  }
];

function triggerGlitch() {
  const glitchEl = document.getElementById('glitch');
  const quoteEl = document.querySelector('.glitch-quote');

  if (!glitchEl || !quoteEl) return;

  const randomGlitch = glitches[Math.floor(Math.random() * glitches.length)];
  glitchEl.style.backgroundImage = `url('${randomGlitch.img}')`;
  quoteEl.textContent = randomGlitch.quote;

  glitchEl.classList.remove('hidden');
  glitchEl.classList.add('show');

  const duration = Math.random() * 1000 + 1000; // 1-2s
  setTimeout(() => {
    glitchEl.classList.remove('show');
    glitchEl.classList.add('hidden');
  }, duration);
}

// Random interval ~1.5-2.5 min
function scheduleGlitch() {
  const interval = (Math.random() * 60000 + 90000); // 90-150s base
  setTimeout(() => {
    triggerGlitch();
    scheduleGlitch();
  }, interval);
}
scheduleGlitch();

// ---------- Poppy-style Death Screen ----------

const deathMessages = [
  "You can fall apart later.",
  "Nobody came here by choice.",
  "You are too useful to lose.",
  "Innovation is key. Remember that.",
  "He is loose. This is not over.",
  "The factory is not done with you.",
  "We still have plans for you.",
  "You can die later. Not now.",
  "They are hungry. Don’t keep them waiting.",
  "The Prototype is watching. Be wonderful."
];

let deathScreenTimeout = null;

function showDeathScreen() {
  const overlay = document.getElementById("death-screen");
  const msgEl = document.getElementById("death-message");
  const subEl = document.getElementById("death-subtext");

  if (!overlay || !msgEl || !subEl) return;

  const msg = deathMessages[Math.floor(Math.random() * deathMessages.length)];
  msgEl.textContent = msg;
  subEl.textContent = "GET UP.";

  overlay.classList.add("active");
  overlay.style.opacity = "1";

  clearTimeout(deathScreenTimeout);
  deathScreenTimeout = setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.classList.remove("active");
    }, 400);
  }, 4000);
}

// Random-ish every ~2 minutes
function scheduleRandomDeath() {
  const min = 90_000;  // 1.5 min
  const max = 150_000; // 2.5 min
  const delay = Math.floor(Math.random() * (max - min)) + min;
  setTimeout(() => {
    showDeathScreen();
    scheduleRandomDeath();
  }, delay);
}
scheduleRandomDeath();

// 1006 key sequence trigger
const code1006 = ["1", "0", "0", "6"];
let buffer1006 = [];

document.addEventListener("keydown", (e) => {
  // keep existing motivation logic, plus our sequence tracking
  buffer1006.push(e.key);
  if (buffer1006.length > code1006.length) {
    buffer1006.shift();
  }

  const match = code1006.every((k, i) => buffer1006[i] === k);
  if (match) {
    showDeathScreen();
    buffer1006 = [];
  }
}, true);
