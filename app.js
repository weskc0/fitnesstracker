const form = document.getElementById("workout-form");
const dateInput = document.getElementById("workout-date");
const typeInput = document.getElementById("workout-type");
const notesInput = document.getElementById("workout-notes");
const listEl = document.getElementById("workout-list");
const emptyEl = document.getElementById("history-empty");

const statWeekEl = document.getElementById("stat-week");
const statStreakEl = document.getElementById("stat-streak");
const statTotalEl = document.getElementById("stat-total");

const STORAGE_KEY = "training_log_workouts_v1";

let workouts = [];

// Helpers
function todayISO() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadWorkouts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      workouts = [];
      return;
    }
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      workouts = data;
    } else {
      workouts = [];
    }
  } catch {
    workouts = [];
  }
}

function saveWorkouts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

function render() {
  // Sort by date descending, then id
  workouts.sort((a, b) => {
    if (a.date === b.date) return b.id - a.id;
    return a.date < b.date ? 1 : -1;
  });

  listEl.innerHTML = "";
  if (workouts.length === 0) {
    emptyEl.style.display = "block";
  } else {
    emptyEl.style.display = "none";
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
      deleteWorkout(w.id);
    });

    actions.appendChild(delBtn);

    li.appendChild(main);
    li.appendChild(actions);
    listEl.appendChild(li);
  }

  updateStats();
}

function friendlyDate(iso) {
  const [year, month, day] = iso.split("-");
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(d.getTime())) return iso;

  const opts = { month: "short", day: "numeric", year: "numeric" };
  return d.toLocaleDateString(undefined, opts);
}

function deleteWorkout(id) {
  workouts = workouts.filter((w) => w.id !== id);
  saveWorkouts();
  render();
}

function updateStats() {
  const total = workouts.length;
  statTotalEl.textContent = total;

  if (total === 0) {
    statWeekEl.textContent = 0;
    statStreakEl.textContent = 0;
    return;
  }

  const today = new Date();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Last 7 days count
  let weekCount = 0;
  const sevenDaysAgo = new Date(todayMid);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // inclusive of today

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

  // Streak: count backwards from today while each day has a workout
  let streak = 0;
  let cursor = new Date(todayMid);
  while (datesWithWorkouts.has(cursor.getTime())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  statStreakEl.textContent = streak;
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

// Init
document.addEventListener("DOMContentLoaded", () => {
  dateInput.value = todayISO();
  loadWorkouts();
  render();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = dateInput.value || todayISO();
  const type = typeInput.value.trim();
  const notes = notesInput.value.trim();

  if (!type) {
    typeInput.focus();
    return;
  }

  const workout = {
    id: Date.now(),
    date,
    type,
    notes
  };

  workouts.push(workout);
  saveWorkouts();
  render();

  typeInput.value = "";
  notesInput.value = "";
});
