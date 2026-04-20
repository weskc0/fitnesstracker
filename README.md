# 🌤️ WeatherMood - Smart Weather & Lifestyle Companion

A beautiful, modern weather dashboard for Landrum, SC with outfit recommendations, multi-page navigation, theme switching, and automatic daily updates at 6:00 AM EST.

## ✨ Features

### 🌤️ Weather Page
- **Current Conditions** - Real-time temperature, humidity, wind, pressure, visibility
- **3-Hour Forecast** - See weather every 3 hours for the next 24 hours with emoji icons
- **Beautiful Hero Section** - Large, engaging weather display with gradient backgrounds
- **Detailed Cards** - Wind, humidity, pressure, visibility with interactive elements
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### 👗 Outfit Recommendation Page
- **Smart Outfit Engine** - Analyzes temperature, humidity, wind, and conditions
- **Personalized Suggestions** - Gets smarter based on actual weather conditions
- **Item Recommendations** - Specific clothing suggestions with emojis
- **Pro Tips** - Weather-specific advice (sunscreen for heat, layers for cold, etc.)
- **Outfit Vibes** - Freezing, Cold, Cool, Pleasant, Warm, Hot categorization
- **Dynamic Tips** - Rain jackets when rain is coming, windbreakers when windy, etc.

### 📊 Forecast Page
- **7-Day Forecast** - Full week view with highs, lows, and conditions
- **Weekly Summary** - Smart text analysis of upcoming weather
- **Visual Cards** - Easy-to-scan weather cards with temperature ranges

### 📰 News Page
- **Global Headlines** - Top 10 current news stories
- **Time Stamps** - Shows when articles were published (e.g., "2 hours ago")
- **Source Attribution** - Credit to news outlets
- **Quick Links** - Direct access to full articles

### 🎨 Theme System
- **Dark & Light Modes** - Toggle between themes instantly
- **Persistent Storage** - Your theme choice is saved locally
- **System Detection** - Automatically matches your device preferences
- **Beautiful Gradients** - Smooth transitions and animations

### 🔄 Navigation & Updates
- **Multi-Page Navigation** - Seamless switching between sections
- **Smooth Animations** - Page transitions feel buttery smooth
- **Auto-Refresh** - Data updates every 30 minutes while you're on the page
- **Manual Refresh** - Click the refresh button for instant updates
- **Daily Auto-Updates** - GitHub Actions updates at 6:00 AM EST

## 🎯 Outfit Recommendation Logic

The smart outfit engine considers:
- **Temperature**: Freezing, Cold, Cool, Pleasant, Warm, Hot
- **Humidity**: Suggests moisture-wicking fabrics if humid
- **Wind**: Adds windbreakers if windy
- **Weather Conditions**: Adds rain jackets when rain is expected

### Temperature Categories:
- 🧊 **< 32°F** - Heavy coat, thermal layers, winter gear
- 🧥 **32-45°F** - Jacket weather with sweaters
- 👕 **45-60°F** - Light jackets and long sleeves
- 👖 **60-75°F** - T-shirts and jeans
- 🩳 **75-85°F** - Shorts and light clothes
- 🔥 **> 85°F** - Minimal clothing, sunscreen essential

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks!)
- **APIs**: 
  - Open-Meteo (weather) - Free, unlimited
  - NewsAPI (news) - Free tier available
- **Hosting**: GitHub Pages
- **Automation**: GitHub Actions (6 AM EST daily)
- **Design**: Custom gradient design, smooth animations, responsive layout

## 📦 File Structure

```
landrum-weather-dashboard/
├── index.html                          # Main HTML with 4 pages
├── styles.css                          # Beautiful responsive styling
├── app.js                              # Weather, outfit, news logic
├── .github/
│   └── workflows/
│       └── daily-update.yml            # Automatic 6 AM updates
├── README.md                           # This file
└── LICENSE                             # MIT License
```

## 🛠️ Setup Instructions

### 1. Create GitHub Repository
```bash
git clone https://github.com/yourusername/landrum-weather-dashboard.git
cd landrum-weather-dashboard
```

### 2. Upload Files
1. Go to your repo
2. Click "Add file" → "Upload files"
3. Upload: `index.html`, `styles.css`, `app.js`, `.github/` folder
4. Commit changes

### 3. Enable GitHub Pages
1. Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. Save

### 4. Enable GitHub Actions
The workflow automatically runs at 6:00 AM EST daily. To test:
1. Go to "Actions" tab
2. Select "Daily Update at 6 AM"
3. Click "Run workflow"

### 5. Access Your Dashboard
```
https://yourusername.github.io/landrum-weather-dashboard/
```

## 🎨 Customization

### Change Location
Edit `app.js`:
```javascript
const LOCATION = {
    lat: 35.2526,      // Your latitude
    lon: -82.1959,     // Your longitude
    name: 'Landrum, SC' // Your location name
};
```

### Change Update Time
Edit `.github/workflows/daily-update.yml`:
```yaml
- cron: '0 11 * * *'  # Change 11 to desired hour
```
**UTC Conversion Examples:**
- `0 8 * * *` = 3:00 AM EST
- `0 11 * * *` = 6:00 AM EST
- `0 13 * * *` = 8:00 AM EST
- `0 14 * * *` = 9:00 AM EST

### Customize Colors & Theme
Edit `styles.css` root variables:
```css
:root {
    --accent-primary: #ff6b35;     /* Orange */
    --accent-secondary: #00a8ff;   /* Blue */
    --accent-tertiary: #ffd700;    /* Gold */
}
```

### Customize Outfit Recommendations
Edit `OutfitEngine` in `app.js` to add your own rules and suggestions.

## 📱 Responsive Design

- **Desktop**: Full 4-column grid layouts, maximum visibility
- **Tablet**: 2-column grids, adjusted spacing
- **Mobile**: Single column, optimized for touch, full-screen readability

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔐 Privacy & Data

- **No tracking** - No analytics or user tracking
- **Local storage only** - Theme preference stored locally
- **API calls only** - Only fetches public weather/news APIs
- **No personal data** - Doesn't collect or store any info

## 🚀 Performance

- **Fast load time** - < 2 seconds on 4G
- **Minimal bundle** - ~150KB total (no dependencies)
- **Smooth animations** - 60fps CSS transitions
- **Mobile optimized** - Touch-friendly, fast interactions

## 📊 API Rate Limits

- **Open-Meteo**: Unlimited requests (free)
- **NewsAPI**: 100 requests/day (free tier) - plenty for hourly checks
- **Total needed**: ~50 requests/day = well within limits

## 🤝 Contributing

Feel free to:
- Customize outfit recommendations
- Add more pages (air quality, pollen forecast, etc.)
- Improve the design
- Add new features

## 📄 License

MIT License - Use freely for personal or commercial projects

## 🙏 Credits

Built with:
- 🌤️ [Open-Meteo](https://open-meteo.com) - Free weather API
- 📰 [NewsAPI](https://newsapi.org) - News aggregation
- 🎨 [Google Fonts](https://fonts.google.com) - Typography
- 💻 [GitHub Pages](https://pages.github.com) - Free hosting
- 🤖 [GitHub Actions](https://github.com/features/actions) - Automation

## 🐛 Troubleshooting

### Weather not loading?
- Open-Meteo is free and reliable - should always work
- Check your internet connection
- Open browser console (F12) for error details

### News not showing?
- Free tier has rate limits
- Refresh after a few minutes
- NewsAPI is the backup source

### Theme not saving?
- Check if localStorage is enabled in browser
- Theme is also detected from system preferences

### Updates not running?
1. Check "Actions" tab for errors
2. Verify `.github/workflows/daily-update.yml` exists
3. Confirm GitHub Actions is enabled in settings
4. Check workflow logs for detailed errors

## 🎯 Roadmap

Future features to consider:
- Air quality index
- Pollen forecast
- UV index timeline
- Weather alerts
- Multi-location support
- Historical weather data
- Custom outfit profiles
- Social sharing

---

**Dashboard for**: Landrum, SC (35.2526°N, 82.1959°W)
**Update Schedule**: Daily at 6:00 AM EST
**Last Updated**: Shown in footer
**Made with**: ❤️ and open-source APIs
