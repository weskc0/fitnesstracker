# 🚀 Quick Start Guide - 5 Minutes to Live

## Step 1: Create GitHub Repository (1 min)
1. Go to https://github.com/new
2. Repository name: `landrum-weather-dashboard`
3. Description: `Real-time weather and global events dashboard for Landrum, SC`
4. Choose "Public" (required for free GitHub Pages)
5. Click "Create repository"

## Step 2: Upload Files (2 min)
1. Go to your new repository
2. Click "Add file" → "Upload files"
3. Drag and drop ALL these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
   - `.github/` folder (drag the entire folder)
4. Commit message: "Initial commit: Add weather dashboard"
5. Click "Commit changes"

## Step 3: Enable GitHub Pages (1 min)
1. Go to your repository settings (⚙️ icon)
2. Scroll left sidebar to "Pages"
3. Under "Build and deployment":
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
   - Click "Save"

## Step 4: Verify GitHub Actions (1 min)
1. Go to "Actions" tab
2. You should see "Daily Update" workflow
3. It will automatically run at 6:00 AM EST every day

## Your Dashboard is LIVE! 🎉

Access it at: `https://yourusername.github.io/landrum-weather-dashboard/`

---

## What Just Happened?

✅ **Weather Dashboard**
- Shows current weather in Landrum, SC
- 24-hour hourly forecast
- 7-day daily forecast
- Uses free Open-Meteo API (no key needed!)

✅ **Global News Feed**
- Top headlines from around the world
- Updated every 30 minutes
- Click links to read full articles

✅ **Daily Auto-Updates**
- GitHub Actions runs at 6:00 AM EST
- Keeps your site fresh automatically
- Completely free!

---

## Customize It (Optional)

### Change the Update Time
Edit `.github/workflows/daily-update.yml`:
```yaml
- cron: '0 11 * * *'  # Currently 6 AM EST
```

**Common Times:**
- `0 8 * * *` = 3:00 AM EST
- `0 11 * * *` = 6:00 AM EST (current)
- `0 13 * * *` = 8:00 AM EST
- `0 14 * * *` = 9:00 AM EST

### Change the Location
Edit `app.js`, find this section:
```javascript
const LOCATION = {
    lat: 35.2526,
    lon: -82.1959,
    name: 'Landrum, SC'
};
```

Google Maps: Right-click any location → copy the latitude/longitude

### Customize Colors
Edit `styles.css`, find `:root`:
```css
--primary-color: #1e3a8a;      /* Main blue */
--accent-color: #f59e0b;       /* Orange highlights */
```

---

## Troubleshooting

**Dashboard shows "Loading..."?**
- Wait a few seconds for APIs to respond
- Click refresh button (🔄)
- Check browser console (F12) for errors

**News not showing?**
- Free API has limits, but auto-falls back to BBC News RSS
- Try refreshing after a few minutes

**GitHub Actions not running?**
1. Check "Actions" tab
2. If no "Daily Update" workflow, re-upload `.github/workflows/daily-update.yml`
3. Make sure you're on the `main` branch

**Not seeing GitHub Pages URL?**
1. Wait 1-2 minutes after enabling Pages
2. Refresh Settings → Pages
3. Verify branch is set to `main` and folder is `/ (root)`

---

## Features at a Glance

| Feature | Status |
|---------|--------|
| Current weather | ✅ Real-time |
| Hourly forecast | ✅ 24 hours |
| 7-day forecast | ✅ Updated hourly |
| Global news | ✅ Top headlines |
| Auto-update | ✅ Daily at 6 AM |
| Mobile responsive | ✅ Works on phones |
| No credit card | ✅ 100% free |
| No API keys | ✅ Open-Meteo free tier |

---

## File Structure
```
landrum-weather-dashboard/
├── index.html              (Main page)
├── styles.css              (Styling)
├── app.js                  (Weather & news logic)
├── README.md               (Full documentation)
├── LICENSE                 (MIT License)
├── .gitignore              (Git ignore file)
└── .github/
    └── workflows/
        └── daily-update.yml (Scheduled updates)
```

---

## Need Help?

1. **Weather API Issues**: Check [Open-Meteo Status](https://status.open-meteo.com)
2. **News API Issues**: Check [NewsAPI Status](https://newsapi.org)
3. **GitHub Pages Issues**: Check [GitHub Docs](https://docs.github.com/en/pages)
4. **GitHub Actions Issues**: Check the "Actions" tab → workflow logs

---

## Next Steps (Optional Enhancements)

🎨 **Design**
- Add location selector
- Dark/light mode toggle
- Map view

📊 **Data**
- Add air quality
- Add pollen forecast
- Add earthquake alerts

🔔 **Notifications**
- Email alerts for severe weather
- Weather warnings
- Important news alerts

---

**That's it! Your dashboard is live and will update every day at 6:00 AM EST!** 🎉
