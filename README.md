# Command Center Dashboard

A personal "operating system" dashboard for GitHub Pages—clean, modern, minimal dark theme with live updates and athlete-centric training tracking.

## Visual Design

**Midnight Galaxy meets Tech Innovation** – A cohesive dark-mode aesthetic with deep space blacks (#0d1117), neon accent blues (#58a6ff), and strategic use of green/purple highlights. The design emphasizes clarity through subtle borders, smooth animations, and responsive grid layouts that feel like a professional control center. Cards hover and shimmer, typography is bold and readable, and every interaction provides feedback. It's sleek, not cartoonish—like the dashboard of a high-performance operating system.

## Files Included

- **index.html** – Single-page app with client-side routing for all four pages (At a Glance, News & Markets, Weather & Outfit, XC Training HQ)
- **style.css** – 800+ lines of modern dark-theme CSS with responsive design, smooth transitions, and theme variables
- **script.js** – Vanilla JavaScript (no frameworks) handling time, greeting, weather, training data, charts, and localStorage persistence

## Quick Start

### 1. Setup for GitHub Pages

1. Create a new repository on GitHub (e.g., `command-center`)
2. Clone it to your machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/command-center.git
   cd command-center
   ```
3. Copy `index.html`, `style.css`, and `script.js` into the repo root
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial commit: Command Center dashboard"
   git push origin main
   ```
5. In GitHub, go to **Settings → Pages** and set the source to `main` branch, root folder
6. Your site will be live at `https://YOUR_USERNAME.github.io/command-center/` within seconds

### 2. Local Testing

Open `index.html` directly in a browser (double-click it), or serve it locally:
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Customization Guide

### 1. **NEW: Theme Switcher** 🎨

Click the **🎨 palette icon** in the header to switch between 6 pre-built themes:
- **Midnight Galaxy** – Dark, sleek (default)
- **Sunset Boulevard** – Warm orange & red tones
- **Forest Canopy** – Natural greens
- **Tech Neon** – Bright cyan & neon colors
- **Desert Rose** – Dusty rose tones
- **Arctic Frost** – Cool icy blues

Your theme choice is saved to localStorage. Themes are applied instantly via CSS variables—all colors update across the entire dashboard.

**To create a custom theme:**

Edit `script.js` in the `themes` object (lines ~30):

```javascript
const themes = {
  'your-theme': {
    name: 'Your Theme Name',
    '--bg-primary': '#1a1a1a',
    '--text-primary': '#ffffff',
    '--color-accent-1': '#ff5555',
    // ... add all other CSS variables
  }
};
```

### 2. **News Headlines Are Now Clickable** 🔗

On the **News & Markets page**, click any headline to open the full article in a new tab. News auto-refreshes every 5 minutes.

News cards now include:
- Direct links to source articles
- Auto-updating timestamps ("3h ago", "just now")
- Responsive hover effects

**To wire up a real news API:**

Update the `loadNews()` function in `script.js` (line ~230):

```javascript
async function loadNews() {
  const apiKey = 'YOUR_NEWSAPI_KEY';
  const topNews = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt&apiKey=${apiKey}`
  ).then(r => r.json());
  
  updateNewsDisplay(topNews.articles.slice(0, 5), '#top-news-container');
}
```

The function already handles the rendering—just swap in your API data!

### 3. **NEW: 24-Hour Hourly Weather Chart** 📊

On the **Weather & Outfit page**, see a full 24-hour temperature forecast as an interactive line chart.

Features:
- Full day/night cycle with realistic temperature curve
- Hourly timestamps (12 AM → 11 PM)
- Hover over points to see exact temperature
- Color-coded line (orange gradient)

The chart auto-generates demo data from the current time forward through all 24 hours.

**To use a real weather API with hourly data:**

Update `loadWeather()` in `script.js` (line ~185):

```javascript
async function loadWeather() {
  const apiKey = 'YOUR_OPENWEATHERMAP_KEY';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=34.8526&lon=-82.3959&appid=${apiKey}&units=imperial`
  ).then(r => r.json());
  
  // Map response.list (array of 3-hour forecasts) to 24-hour format
  appState.hourlyWeather = response.list.slice(0, 8).map(item => ({
    hour: new Date(item.dt * 1000).getHours(),
    displayHour: formatHour(new Date(item.dt * 1000)),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main,
    icon: getWeatherIcon(item.weather[0].main),
  }));
  
  updateWeatherDisplay();
}
```

### 4. Auto-Refreshing News (Every 5 Minutes)

News and markets data now refresh automatically every 5 minutes. You'll see the latest headlines and market prices without reloading.

To change the refresh interval, edit `script.js` line ~730:

```javascript
// Auto-refresh news and markets every X minutes
setInterval(() => {
  loadNews();
  loadMarkets();
}, 10 * 60 * 1000);  // Change 10 to your desired minutes
```

---

## Update Quick Links

**Location:** `index.html`, line ~160

```html
<a href="https://github.com" target="_blank" class="link-btn" title="GitHub">
  <span class="link-icon">🐙</span>
  <span class="link-text">GitHub</span>
</a>
```

Replace the `href` with your actual links, update the emoji icon and text.

### 5. Add/Edit Daily Training

**Location:** `script.js`, line ~49

```javascript
const trainingData = {
  '2026-04-17': {
    type: 'easy',          // easy, tempo, intervals, long-run
    distance: 6,
    description: '6 mi easy on rolling hills',
    terrain: 'Trail',
    route: 'Golf Course Loop',
    cues: ['Relax shoulders', 'Quick feet', 'Push the uphills']
  },
  '2026-04-18': {
    // ... add more days here
  }
};
```

Add entries for each day in `YYYY-MM-DD` format. The app will display today's training automatically.

### 5. Connect Weather API

**Location:** `script.js`, line ~185 in `loadWeather()`

Currently using demo data. To use real weather:

```javascript
async function loadWeather() {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const lat = 34.8526, lon = -82.3959; // Greenville, SC coordinates
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    );
    const data = await response.json();
    
    appState.weather = {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      icon: getWeatherIcon(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      uvIndex: 5, // You'll need a separate UV API call
    };
    
    generateHourlyWeather(); // Generates demo hourly data
    updateWeatherDisplay();
  } catch (error) {
    console.error('Weather API error:', error);
    // Falls back to demo data
  }
}

function getWeatherIcon(condition) {
  const icons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Snow': '❄️',
    // ... add more
  };
  return icons[condition] || '🌤️';
}
```

Get a free API key at [openweathermap.org](https://openweathermap.org/api)

### 6. Connect Markets API

**Location:** `script.js`, line ~270 in `loadMarkets()`

Example using Alpha Vantage for stock data:

```javascript
async function loadMarkets() {
  const apiKey = 'YOUR_ALPHA_VANTAGE_KEY';
  
  try {
    const symbols = ['SPY', 'BTC', 'ETH'];
    const marketsContainer = document.querySelector('.markets-grid');
    
    for (const symbol of symbols) {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );
      const data = await response.json();
      // Update DOM with real data
    }
  } catch (error) {
    console.error('Markets API error:', error);
  }
}
```

Get a free API key at [alphavantage.co](https://www.alphavantage.co/)

### 7. Update Greeting Logic

**Location:** `script.js`, line ~151 in `updateGreeting()`

Default: "Good morning" between 6 AM – 7 AM, otherwise standard greetings. Customize as needed:

```javascript
function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  
  // Example: Custom greeting during peak hours (8 AM – 6 PM)
  if (hours >= 8 && hours < 12) {
    greetingText = 'Rise and grind! ✨';
  } else if (hours >= 12 && hours < 17) {
    greetingText = 'Afternoon focus time 💪';
  } else {
    greetingText = 'Wind down mode';
  }
  
  // ... update DOM
}
```

### 8. Customize Color Theme (Deprecated - Use Theme Switcher Instead)

**Note:** Use the **🎨 theme switcher** in the header instead of manually editing colors. However, you can still edit CSS variables in `style.css` line 1 if you want to create a custom theme:

```css
:root {
  --bg-primary: #0d1117;      /* Dark background */
  --text-primary: #e6edf3;    /* Light text */
  --color-accent-1: #58a6ff;  /* Bright blue */
  --color-accent-3: #3fb950;  /* Green */
  /* ... etc ... */
}
```

Or create a new theme in `script.js` (see Theme Switcher section above).

### 9. Edit Training Data

Training sessions are stored locally in JavaScript (easy to edit). To add a new training day:

```javascript
const trainingData = {
  // ... existing entries ...
  '2026-04-20': {
    type: 'intervals',
    distance: 6,
    description: '6 x 800m @ 5K pace with 2 min recovery',
    terrain: 'Track',
    route: 'University Track',
    cues: ['Fast but controlled', 'Relax at top of inhale', 'Strong lean']
  }
};
```

### 10. Update Weekly KPIs

**Location:** `script.js`, line ~67 in `weeklyData`

```javascript
const weeklyData = [
  { week: '4/7', miles: 38.5, daysRun: 6, longestRun: 12.4 },
  { week: '4/14', miles: 40.2, daysRun: 6, longestRun: 13.0 },
  { week: '4/21', miles: 42.5, daysRun: 6, longestRun: 13.2 },
  { week: '4/28', miles: 45.0, daysRun: 7, longestRun: 14.5 }, // Add new weeks here
];
```

### 11. Persist Data with localStorage

Priorities, race mode, race scripts, and selected theme are automatically saved to your browser's localStorage. They persist across page refreshes. To clear saved data:

```javascript
// Run in browser console:
localStorage.clear();
location.reload();
```

---

## Features Breakdown

### Page 1: At a Glance
- **Time & Greeting** – Live clock with smart greeting logic
- **Today Overview** – Editable priorities (saved to localStorage)
- **Weather & Outfit** – Real-time weather display with auto-generated outfit suggestions
- **Market Snapshot** – S&P 500 & BTC preview with sparkline chart
- **Quick Links** – GitHub, email, calendar, custom links
- **Weekly Heatmap** – Visual activity summary

### Page 2: News & Markets
- **Top News** – 5 headline cards with **clickable links** (auto-updating every 5 minutes)
- **Tech & Business News** – Separate tech-focused feed with article links
- **Markets Panel** – S&P 500, NASDAQ, BTC, ETH with daily % changes (auto-updating)

### Page 3: Weather & Outfit
- **Current Weather** – Large display, feels-like, humidity, wind, UV index
- **24-Hour Hourly Forecast Chart** – Interactive line graph showing temperature for all 24 hours
- **Outfit Recommendation** – Dynamic based on temperature with icon set
- **UV Warning** – Smart sunscreen reminder when UV is high

### Page 4: XC Training HQ
- **Today's Training** – Automatic daily workout display with focus cues
- **Race Mode** – Toggle to reveal race planning tools, splits table, pre-race checklist, visualization script (saved to localStorage)
- **Season Phase** – Visual progress through training phases (Base → Threshold → Race)
- **Weekly KPIs** – Total miles, 4-week average, days run, longest run
- **Activity Heatmap** – Visual calendar of the week
- **Charts** – Last 7 runs (distance + pace), shoe mileage tracker

---

## Latest Updates

✅ **6 Customizable Themes** – Switch instantly with 🎨 palette button (Midnight Galaxy, Sunset Boulevard, Forest Canopy, Tech Neon, Desert Rose, Arctic Frost)  
✅ **Clickable News Headlines** – Headlines link directly to source articles (new tab)  
✅ **24-Hour Weather Chart** – Full day forecast with interactive hourly temperature graph  
✅ **Auto-Refreshing News** – Updates every 5 minutes without reloading  
✅ **Auto-Refreshing Markets** – Stock and crypto prices update every 5 minutes  
✅ **Theme Persistence** – Your selected theme is saved to localStorage  
✅ **Fully Responsive** – Mobile-friendly on all devices  
✅ **GitHub Pages Ready** – Pure static HTML/CSS/JS, no build step

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (responsive design)

## Technical Stack

- **HTML5** – Semantic markup
- **CSS3** – Grid, Flexbox, CSS variables, animations
- **JavaScript (Vanilla)** – No frameworks, pure ES6
- **Chart.js** – Lightweight charting via CDN
- **localStorage** – Client-side data persistence

## Performance Notes

- **No build step** – Drop files into GitHub Pages and go
- **Lightweight** – ~65KB total (HTML + CSS + JS), plus Chart.js from CDN
- **Fast load** – Renders instantly, API calls optional and non-blocking
- **Offline-capable** – Falls back to demo data if APIs are unavailable

## Common Questions

**Q: Can I add more pages?**  
A: Yes. Copy a page `<div id="page-name" class="page">`, add a nav button with `data-page="page-name"`, and add content.

**Q: Why no framework?**  
A: Keeps the site minimal and perfect for GitHub Pages. No build step, no dependencies.

**Q: How do I add more training days?**  
A: Edit the `trainingData` object in `script.js` with new `YYYY-MM-DD` entries.

**Q: Can I use different APIs?**  
A: Absolutely. The API calls are stubbed with clear comments showing where to plug in your API keys and response handling.

**Q: Will this work on mobile?**  
A: Yes, fully responsive. Test with `viewport` meta tag and CSS media queries already in place.

---

## License

Free to use and modify. Enjoy your personal command center! 🚀

---

**Next Steps:**
1. Copy files to GitHub repo
2. Enable GitHub Pages
3. Customize colors, links, and training data
4. (Optional) Add your own API keys for weather/news/markets
5. Watch it live-update in real-time!
