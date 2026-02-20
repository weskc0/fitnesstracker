// Real-time clock update with claw rotation
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours   = (now.getHours() % 12) + minutes / 60;

  const sRot = seconds * 6;
  const mRot = minutes * 6;
  const hRot = hours   * 30;

  document.getElementById('secondHand').style.setProperty('--rot', `${sRot}deg`);
  document.getElementById('minuteHand').style.setProperty('--rot', `${mRot}deg`);
  document.getElementById('hourHand').style.setProperty('--rot', `${hRot}deg`);
}
setInterval(updateClock, 50);
updateClock();

// Workout / Fitness tracking
let workoutInterval = null;
let elapsed = 0;
let steps = 0;
const goal = 10000; // example daily goal

const infoEl     = document.getElementById('info');
const progressEl = document.getElementById('progressRing');

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateUI() {
  const percent = Math.min((steps / goal) * 100, 100);
  progressEl.style.setProperty('--progress', `${percent}%`);
  infoEl.textContent = `Time: ${formatTime(elapsed)} | Steps: ${steps} (${Math.round(percent)}%)`;
}

function startWorkout() {
  if (!workoutInterval) {
    workoutInterval = setInterval(() => {
      elapsed++;
      updateUI();
    }, 1000);
  }
  // Request motion permission if available (for steps)
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permission => {
        if (permission === 'granted') {
          window.addEventListener('devicemotion', handleMotion);
        }
      })
      .catch(err => console.log('Motion permission error:', err));
  } else if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', handleMotion);
  }
}

function stopWorkout() {
  clearInterval(workoutInterval);
  workoutInterval = null;
}

function resetWorkout() {
  stopWorkout();
  elapsed = 0;
  steps = 0;
  updateUI();
}

let lastY = 0;
const threshold = 2.0; // adjust sensitivity

function handleMotion(event) {
  const acc = event.accelerationIncludingGravity?.y || 0;
  const delta = Math.abs(acc - lastY);
  if (delta > threshold) {
    steps++;
    updateUI();
  }
  lastY = acc;
}

// Initial UI update
updateUI();

// Optional: Save/load progress with localStorage
window.addEventListener('load', () => {
  const savedSteps = localStorage.getItem('protoSteps');
  const savedElapsed = localStorage.getItem('protoElapsed');
  if (savedSteps) steps = parseInt(savedSteps, 10);
  if (savedElapsed) elapsed = parseInt(savedElapsed, 10);
  updateUI();
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('protoSteps', steps);
  localStorage.setItem('protoElapsed', elapsed);
});
