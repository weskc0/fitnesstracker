# 🌤️ Landrum Weather Dashboard

Beautiful, functional weather dashboard with outfit recommendations, 7-day forecast, global news, and automatic daily updates.

## ✨ Features

### 🌤️ Weather Page
- Real-time current conditions
- 3-hour forecast (every 3 hours for 24 hours)
- 6 key metrics: feels like, humidity, wind, UV, pressure, visibility
- Beautiful animated weather icons
- Responsive design

### 👗 What to Wear Page
- Smart outfit recommendations based on temperature
- Considers humidity, wind speed, and rain probability
- Shows specific items to wear with emojis
- Context-aware tips and advice
- Adjusts recommendations for harsh conditions

### 📊 7-Day Forecast
- Next 7 days with highs/lows
- Weather icons for each day
- Easy-to-scan card layout

### 📰 News Page
- Top 10 global headlines
- Time-relative publishing (e.g., "2h ago")
- Source attribution
- Direct links to read full stories

### 🎨 Theme System
- Dark & light modes
- Toggle with button in header
- Saved preference in browser
- Auto-detects system preference on first visit

### 🔄 Auto-Updates
- Daily update at 6:00 AM EST via GitHub Actions
- Manual refresh button
- Auto-refresh every 30 minutes while on page

## 📱 Responsive Design
- Works on mobile, tablet, desktop
- Touch-friendly buttons
- Optimized layouts for all screen sizes

## 🚀 Setup

1. **Create a GitHub repo**: `landrum-weather-dashboard`
2. **Upload these files**:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `.github/workflows/daily-update.yml`
3. **Enable GitHub Pages**:
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main (root)
4. **Done!** Site available at `https://yourusername.github.io/landrum-weather-dashboard/`

## 🛠️ Customization

### Change Location
Edit `app.js`:
```javascript
const LOCATION = {
    lat: 35.2526,      // Your latitude
    lon: -82.1959,     // Your longitude
    name: 'Landrum, SC' // Your location
};
```

### Change Update Time
Edit `.github/workflows/daily-update.yml`:
```yaml
- cron: '0 11 * * *'  # Currently 6 AM EST
```

**Time conversion:**
- `0 8 * * *` = 3 AM EST
- `0 11 * * *` = 6 AM EST
- `0 13 * * *` = 8 AM EST
- `0 14 * * *` = 9 AM EST

### Change Colors
Edit `styles.css` variables:
```css
:root {
    --accent: #ff6b35;      /* Orange */
    --accent-light: #00a8ff; /* Blue */
}
```

## 🔒 Privacy
- No tracking or analytics
- No personal data collection
- Theme saved locally only
- Uses public APIs only

## 📊 Data Sources
- **Weather**: Open-Meteo (free, unlimited)
- **News**: NewsAPI (free tier)
- **Hosting**: GitHub Pages
- **Updates**: GitHub Actions

## 💰 Cost
**$0** - Completely free

## 📄 License
MIT - Use freely

---

**Location**: Landrum, SC
**Updates**: Daily at 6:00 AM EST
**Made with**: ❤️ + Open APIs
