// Utility: dates
function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatFullDate(d = new Date()) {
  const opts = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
  return d.toLocaleDateString(undefined, opts);
}

// DOM refs
const gateEl = document.getElementById("gate");
const gateTimeEl = document.getElementById("gate-time");
const gateDateEl = document.getElementById("gate-date");
const gateMessageEl = document.getElementById("gate-message");

const appEl = document.getElementById("app");
const bodyEl = document.body;
const sidebarDateEl = document.getElementById("sidebar-date");
const navButtons = document.querySelectorAll(".nav-link");

const directionTextEl = document.getElementById("direction-text");
const focusInput = document.getElementById("focus-input");
const sleepInput = document.getElementById("sleep-input");
const checkWord = document.getElementById("check-word");
const checkWater = document.getElementById("check-water");
const checkMove = document.getElementById("check-move");
const todaySaveBtn = document.getElementById("today-save-btn");

const systemsListEl = document.getElementById("systems-list");
const systemsProgressTextEl = document.getElementById("systems-progress-text");
const systemsEditTextarea = document.getElementById("systems-edit-textarea");
const systemsSaveBtn = document.getElementById("systems-save-btn");

const logDateInput = document.getElementById("log-date-input");
const logTodayBtn = document.getElementById("log-today-btn");
const logBodyEl = document.getElementById("log-body");
const logSummaryTextEl = document.getElementById("log-summary-text");
const logAddBtn = document.getElementById("log-add-btn");
const logClearBtn = document.getElementById("log-clear-btn");

const weekGridEl = document.getElementById("week-grid");

const scriptureRefEl = document.getElementById("scripture-ref");
const scriptureTextEl = document.getElementById("scripture-text");
const scriptureNextBtn = document.getElementById("scripture-next-btn");

const reflectionTextarea = document.getElementById("reflection-textarea");
const reflectionSaveBtn = document.getElementById("reflection-save-btn");
const reflectionClearBtn = document.getElementById("reflection-clear-btn");
const reflectionStatusEl = document.getElementById("reflection-status");

const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleIcon = document.getElementById("theme-toggle-icon");

// Storage keys
const KEY_TODAY_OVERVIEW = "coach_today_overview_v1";
const KEY_SYSTEMS_ITEMS = "coach_systems_items_v1";
const KEY_SYSTEMS_STATE_PREFIX = "coach_systems_state_";
const KEY_LOG = "coach_training_log_v1";
const KEY_WEEKLY_PLAN = "coach_weekly_plan_v1";
const KEY_REFLECTION = "coach_reflection_v1";
const KEY_THEME = "coach_theme_v1";

// State
let todayOverview = {};
let systemsItems = [];
let systemsState = {};
let logByDate = {};
let weeklyPlan = {};
let reflectionByDate = {};

let currentLogDate = todayISO();
let currentDirectionIndex = 0;
let currentScriptureIndex = 0;

// Direction messages
const DIRECTIONS = [
  "Be faithful in the small reps.",
  "No one is coming to save you. Steward what you have.",
  "Show up, even tired. You’re building a man, not a moment.",
  "You know what needs to be done.",
  "Honor God with your discipline, not just your words.",
  "Stack quiet, boring days. That’s where strength is built.",
  "You prayed. Now move like it matters."
];

// Scripture list (reference + short paraphrase)
const SCRIPTURES = [
  {
    ref: "1 Corinthians 10:31",
    text: "Whatever you do, do it for God’s glory. Don’t waste the reps."
  },
  {
    ref: "Colossians 3:23",
    text: "Work from the heart, as if God Himself is your boss."
  },
  {
    ref: "1 Timothy 4:8",
    text: "Training your body matters, but godliness carries eternal weight."
  },
  {
    ref: "Hebrews 12:11",
    text: "Discipline is painful now, but it produces a solid, lasting harvest."
  },
  {
    ref: "Proverbs 6:23",
    text: "Discipline is a lamp. Let it guide your steps, not your moods."
  },
  {
    ref: "James 1:12",
    text: "Stay steady under trial. God sees the quiet, faithful grind."
  }
];

// Weekly days
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Gate messages
const GATE_MESSAGES = [
  "It’s time to move.",
  "Steward your body today.",
  "Quiet mind. Hard work. Stay with it.",
  "Less talk. More reps.",
  "Show God you’re serious with how you move."
];

// Storage helpers
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// THEME

function applyTheme(theme) {
  bodyEl.classList.remove("theme-light", "theme-dark");
  bodyEl.classList.add(theme);
  themeToggleIcon.textContent = theme === "theme-dark" ? "☀︎" : "☾";
}

function initTheme() {
  const stored = loadJSON(KEY_THEME, null);
  if (stored === "theme-dark" || stored === "theme-light") {
    applyTheme(stored);
  } else {
    applyTheme("theme-light");
  }

  themeToggleBtn.addEventListener("click", () => {
    const nowTheme = bodyEl.classList.contains("theme-dark") ? "theme-dark" : "theme-light";
    const nextTheme = nowTheme === "theme-dark" ? "theme-light" : "theme-dark";
    applyTheme(nextTheme);
    saveJSON(KEY_THEME, nextTheme);
  });
}

// GATE

function updateGateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  gateTimeEl.textContent = `${hour12}:${minutes} ${ampm}`;
  gateDateEl.textContent = formatFullDate(now);
}

function initGate() {
  gateMessageEl.textContent = GATE_MESSAGES[Math.floor(Math.random() * GATE_MESSAGES.length)];
  updateGateTime();
  setInterval(updateGateTime, 1000);

  function openApp() {
    gateEl.classList.add("hidden");
    appEl.classList.remove("hidden");
  }

  gateEl.addEventListener("click", openApp);
  window.addEventListener("keydown", openApp);
}

// Sidebar date
function updateSidebarDate() {
  sidebarDateEl.textContent = formatFullDate(new Date());
}

// TODAY OVERVIEW

function loadTodayOverview() {
  todayOverview = loadJSON(KEY_TODAY_OVERVIEW, {});
}

function saveTodayOverview() {
  todayOverview = {
    focus: focusInput.value.trim(),
    sleep: sleepInput.value || "",
    inWord: checkWord.checked,
    hydrated: checkWater.checked,
    moved: checkMove.checked
  };
  saveJSON(KEY_TODAY_OVERVIEW, todayOverview);
}

function renderTodayOverview() {
  focusInput.value = todayOverview.focus || "";
  sleepInput.value = todayOverview.sleep || "";
  checkWord.checked = !!todayOverview.inWord;
  checkWater.checked = !!todayOverview.hydrated;
  checkMove.checked = !!todayOverview.moved;
}

function setRandomDirection() {
  currentDirectionIndex = Math.floor(Math.random() * DIRECTIONS.length);
  directionTextEl.textContent = DIRECTIONS[currentDirectionIndex];
}

// SYSTEMS CHECKLIST

function loadSystems() {
  systemsItems = loadJSON(KEY_SYSTEMS_ITEMS, [
    "Up before your planned time?",
    "No phone for first 30 minutes?",
    "Movement done?",
    "Protein target planned?"
  ]);
}

function saveSystemsItems() {
  saveJSON(KEY_SYSTEMS_ITEMS, systemsItems);
}

function loadSystemsState() {
  const key = KEY_SYSTEMS_STATE_PREFIX + todayISO();
  systemsState = loadJSON(key, {});
}

function saveSystemsState() {
  const key = KEY_SYSTEMS_STATE_PREFIX + todayISO();
  saveJSON(key, systemsState);
}

function renderSystems() {
  systemsListEl.innerHTML = "";
  systemsItems.forEach((label, index) => {
    const id = `system-${index}`;
    const checked = !!systemsState[id];

    const row = document.createElement("div");
    row.className = "system-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.addEventListener("change", () => {
      systemsState[id] = checkbox.checked;
      saveSystemsState();
      renderSystemsProgress();
    });

    const span = document.createElement("span");
    span.textContent = label;

    const labelEl = document.createElement("label");
    labelEl.appendChild(checkbox);
    labelEl.appendChild(span);

    row.appendChild(labelEl);
    systemsListEl.appendChild(row);
  });

  renderSystemsProgress();
  systemsEditTextarea.value = systemsItems.join("\n");
}

function renderSystemsProgress() {
  const total = systemsItems.length;
  let completed = 0;
  systemsItems.forEach((_, index) => {
    const id = `system-${index}`;
    if (systemsState[id]) completed++;
  });
  systemsProgressTextEl.textContent = `${completed} / ${total} systems locked in`;
}

// TRAINING LOG

function loadLog() {
  logByDate = loadJSON(KEY_LOG, {});
}

function saveLog() {
  saveJSON(KEY_LOG, logByDate);
}

function getLogEntries(dateISO) {
  if (!logByDate[dateISO]) logByDate[dateISO] = [];
  return logByDate[dateISO];
}

function renderLog() {
  const entries = getLogEntries(currentLogDate);
  logBodyEl.innerHTML = "";

  entries.forEach((entry, index) => {
    const tr = document.createElement("tr");

    function makeCellInput(value, key) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.className = "log-input";
      input.type = "text";
      input.value = value || "";
      input.addEventListener("input", () => {
        entry[key] = input.value;
        saveLog();
        renderLogSummary();
      });
      td.appendChild(input);
      return td;
    }

    tr.appendChild(makeCellInput(entry.exercise, "exercise"));
    tr.appendChild(makeCellInput(entry.sets, "sets"));
    tr.appendChild(makeCellInput(entry.reps, "reps"));
    tr.appendChild(makeCellInput(entry.weight, "weight"));
    tr.appendChild(makeCellInput(entry.rpe, "rpe"));
    tr.appendChild(makeCellInput(entry.notes, "notes"));

    const tdAction = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.className = "btn-tertiary";
    btn.style.padding = "0.1rem 0.4rem";
    btn.addEventListener("click", () => {
      entries.splice(index, 1);
      saveLog();
      renderLog();
    });
    tdAction.appendChild(btn);
    tr.appendChild(tdAction);

    logBodyEl.appendChild(tr);
  });

  renderLogSummary();
}

function renderLogSummary() {
  const entries = getLogEntries(currentLogDate);
  let totalSets = 0;
  const exercises = entries.length;
  entries.forEach((e) => {
    totalSets += Number(e.sets || 0) || 0;
  });
  logSummaryTextEl.textContent = `${exercises} exercises · ${totalSets} sets`;
}

function addLogEntry() {
  const entries = getLogEntries(currentLogDate);
  entries.push({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    rpe: "",
    notes: ""
  });
  saveLog();
  renderLog();
}

function clearLogForDay() {
  if (!confirm("Clear all entries for this day?")) return;
  logByDate[currentLogDate] = [];
  saveLog();
  renderLog();
}

// WEEKLY PLAN

function loadWeeklyPlan() {
  weeklyPlan = loadJSON(KEY_WEEKLY_PLAN, {
    Mon: "Push",
    Tue: "Pull",
    Wed: "Legs",
    Thu: "Run",
    Fri: "Strength",
    Sat: "XC / Long",
    Sun: "Rest"
  });
}

function saveWeeklyPlan() {
  saveJSON(KEY_WEEKLY_PLAN, weeklyPlan);
}

function renderWeeklyPlan() {
  weekGridEl.innerHTML = "";
  WEEK_DAYS.forEach((day) => {
    const card = document.createElement("div");
    card.className = "week-day-card";

    const nameEl = document.createElement("div");
    nameEl.className = "week-day-name";
    nameEl.textContent = day;

    const label = document.createElement("div");
    label.className = "week-focus-label";
    label.textContent = "Focus";

    const input = document.createElement("input");
    input.type = "text";
    input.value = weeklyPlan[day] || "";
    input.addEventListener("input", () => {
      weeklyPlan[day] = input.value;
      saveWeeklyPlan();
    });

    card.appendChild(nameEl);
    card.appendChild(label);
    card.appendChild(input);
    weekGridEl.appendChild(card);
  });
}

// SCRIPTURE

function renderScripture() {
  const item = SCRIPTURES[currentScriptureIndex];
  scriptureRefEl.textContent = item.ref;
  scriptureTextEl.textContent = item.text;
}

// REFLECTION

function loadReflections() {
  reflectionByDate = loadJSON(KEY_REFLECTION, {});
}

function saveReflectionFor(dateISO, text) {
  reflectionByDate[dateISO] = text;
  saveJSON(KEY_REFLECTION, reflectionByDate);
}

function renderReflection() {
  const text = reflectionByDate[todayISO()] || "";
  reflectionTextarea.value = text;
  reflectionStatusEl.textContent = text ? "Saved" : "Not saved yet";
}

// NAVIGATION

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  window.scrollTo({
    top: window.scrollY + rect.top - 16,
    behavior: "smooth"
  });
}

// INIT

document.addEventListener("DOMContentLoaded", () => {
  // Theme first (so gate colors are right)
  initTheme();

  // Gate & sidebar
  initGate();
  updateSidebarDate();

  // Set log current date
  currentLogDate = todayISO();
  logDateInput.value = currentLogDate;

  // Load state
  loadTodayOverview();
  loadSystems();
  loadSystemsState();
  loadLog();
  loadWeeklyPlan();
  loadReflections();

  // Render sections
  renderTodayOverview();
  setRandomDirection();
  renderSystems();
  renderLog();
  renderWeeklyPlan();
  renderScripture();
  renderReflection();

  // Events: Today overview
  todaySaveBtn.addEventListener("click", () => {
    saveTodayOverview();
  });

  // Systems edit
  systemsSaveBtn.addEventListener("click", () => {
    const lines = systemsEditTextarea.value
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    systemsItems = lines;
    saveSystemsItems();
    systemsState = {};
    saveSystemsState();
    renderSystems();
  });

  // Log
  logTodayBtn.addEventListener("click", () => {
    currentLogDate = todayISO();
    logDateInput.value = currentLogDate;
    renderLog();
  });

  logDateInput.addEventListener("change", () => {
    currentLogDate = logDateInput.value || todayISO();
    renderLog();
  });

  logAddBtn.addEventListener("click", () => {
    addLogEntry();
  });

  logClearBtn.addEventListener("click", () => {
    clearLogForDay();
  });

  // Scripture
  scriptureNextBtn.addEventListener("click", () => {
    currentScriptureIndex = (currentScriptureIndex + 1) % SCRIPTURES.length;
    renderScripture();
  });

  // Reflection
  reflectionSaveBtn.addEventListener("click", () => {
    saveReflectionFor(todayISO(), reflectionTextarea.value);
    reflectionStatusEl.textContent = "Saved";
  });

  reflectionClearBtn.addEventListener("click", () => {
    if (!confirm("Clear today’s reflection?")) return;
    reflectionTextarea.value = "";
    saveReflectionFor(todayISO(), "");
    reflectionStatusEl.textContent = "Not saved yet";
  });

  // Nav buttons
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) scrollToSection(target);
    });
  });
});
