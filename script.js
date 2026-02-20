// ----- Clock -----
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

  const dateEl = document.getElementById('date');
  const timeEl = document.getElementById('time');
  if (dateEl) dateEl.textContent = dateStr;
  if (timeEl) timeEl.textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// ----- Poppy-style death messages -----
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
  msgEl.textContent = msg.toUpperCase();
  subEl.textContent = "GET UP.";

  overlay.classList.add("active");
  overlay.style.opacity = "0";

  // quick flicker in
  setTimeout(() => {
    overlay.style.opacity = "1";
  }, 30);

  clearTimeout(deathScreenTimeout);
  deathScreenTimeout = setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.classList.remove("active");
    }, 120);
  }, 2000); // visible about 2 seconds
}

// Random-ish every ~2 minutes (1.5–2.5 min)
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

// ----- 1006 key sequence trigger -----
const code1006 = ["1", "0", "0", "6"];
let buffer1006 = [];

document.addEventListener("keydown", (e) => {
  if (e.key.length > 1 && !e.key.startsWith("Arrow")) return;

  buffer1006.push(e.key);
  if (buffer1006.length > code1006.length) {
    buffer1006.shift();
  }

  const match = code1006.every((k, i) => buffer1006[i] === k);
  if (match) {
    showDeathScreen();
    buffer1006 = [];
  }
});
