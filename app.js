// DOM references
const heroGreetingEl = document.getElementById("hero-greeting");
const heroDateEl = document.getElementById("hero-date");
const heroTimeEl = document.getElementById("hero-time");
const heroFocusTextEl = document.getElementById("hero-focus-text");

const plannerDateInput = document.getElementById("planner-date");
const plannerTodayBtn = document.getElementById("planner-today-btn");

const statTasksEl = document.getElementById("stat-tasks");
const statWeekEl = document.getElementById("stat-week");
const statStreakEl = document.getElementById("stat-streak");

const focusInput = document.getElementById("focus-input");
const focusSaveBtn = document.getElementById("focus-save-btn");

const taskInput = document.getElementById("task-input");
const taskAddBtn = document.getElementById("task-add-btn");
const taskListEl = document.getElementById("task-list");
const tasksMetaEl = document.getElementById("tasks-meta");

const scheduleGridEl = document.getElementById("schedule-grid");

const workoutForm = document.getElementById("workout-form");
const workoutDateInput = document.getElementById("workout-date");
const workoutTypeInput = document.getElementById("workout-type");
const workoutNotesInput = document.getElementById("workout-notes");
const workoutListEl = document.getElementById("workout-list");
const historyEmptyEl = document.getElementById("history-empty");

const notesArea = document.getElementById("notes-area");
const notesStatusEl = document.getElementById("notes-status");

// Storage keys
const STORAGE_KEY_TASKS = "assistant_tasks_v1";
const STORAGE_KEY_SCHEDULE = "assistant_schedule_v1";
const STORAGE_KEY_NOTES = "assistant_notes_v1";
const STORAGE_KEY_FOCUS = "assistant_focus_v1";
const STORAGE_KEY_WORKOUTS = "assistant_workouts_v1";

// State
let plannerDate = todayISO(); // which day you’re planning
let tasksByDate = {};
let scheduleByDate = {};
let notesByDate = {};
let focusByDate = {};
let workouts = [];

// Helpers
function todayISO() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function friendlyDate(iso) {
  const [year, month, day] = iso.split("-");
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(d.getTime())) return iso;
  const opts = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
  return d.toLocaleDateString(undefined, opts);
}

function isoToMidnight(iso) {
  const parts = iso.split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]);
  const m = Number(parts[1]) - 1;
  const d = Number(parts[2]);
  const date = new Date(y, m, d);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Load / save
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// HERO
function updateHeroTime() {
  const now = new Date();

  const dateOpts = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
  heroDateEl.textContent = now.toLocaleDateString(undefined, dateOpts);

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  heroTimeEl.textContent = `${hour12}:${minutes} ${ampm}`;

  // Greeting
  let greeting = "Good evening";
  if (hours < 12) greeting = "Good morning";
  else if (hours < 18) greeting = "Good afternoon";
  heroGreetingEl.textContent = `${greeting}, Champion`;
}

// Focus
function loadFocus() {
  focusByDate = loadFromStorage(STORAGE_KEY_FOCUS, {});
}

function saveFocus() {
  focusByDate[plannerDate] = focusInput.value.trim();
  saveToStorage(STORAGE_KEY_FOCUS, focusByDate);
  heroFocusTextEl.textContent = focusByDate[plannerDate] || "Train hard. Build your future.";
}

function renderFocus() {
  const focus = focusByDate[plannerDate] || "";
  focusInput.value = focus;
  heroFocusTextEl.textContent = focus || "Train hard. Build your future.";
}

// Tasks
function loadTasks() {
  tasksByDate = loadFromStorage(STORAGE_KEY_TASKS, {});
}

function getTodayTasks() {
  if (!tasksByDate[plannerDate]) tasksByDate[plannerDate] = [];
  return tasksByDate[plannerDate];
}

function saveTasks() {
  saveToStorage(STORAGE_KEY_TASKS, tasksByDate);
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const tasks = getTodayTasks();
  tasks.push({ id: Date.now(), text: trimmed, done: false });
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  const tasks = getTodayTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx !== -1) {
    tasks.splice(idx, 1);
    saveTasks();
    renderTasks();
  }
}

function toggleTask(id, done) {
  const tasks = getTodayTasks();
  const t = tasks.find((x) => x.id === id);
  if (t) {
    t.done = done;
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  const tasks = getTodayTasks();
  taskListEl.innerHTML = "";
  let doneCount = 0;
  for (const t of tasks) {
    if (t.done) doneCount++;

    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = t.done;
    checkbox.addEventListener("change", () => toggleTask(t.id, checkbox.checked));

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = t.text;
    if (t.done) textSpan.classList.add("completed");

    const delBtn = document.createElement("button");
    delBtn.className = "task-delete-btn";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => deleteTask(t.id));

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    taskListEl.appendChild(li);
  }

  tasksMetaEl.textContent = `${tasks.length - doneCount} open · ${doneCount} done`;
  statTasksEl.textContent = `${doneCount} / ${tasks.length}`;
}

// Schedule
const scheduleHours = [
  "05:00", "06:00", "07:00", "08:00", "09:00",
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00", "23:00"
];

function loadSchedule() {
  scheduleByDate = loadFromStorage(STORAGE_KEY_SCHEDULE, {});
}

function getTodaySchedule() {
  if (!scheduleByDate[plannerDate]) {
    scheduleByDate[plannerDate] = {};
  }
  return scheduleByDate[plannerDate];
}

function saveSchedule() {
  saveToStorage(STORAGE_KEY_SCHEDULE, scheduleByDate);
}

function renderSchedule() {
  scheduleGridEl.innerHTML = "";
  const schedule = getTodaySchedule();
  const now = new Date();
  const currentHour = now.getHours();

  for (const hour of scheduleHours) {
    const [hStr] = hour.split(":");
    const hourNum = Number(hStr);

    const label = document.createElement("div");
    label.className = "time-label";
    label.textContent = hour;

    const wrapper = document.createElement("div");
    wrapper.className = "time-input-wrapper";

    const input = document.createElement("input");
    input.className = "time-input";
    input.type = "text";
    input.value = schedule[hour] || "";
    if (hourNum === currentHour && plannerDate === todayISO()) {
      input.classList.add("current-hour");
    }
    input.addEventListener("input", () => {
      schedule[hour] = input.value;
      saveSchedule();
    });

    wrapper.appendChild(input);
    scheduleGridEl.appendChild(label);
    scheduleGridEl.appendChild(wrapper);
  }
}

// Notes
function loadNotes() {
  notesByDate = loadFromStorage(STORAGE_KEY_NOTES, {});
}

function renderNotes() {
  notesArea.value = notesByDate[plannerDate] || "";
  notesStatusEl.textContent = "Autosaved";
}

let notesSaveTimeout = null;
function handleNotesInput() {
  const text = notesArea.value;
  notesByDate[plannerDate] = text;
  if (notesSaveTimeout) clearTimeout(notesSaveTimeout);
  notesStatusEl.textContent = "Saving...";
  notesSaveTimeout = setTimeout(() => {
    saveToStorage(STORAGE_KEY_NOTES, notesByDate);
    notesStatusEl.textContent = "Autosaved";
  }, 500);
}

// Workouts
function loadWorkouts() {
  workouts = loadFromStorage(STORAGE_KEY_WORKOUTS, []);
}

function saveWorkouts() {
  saveToStorage(STORAGE_KEY_WORKOUTS, workouts);
}

function renderWorkouts() {
  workouts.sort((a, b) => {
    if (a.date === b.date) return b.id - a.id;
    return a.date < b.date ? 1 : -1;
  });

  workoutListEl.innerHTML = "";
  if (workouts.length === 0) {
    historyEmptyEl.style.display = "block";
  } else {
    historyEmptyEl.style.display = "none";
  }

  for (const w of workouts) {
    const li = document.createElement("li");
    li.className = "workout-item";

    const main = document.createElement("div");
    main.className = "workout-main";

    const titleRow = document.createElement("div");
    titleRow.className = "workout-title-row";

    const typeSpan = document.createElement("span");
    typeSpan.className = "workout-type";
    typeSpan.textContent = w.type || "(No title)";

    const dateSpan = document.createElement("span");
    dateSpan.className = "workout-date";
    dateSpan.textContent = friendlyDate(w.date);

    titleRow.appendChild(typeSpan);
    titleRow.appendChild(dateSpan);
    main.appendChild(titleRow);

    if (w.notes && w.notes.trim() !== "") {
      const notesP = document.createElement("div");
      notesP.className = "workout-notes";
      notesP.textContent = w.notes;
      main.appendChild(notesP);
    }

    const actions = document.createElement("div");
    actions.className = "workout-actions";

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      workouts = workouts.filter((x) => x.id !== w.id);
      saveWorkouts();
      renderWorkouts();
      updateWorkoutStats();
    });

    actions.appendChild(delBtn);

    li.appendChild(main);
    li.appendChild(actions);
    workoutListEl.appendChild(li);
  }

  updateWorkoutStats();
}

function updateWorkoutStats() {
  const total = workouts.length;
  if (total === 0) {
    statWeekEl.textContent = 0;
    statStreakEl.textContent = 0;
    return;
  }

  const today = new Date();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let weekCount = 0;
  const sevenDaysAgo = new Date(todayMid);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const datesWithWorkouts = new Set();
  for (const w of workouts) {
    const d = isoToMidnight(w.date);
    if (!d) continue;
    datesWithWorkouts.add(d.getTime());
    if (d >= sevenDaysAgo && d <= todayMid) {
      weekCount++;
    }
  }
  statWeekEl.textContent = weekCount;

  let streak = 0;
  let cursor = new Date(todayMid);
  while (datesWithWorkouts.has(cursor.getTime())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  statStreakEl.textContent = streak;
}

// Planner date switching
function setPlannerDate(newDateISO) {
  plannerDate = newDateISO;
  plannerDateInput.value = plannerDate;
  renderFocus();
  renderTasks();
  renderSchedule();
  renderNotes();
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  plannerDate = todayISO();
  plannerDateInput.value = plannerDate;
  workoutDateInput.value = todayISO();

  loadFocus();
  loadTasks();
  loadSchedule();
  loadNotes();
  loadWorkouts();

  renderFocus();
  renderTasks();
  renderSchedule();
  renderNotes();
  renderWorkouts();

  updateHeroTime();
  setInterval(updateHeroTime, 1000);
});

// Events
plannerDateInput.addEventListener("change", () => {
  const value = plannerDateInput.value || todayISO();
  setPlannerDate(value);
});

plannerTodayBtn.addEventListener("click", () => {
  setPlannerDate(todayISO());
});

focusSaveBtn.addEventListener("click", () => {
  saveFocus();
});

taskAddBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

notesArea.addEventListener("input", handleNotesInput);

workoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = workoutDateInput.value || todayISO();
  const type = workoutTypeInput.value.trim();
  const notes = workoutNotesInput.value.trim();
  if (!type) {
    workoutTypeInput.focus();
    return;
  }
  const workout = { id: Date.now(), date, type, notes };
  workouts.push(workout);
  saveWorkouts();
  renderWorkouts();
  workoutTypeInput.value = "";
  workoutNotesInput.value = "";
});
