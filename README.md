

A real-time weather and global news dashboard

## Features

✨ **Live Weather Data**
- Current conditions (temperature, humidity, wind speed, pressure, visibility)
- 24-hour hourly forecast
- 7-day daily forecast
- Weather icons and descriptions
- No API key required (uses Open-Meteo)

📰 **Global News & Events**
- Top headlines from around the world
- Automatic news aggregation
- Direct links to full articles
- Published time indicators

🤖 **Automated Updates**
- Daily automatic update at 6:00 AM EST
- Powered by GitHub Actions
- No server required
- Free hosting on GitHub Pages

## Data Sources

- **Weather**: [Open-Meteo](https://open-meteo.com) - Free weather API (no key needed)
- **News**: [NewsAPI](https://newsapi.org) - Global news aggregation
- **Fallback News**: [BBC News RSS](https://bbc.com/news) via RSS2JSON

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: GitHub Pages
- **Automation**: GitHub Actions
- **APIs**: Open-Meteo (free), NewsAPI (free tier)

## Setup Instructions

### 1. Fork/Clone Repository

```bash
git clone https://github.com/yourusername/landrum-weather-dashboard.git
cd landrum-weather-dashboard
```

### 2. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment", select:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Click "Save"

### 3. Enable GitHub Actions

The `.github/workflows/daily-update.yml` workflow will automatically run daily at 6:00 AM EST.

To verify it's working:
1. Go to your repository
2. Click "Actions" tab
3. You should see "Daily Update" workflow
4. It will execute automatically on schedule

### 4. Manual Testing

To test the workflow manually:
1. Go to "Actions" tab
2. Select "Daily Update" workflow
3. Click "Run workflow"

### 5. Access Your Dashboard

Once GitHub Pages is enabled, your dashboard will be available at:
```
https://yourusername.github.io/landrum-weather-dashboard/
```

## Customization

### Change Location

Edit `app.js` and modify the `LOCATION` object:

```javascript
const LOCATION = {
    lat: 35.2526,      // Your latitude
    lon: -82.1959,     // Your longitude
    name: 'Your City'  // Your city name
};
```

### Change Update Time

Edit `.github/workflows/daily-update.yml` and modify the cron schedule:

```yaml
on:
  schedule:
    # Run at 6:00 AM EST (11:00 UTC)
    - cron: '0 11 * * *'
```

**Cron Format**: `minute hour day month day-of-week`
- `0 11 * * *` = 6:00 AM EST (11:00 UTC)
- `30 8 * * *` = 3:30 AM EST
- `0 13 * * *` = 8:00 AM EST

### Styling Customization

Edit `styles.css` to customize colors, fonts, and layout:

```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #0f766e;
    --accent-color: #f59e0b;
    /* ... more colors ... */
}
```

## Features Breakdown

### Weather Section
- Real-time current conditions with emoji icons
- Detailed metrics (feels like, humidity, wind, UV, visibility, pressure)
- 24-hour forecast with precipitation probability
- 7-day forecast with high/low temps and UV index

### News Section
- Top 10 global headlines
- Source attribution
- Time-relative publishing (e.g., "2 hours ago")
- Direct links to full articles
- Responsive card layout

### Auto-Updates
- Automatically updates daily at 6:00 AM EST
- Client-side refreshes every 30 minutes during the day
- Manual refresh buttons for both weather and news

## API Rate Limits

- **Open-Meteo**: Unlimited (free tier)
- **NewsAPI**: 100 requests/day (free tier) - sufficient for daily updates
- **BBC RSS**: Unlimited

The dashboard is designed to work within these limits.

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### News not loading
- The free NewsAPI tier may have rate limits
- The app automatically falls back to BBC News RSS feed
- Check browser console for error messages

### Weather not updating
- Open-Meteo should always work (unlimited, no key required)
- Check browser developer tools for any fetch errors
- Verify location coordinates are correct

### GitHub Actions not running
1. Check the "Actions" tab for any errors
2. Verify the `.github/workflows/daily-update.yml` file exists
3. Check that GitHub Actions are enabled in repository settings
4. Look at the workflow run logs for detailed errors

## Performance

- Lightweight (~250KB gzipped with assets)
- Fast load time (< 2 seconds on 4G)
- Optimized for mobile and desktop
- Minimal dependencies (no frameworks needed)

## License

MIT License - Feel free to use and modify for your needs.

## Credits

Built with:
- 🌤️ [Open-Meteo](https://open-meteo.com) - Weather data
- 📰 [NewsAPI](https://newsapi.org) - News aggregation
- 🤖 [GitHub Actions](https://github.com/features/actions) - Automation
- 📄 [GitHub Pages](https://pages.github.com) - Hosting

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Check browser console for errors
4. Verify API endpoints are accessible

---

**Dashboard Location**: Landrum, SC (35.2526°N, 82.1959°W)
**Update Schedule**: Daily at 6:00 AM EST
**Last Updated**: Auto-generated
