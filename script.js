/* ============================================
   COMMAND CENTER DASHBOARD - SCRIPT.JS
   Vanilla JavaScript - No frameworks
   ============================================ */

// ============================================
// STATE & DATA STRUCTURE
// ============================================

const appState = {
  currentPage: 'at-glance',
  raceMode: false,
  weather: {
    temp: 72,
    feelsLike: 70,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 65,
    windSpeed: 8,
    uvIndex: 5,
  },
  hourlyWeather: [], // Will be populated with 24-hour forecast
  today: new Date(),
};

// ============================================
// THEME CONFIGURATION
// ============================================

const themes = {
  'midnight-galaxy': {
    name: 'Midnight Galaxy',
    '--bg-primary': '#0d1117',
    '--bg-secondary': '#161b22',
    '--bg-tertiary': '#21262d',
    '--text-primary': '#e6edf3',
    '--text-secondary': '#8b949e',
    '--text-muted': '#6e7681',
    '--color-accent-1': '#58a6ff',
    '--color-accent-2': '#1f6feb',
    '--color-accent-3': '#3fb950',
    '--color-accent-4': '#f85149',
    '--color-accent-5': '#a371f7',
    '--color-accent-6': '#79c0ff',
    '--border-color': '#30363d',
  },
  'sunset-boulevard': {
    name: 'Sunset Boulevard',
    '--bg-primary': '#1a0f0a',
    '--bg-secondary': '#2d1810',
    '--bg-tertiary': '#3d2416',
    '--text-primary': '#fdf6f0',
    '--text-secondary': '#d4a574',
    '--text-muted': '#a0826d',
    '--color-accent-1': '#ff9d5c',
    '--color-accent-2': '#ff6b35',
    '--color-accent-3': '#f7931e',
    '--color-accent-4': '#e63946',
    '--color-accent-5': '#d62828',
    '--color-accent-6': '#ffb703',
    '--border-color': '#5a3a2a',
  },
  'forest-canopy': {
    name: 'Forest Canopy',
    '--bg-primary': '#0d2818',
    '--bg-secondary': '#162d1e',
    '--bg-tertiary': '#1f3a27',
    '--text-primary': '#e8f1e8',
    '--text-secondary': '#7fa879',
    '--text-muted': '#5a7d61',
    '--color-accent-1': '#52b788',
    '--color-accent-2': '#2d6a4f',
    '--color-accent-3': '#40916c',
    '--color-accent-4': '#d62828',
    '--color-accent-5': '#9d4edd',
    '--color-accent-6': '#74c69d',
    '--border-color': '#2d5a3d',
  },
  'tech-neon': {
    name: 'Tech Neon',
    '--bg-primary': '#0a0e27',
    '--bg-secondary': '#16213e',
    '--bg-tertiary': '#1a2847',
    '--text-primary': '#e0e0e0',
    '--text-secondary': '#a0a0a0',
    '--text-muted': '#707070',
    '--color-accent-1': '#00d9ff',
    '--color-accent-2': '#0099ff',
    '--color-accent-3': '#39ff14',
    '--color-accent-4': '#ff006e',
    '--color-accent-5': '#b300ff',
    '--color-accent-6': '#00ffff',
    '--border-color': '#2a3f5f',
  },
  'desert-rose': {
    name: 'Desert Rose',
    '--bg-primary': '#2a1f1f',
    '--bg-secondary': '#3d2e2e',
    '--bg-tertiary': '#4a3838',
    '--text-primary': '#f5e6e8',
    '--text-secondary': '#c99fa0',
    '--text-muted': '#a87171',
    '--color-accent-1': '#c9846e',
    '--color-accent-2': '#d4845c',
    '--color-accent-3': '#e8ab6f',
    '--color-accent-4': '#b4646a',
    '--color-accent-5': '#a86b6b',
    '--color-accent-6': '#d9a39a',
    '--border-color': '#5a4444',
  },
  'arctic-frost': {
    name: 'Arctic Frost',
    '--bg-primary': '#0f1f2e',
    '--bg-secondary': '#1a3a4a',
    '--bg-tertiary': '#2a4a5a',
    '--text-primary': '#e8f4f8',
    '--text-secondary': '#7db4cc',
    '--text-muted': '#5a8fa8',
    '--color-accent-1': '#4db8e8',
    '--color-accent-2': '#2894c7',
    '--color-accent-3': '#66d9ff',
    '--color-accent-4': '#ff6b9d',
    '--color-accent-5': '#b4a7ff',
    '--color-accent-6': '#a0e7ff',
    '--border-color': '#3a5a7a',
  }
};

// Training data by date (YYYY-MM-DD)
const trainingData = {
  '2026-04-17': {
    type: 'easy',
    distance: 6,
    description: '6 mi easy on rolling hills',
    terrain: 'Trail',
    route: 'Golf Course Loop',
    cues: ['Relax shoulders', 'Quick feet', 'Push the uphills']
  },
  '2026-04-18': {
    type: 'long-run',
    distance: 14,
    description: '14 mi long run - steady effort',
    terrain: 'Road',
    route: 'City Loop + Park Trail',
    cues: ['Consistent pace', 'Fuel at mile 8', 'Strong finish']
  },
  '2026-04-19': {
    type: 'tempo',
    distance: 8,
    description: '3 x 1 mile @ tempo with 2 min jog',
    terrain: 'Track',
    route: 'University Track',
    cues: ['Find your rhythm', 'Control the effort', 'Relax']
  }
};

// Weekly mileage data (hardcoded demo)
const weeklyData = [
  { week: '4/7', miles: 38.5, daysRun: 6, longestRun: 12.4 },
  { week: '4/14', miles: 40.2, daysRun: 6, longestRun: 13.0 },
  { week: '4/21', miles: 42.5, daysRun: 6, longestRun: 13.2 },
];

// Recent runs for chart (last 7 runs)
const recentRuns = [
  { date: '4/12', distance: 6.2, pace: 7.3 },
  { date: '4/13', distance: 3.0, pace: 6.8 },
  { date: '4/14', distance: 8.0, pace: 6.5 },
  { date: '4/15', distance: 7.0, pace: 7.1 },
  { date: '4/16', distance: 6.5, pace: 7.4 },
  { date: '4/17', distance: 6.0, pace: 7.3 },
  { date: '4/18', distance: 14.0, pace: 7.5 },
];

// Shoe mileage
const shoeData = [
  { name: 'Nike Vaporfly', miles: 187 },
  { name: 'Brooks Glycerin', miles: 234 },
  { name: 'ASICS Gel Kayano', miles: 156 },
  { name: 'New Balance Fuel Cell', miles: 98 },
];

// ============================================
// TIME & GREETING LOGIC
// ============================================

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Update header clock
  document.getElementById('clock-display').textContent = `${hours}:${minutes}`;
  
  // Update large clock
  const displayHours = now.getHours() % 12 || 12;
  const displayMinutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  
  document.getElementById('large-time').textContent = `${displayHours}:${displayMinutes}`;
  document.getElementById('large-ampm').textContent = ampm;
}

function updateDate() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const dateNum = now.getDate();
  const year = now.getFullYear();
  
  const dateStr = `${dayName} · ${monthName} ${dateNum}, ${year}`;
  document.getElementById('date-display').textContent = dateStr;
  document.getElementById('large-date-display').textContent = dateStr;
}

function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  
  let greetingText = '';
  
  // Special logic: 6:00 AM to 6:59 AM = "Good morning"
  if (hours >= 6 && hours < 7) {
    greetingText = `Good morning, it's ${String(hours).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  } else if (hours >= 7 && hours < 12) {
    greetingText = 'Good morning';
  } else if (hours >= 12 && hours < 17) {
    greetingText = 'Good afternoon';
  } else {
    greetingText = 'Good evening';
  }
  
  document.getElementById('greeting-text').textContent = greetingText;
  document.getElementById('large-greeting').textContent = greetingText + '!';
}

// ============================================
// WEATHER LOGIC
// ============================================

/**
 * Generate 24-hour weather forecast
 * In a real app, this would come from a weather API
 */
function generateHourlyWeather() {
  const now = new Date();
  const currentHour = now.getHours();
  const hourlyData = [];
  
  // Demo hourly temps throughout the day (realistic curve)
  const hourlyTemps = [
    62, 61, 60, 59, 60, 62, 65, 68, 71, 72, 73, 74, 75, 76, 77, 76, 75, 73, 70, 68, 67, 65, 64, 63
  ];
  
  const conditions = ['Clear', 'Clear', 'Clear', 'Cloudy', 'Cloudy', 'Cloudy', 'Partly Cloudy', 'Partly Cloudy', 'Sunny', 'Sunny', 'Sunny', 'Sunny', 'Sunny', 'Sunny', 'Partly Cloudy', 'Partly Cloudy', 'Partly Cloudy', 'Cloudy', 'Cloudy', 'Clear', 'Clear', 'Clear', 'Clear', 'Clear'];
  
  const icons = {
    'Clear': '🌙',
    'Cloudy': '☁️',
    'Partly Cloudy': '⛅',
    'Sunny': '☀️',
    'Rainy': '🌧️'
  };
  
  for (let i = 0; i < 24; i++) {
    const hour = (currentHour + i) % 24;
    const displayHour = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
    
    hourlyData.push({
      hour: hour,
      displayHour: displayHour,
      temp: hourlyTemps[hour],
      condition: conditions[hour],
      icon: icons[conditions[hour]],
    });
  }
  
  appState.hourlyWeather = hourlyData;
  return hourlyData;
}

/**
 * Load weather from API (stub)
 * Replace with real API call (OpenWeatherMap, etc.)
 */
function loadWeather() {
  // STUB: Replace with real API call
  // Example: OpenWeatherMap API
  // const apiKey = 'YOUR_API_KEY';
  // const lat = 34.8526, lon = -82.3959; // Greenville, SC
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
  // For now, use demo data
  appState.weather = {
    temp: 72,
    feelsLike: 70,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 65,
    windSpeed: 8,
    uvIndex: 5,
  };
  
  generateHourlyWeather();
  updateWeatherDisplay();
}

function updateWeatherDisplay() {
  const w = appState.weather;
  
  // At a Glance card
  document.getElementById('temp-display').textContent = `${w.temp}°`;
  document.getElementById('condition-display').textContent = w.condition;
  document.getElementById('feels-display').textContent = `${w.feelsLike}°`;
  document.getElementById('outfit-text').textContent = getOutfitSuggestion(w.temp, w.condition);
  
  // Weather page
  document.getElementById('weather-icon').textContent = w.icon;
  document.getElementById('main-temp').textContent = `${w.temp}°F`;
  document.getElementById('main-condition').textContent = w.condition;
  document.getElementById('feels-temp').textContent = `${w.feelsLike}°F`;
  document.getElementById('humidity-value').textContent = `${w.humidity}%`;
  document.getElementById('wind-value').textContent = `${w.windSpeed} mph`;
  document.getElementById('uv-value').textContent = `${w.uvIndex} ${w.uvIndex >= 6 ? '(High)' : '(Moderate)'}`;
  
  updateOutfitCard(w.temp, w.condition);
  updateHourlyForecastChart();
}

function updateHourlyForecastChart() {
  // Update the 4-hour quick forecast
  const forecastRow = document.querySelector('.forecast-row');
  if (forecastRow && appState.hourlyWeather.length > 0) {
    const nextFours = appState.hourlyWeather.slice(0, 4);
    forecastRow.innerHTML = nextFours.map(h => `
      <div class="forecast-item">
        <span class="forecast-time">${h.displayHour}</span>
        <span class="forecast-icon">${h.icon}</span>
        <span class="forecast-temp">${h.temp}°</span>
      </div>
    `).join('');
  }
}

function getOutfitSuggestion(temp, condition) {
  if (temp < 45) {
    return 'Hoodie + long pants, maybe gloves';
  } else if (temp >= 45 && temp < 65) {
    return 'T-shirt + light jacket, shorts or joggers';
  } else {
    return 'Light t-shirt + shorts, maybe hat/sunglasses';
  }
}

function updateOutfitCard(temp, condition) {
  let top, bottom, accessories;
  
  if (temp < 45) {
    top = { icon: '🧥', text: 'Hoodie or sweater' };
    bottom = { icon: '👖', text: 'Long pants' };
    accessories = { icon: '🧤', text: 'Gloves + hat' };
  } else if (temp >= 45 && temp < 65) {
    top = { icon: '👕', text: 'T-shirt + light jacket' };
    bottom = { icon: '👖', text: 'Joggers or shorts' };
    accessories = { icon: '🧣', text: 'Light scarf' };
  } else {
    top = { icon: '👕', text: 'Light t-shirt' };
    bottom = { icon: '🩳', text: 'Shorts' };
    accessories = { icon: '🕶️', text: 'Sunglasses + hat' };
  }
  
  document.getElementById('outfit-top').textContent = top.icon;
  document.getElementById('outfit-top-text').textContent = top.text;
  document.getElementById('outfit-bottom').textContent = bottom.icon;
  document.getElementById('outfit-bottom-text').textContent = bottom.text;
  document.getElementById('outfit-accessories').textContent = accessories.icon;
  document.getElementById('outfit-accessories-text').textContent = accessories.text;
  
  document.getElementById('outfit-description').textContent = 
    `Based on ${appState.weather.temp}°F and ${condition}:`;
}

// ============================================
// NEWS & MARKETS LOGIC
// ============================================

/**
 * Load news from API (stub)
 * Replace with real API (NewsAPI, etc.)
 */
function loadNews() {
  // STUB: Replace with real API
  // Example: NewsAPI
  // const apiKey = 'YOUR_API_KEY';
  // const url = `https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt&apiKey=${apiKey}`;
  
  // Demo data with clickable links
  const demoNews = [
    {
      source: { name: 'Reuters' },
      headline: 'Global markets rally on economic data',
      description: 'Stock indices rise as central banks signal stable policy stance.',
      url: 'https://reuters.com',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      source: { name: 'AP' },
      headline: 'Tech sector sees strong quarterly earnings',
      description: 'Major tech firms beat revenue expectations amid AI investment boom.',
      url: 'https://apnews.com',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      source: { name: 'Bloomberg' },
      headline: 'Renewable energy adoption reaches new milestone',
      description: 'Global renewable capacity surpasses 5 terawatts for the first time.',
      url: 'https://bloomberg.com',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    {
      source: { name: 'CNBC' },
      headline: 'Fed holds rates steady in latest decision',
      description: 'Federal Reserve maintains interest rates, inflation trending downward.',
      url: 'https://cnbc.com',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  const demoTechNews = [
    {
      source: { name: 'The Verge' },
      headline: 'New AI model shows promise in medical diagnosis',
      description: 'Research breakthrough demonstrates AI accuracy in detecting rare diseases.',
      url: 'https://theverge.com',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      source: { name: 'VentureBeat' },
      headline: 'Startup funding continues strong in Q2',
      description: 'AI and climate tech startups attract over $15B in venture capital.',
      url: 'https://venturebeat.com',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      source: { name: 'Hacker News' },
      headline: 'New programming language gains traction',
      description: 'Developer community adopts innovative language for systems programming.',
      url: 'https://news.ycombinator.com',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
    },
    {
      source: { name: 'MIT Tech Review' },
      headline: 'Quantum computing reaches new computational milestone',
      description: 'Researchers demonstrate quantum advantage in optimization problems.',
      url: 'https://technologyreview.com',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  updateNewsDisplay(demoNews, '#top-news-container');
  updateNewsDisplay(demoTechNews, '#tech-news-container');
}

function updateNewsDisplay(articles, containerId) {
  const container = document.querySelector(containerId);
  if (!container) return;
  
  container.innerHTML = articles.map(article => `
    <a href="${article.url}" target="_blank" class="news-card news-link">
      <span class="news-source">${article.source.name}</span>
      <h3 class="news-headline">${article.headline}</h3>
      <span class="news-time">${getTimeAgo(article.publishedAt)}</span>
      <p class="news-summary">${article.description || 'No summary available'}</p>
    </a>
  `).join('');
}

function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * Load markets data from API (stub)
 * Replace with real API (Alpha Vantage, Polygon, etc.)
 */
function loadMarkets() {
  // STUB: Replace with real API
  // Example: Alpha Vantage
  // const apiKey = 'YOUR_API_KEY';
  // const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOGL&apikey=${apiKey}`;
  
  // Demo data is already in HTML
  console.log('Markets loaded (demo data)');
}

// ============================================
// TRAINING & XC PAGE LOGIC
// ============================================

function loadTodayTraining() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const training = trainingData[today] || {
    type: 'easy',
    distance: 5,
    description: 'Rest day or light recovery run',
    terrain: 'Road',
    route: 'Local loop',
    cues: ['Enjoy the run', 'Keep it easy', 'Stay consistent']
  };
  
  const typeClass = training.type === 'easy' ? 'easy-badge' : 
                    training.type === 'tempo' ? 'tempo-badge' :
                    training.type === 'intervals' ? 'interval-badge' : 'long-run-badge';
  
  document.getElementById('training-content').innerHTML = `
    <div class="training-type ${typeClass}">${training.type}</div>
    <p class="workout-desc">${training.distance} mi ${training.type} - ${training.description}</p>
    <p class="workout-terrain">
      <strong>Terrain:</strong> <span id="terrain">${training.terrain}</span> · 
      <strong>Route:</strong> <span id="route">${training.route}</span>
    </p>
    <div class="focus-cues">
      <h4>Focus Cues</h4>
      <ul>
        <li>${training.cues[0]}</li>
        <li>${training.cues[1]}</li>
        <li>${training.cues[2]}</li>
      </ul>
    </div>
  `;
}

function initRaceMode() {
  const btn = document.getElementById('race-mode-btn');
  const content = document.getElementById('race-content');
  
  btn.addEventListener('click', () => {
    appState.raceMode = !appState.raceMode;
    content.classList.toggle('hidden');
    btn.textContent = appState.raceMode ? 'Deactivate Race Mode' : 'Activate Race Mode';
    btn.classList.toggle('active');
    
    // Save race mode state
    localStorage.setItem('raceMode', appState.raceMode);
    
    // Save race data
    if (appState.raceMode) {
      saveRaceData();
    }
  });
  
  // Load race data from localStorage
  const savedRaceMode = localStorage.getItem('raceMode') === 'true';
  if (savedRaceMode) {
    appState.raceMode = true;
    content.classList.remove('hidden');
    btn.textContent = 'Deactivate Race Mode';
    btn.classList.add('active');
    loadRaceData();
  }
}

function saveRaceData() {
  const raceData = {
    name: document.getElementById('race-name').value,
    distance: document.getElementById('race-distance').value,
    target: document.getElementById('race-target').value,
    script: document.getElementById('race-script-text').value,
  };
  localStorage.setItem('raceData', JSON.stringify(raceData));
}

function loadRaceData() {
  const saved = localStorage.getItem('raceData');
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById('race-name').value = data.name || '';
    document.getElementById('race-distance').value = data.distance || '';
    document.getElementById('race-target').value = data.target || '';
    document.getElementById('race-script-text').value = data.script || '';
  }
}

function initPriorities() {
  const btn = document.getElementById('save-priorities-btn');
  
  btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.priority-input');
    const priorities = Array.from(inputs).map(input => input.value);
    localStorage.setItem('priorities', JSON.stringify(priorities));
    
    // Visual feedback
    btn.textContent = 'Saved!';
    setTimeout(() => {
      btn.textContent = 'Save Priorities';
    }, 2000);
  });
  
  // Load priorities from localStorage
  const saved = localStorage.getItem('priorities');
  if (saved) {
    const priorities = JSON.parse(saved);
    const inputs = document.querySelectorAll('.priority-input');
    priorities.forEach((p, i) => {
      if (inputs[i]) inputs[i].value = p;
    });
  }
}

// ============================================
// CHART INITIALIZATION
// ============================================

let sparklineChart = null;
let runsChart = null;
let shoesChart = null;
let hourlyWeatherChart = null;

function initCharts() {
  initSparklineChart();
  initRunsChart();
  initShoesChart();
  initHourlyWeatherChart();
}

function initSparklineChart() {
  const ctx = document.getElementById('sparkline-chart');
  if (!ctx) return;
  
  // Demo data: macro trend (e.g., S&P 500 over time)
  const data = [5780, 5812, 5845, 5820, 5892, 5856, 5923];
  
  sparklineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [{
        label: 'S&P 500',
        data: data,
        borderColor: '#58a6ff',
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { display: false },
        x: { display: false }
      }
    }
  });
}

function initRunsChart() {
  const ctx = document.getElementById('runs-chart');
  if (!ctx) return;
  
  runsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: recentRuns.map(r => r.date),
      datasets: [
        {
          label: 'Distance (mi)',
          data: recentRuns.map(r => r.distance),
          backgroundColor: '#58a6ff',
          borderColor: '#1f6feb',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Avg Pace (min/mi)',
          data: recentRuns.map(r => r.pace),
          borderColor: '#a371f7',
          type: 'line',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#a371f7',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#8b949e',
            font: { size: 12 }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#30363d' },
          ticks: { color: '#8b949e', font: { size: 11 } }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#8b949e', font: { size: 11 } }
        }
      }
    }
  });
}

function initShoesChart() {
  const ctx = document.getElementById('shoes-chart');
  if (!ctx) return;
  
  shoesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: shoeData.map(s => s.name),
      datasets: [{
        label: 'Miles',
        data: shoeData.map(s => s.miles),
        backgroundColor: ['#58a6ff', '#3fb950', '#a371f7', '#79c0ff'],
        borderColor: '#1f6feb',
        borderWidth: 1,
        borderRadius: 4,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: '#30363d' },
          ticks: { color: '#8b949e', font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8b949e', font: { size: 11 } }
        }
      }
    }
  });
}

function initHourlyWeatherChart() {
  const ctx = document.getElementById('hourly-weather-chart');
  if (!ctx || !appState.hourlyWeather || appState.hourlyWeather.length === 0) return;
  
  const hourlyData = appState.hourlyWeather;
  
  hourlyWeatherChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hourlyData.map(h => h.displayHour),
      datasets: [{
        label: 'Temperature (°F)',
        data: hourlyData.map(h => h.temp),
        borderColor: '#ff9d5c',
        backgroundColor: 'rgba(255, 157, 92, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#ff9d5c',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#8b949e',
            font: { size: 12 }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 55,
          max: 85,
          grid: { color: '#30363d' },
          ticks: { color: '#8b949e', font: { size: 11 } }
        },
        x: {
          grid: { color: '#30363d', drawBorder: false },
          ticks: { color: '#8b949e', font: { size: 10 }, maxRotation: 45, minRotation: 0 }
        }
      }
    }
  });
}

// ============================================
// NAVIGATION & PAGE ROUTING
// ============================================

function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const page = e.target.dataset.page;
      navigateToPage(page);
    });
  });
}

function navigateToPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  document.getElementById(pageId).classList.add('active');
  
  // Update nav button states
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.page === pageId) {
      btn.classList.add('active');
    }
  });
  
  appState.currentPage = pageId;
  
  // Reinitialize charts on relevant pages
  if (pageId === 'xc-training' || pageId === 'weather') {
    setTimeout(() => {
      initCharts();
    }, 100);
  }
}

// ============================================
// THEME SWITCHER
// ============================================

function initThemeSwitcher() {
  // Create theme switcher in header
  const headerLeft = document.querySelector('.header-left');
  const themeSwitcher = document.createElement('div');
  themeSwitcher.className = 'theme-switcher';
  themeSwitcher.innerHTML = `
    <button id="theme-toggle-btn" class="theme-toggle-btn" title="Toggle theme menu">🎨</button>
    <div id="theme-menu" class="theme-menu hidden">
      ${Object.entries(themes).map(([key, theme]) => `
        <button class="theme-option" data-theme="${key}" title="${theme.name}">
          ${theme.name}
        </button>
      `).join('')}
    </div>
  `;
  headerLeft.appendChild(themeSwitcher);
  
  // Load saved theme or default
  const savedTheme = localStorage.getItem('selectedTheme') || 'midnight-galaxy';
  applyTheme(savedTheme);
  
  // Theme toggle button
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeMenu = document.getElementById('theme-menu');
  
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('hidden');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.theme-switcher')) {
      themeMenu.classList.add('hidden');
    }
  });
  
  // Theme option buttons
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const themeKey = e.target.dataset.theme;
      applyTheme(themeKey);
      localStorage.setItem('selectedTheme', themeKey);
      themeMenu.classList.add('hidden');
    });
  });
}

function applyTheme(themeKey) {
  const theme = themes[themeKey];
  if (!theme) return;
  
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    if (key !== 'name') {
      root.style.setProperty(key, value);
    }
  });
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
  // Update time immediately and every second
  updateTime();
  updateDate();
  updateGreeting();
  
  setInterval(() => {
    updateTime();
    updateGreeting();
  }, 1000);
  
  // Update date (less frequently)
  setInterval(updateDate, 60000);
  
  // Load initial data
  loadWeather();
  loadNews();
  loadMarkets();
  loadTodayTraining();
  
  // Auto-refresh news and markets every 5 minutes
  setInterval(() => {
    loadNews();
    loadMarkets();
  }, 5 * 60 * 1000);
  
  // Initialize features
  initNavigation();
  initPriorities();
  initRaceMode();
  initCharts();
  initThemeSwitcher();
  
  console.log('Command Center initialized');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
