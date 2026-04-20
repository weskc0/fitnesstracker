# 🚀 5-Minute Setup Guide

## What You're Getting

✨ A **stunning weather app** with:
- 🌤️ Beautiful weather display
- 👗 Smart outfit recommendations
- 📊 7-day forecast
- 📰 Global news
- 🎨 Dark/light theme toggle
- 🔄 Auto-updates daily at 6 AM

## Step-by-Step Setup

### Step 1️⃣: Create a GitHub Repository (2 min)

1. Go to **https://github.com/new**
2. Enter repository name: `landrum-weather-dashboard`
3. Description (optional): `Beautiful weather dashboard with outfit recommendations`
4. Select **Public** (required for free GitHub Pages)
5. Click **"Create repository"**

### Step 2️⃣: Upload Your Files (2 min)

1. In your repo, click **"Add file"** → **"Upload files"**
2. Drag & drop these 3 files:
   - `index.html`
   - `styles.css`
   - `app.js`
3. Then drag the `.github` folder
4. Click **"Commit changes"**

**Your files structure should look like:**
```
landrum-weather-dashboard/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .github/workflows/daily-update.yml
```

### Step 3️⃣: Enable GitHub Pages (1 min)

1. Go to Settings ⚙️
2. Click **"Pages"** on the left sidebar
3. Under "Build and deployment":
   - Source: **"Deploy from a branch"**
   - Branch: **"main"** / **(root)**
4. Click **"Save"**

### Step 4️⃣: Check GitHub Actions (Optional)

1. Go to the **"Actions"** tab
2. You should see **"Daily Update at 6 AM"** workflow
3. It will run automatically every day at 6:00 AM EST
4. (To test manually: click "Run workflow")

### Step 5️⃣: Your Dashboard is LIVE! 🎉

Visit: **`https://yourusername.github.io/landrum-weather-dashboard/`**

Replace `yourusername` with your actual GitHub username.

---

## 🎨 Quick Customizations

### 1. Change Location

Edit `app.js` and find this section (around line 3):

```javascript
const LOCATION = {
    lat: 35.2526,      // ← Change this
    lon: -82.1959,     // ← And this
    name: 'Landrum, SC' // ← And this
};
```

**How to find coordinates:**
- Go to Google Maps
- Right-click your location
- Click the coordinates at the top
- Copy latitude and longitude

### 2. Change Dark Mode Colors

Edit `styles.css` and find `:root`:

```css
:root {
    --accent-primary: #ff6b35;    /* Orange - main color */
    --accent-secondary: #00a8ff;  /* Blue - secondary */
}
```

**Color ideas:**
- Primary: Purple (#8b5cf6), Green (#10b981), Red (#ef4444)
- Secondary: Cyan (#06b6d4), Amber (#f59e0b), Pink (#ec4899)

### 3. Change Update Time

Edit `.github/workflows/daily-update.yml`:

```yaml
- cron: '0 11 * * *'  # Change 11 to your hour
```

**Time conversion (EST):**
- `0 8 * * *` = 3:00 AM
- `0 11 * * *` = 6:00 AM ← Current
- `0 13 * * *` = 8:00 AM
- `0 14 * * *` = 9:00 AM
- `0 15 * * *` = 10:00 AM

---

## 📱 Test It Out

### Mobile
- Click through the 4 pages: Weather, Outfit, Forecast, News
- Try the dark mode toggle (🌙 button)
- Refresh button to get latest data

### Desktop
- Hover over cards for cool effects
- Watch the smooth page transitions
- Try resizing the browser

---

## ✅ Checklist

- [ ] Repo created
- [ ] Files uploaded
- [ ] GitHub Pages enabled
- [ ] Site is live at your URL
- [ ] Theme toggle works
- [ ] All 4 pages work
- [ ] Outfit recommendations show
- [ ] (Optional) Customized location/colors

---

## 🆘 Troubleshooting

### "Site not found"
- Wait 1-2 minutes after enabling Pages
- Refresh the page
- Check Settings → Pages to confirm it's enabled
- Make sure branch is set to `main`

### "Weather shows Loading..."
- Open-Meteo API might be slow
- Click refresh button (↻)
- Wait a few seconds

### "No news showing"
- Free news API has limits
- Try again after a few minutes
- This is normal and expected

### "Dark mode not working"
- Try clicking the 🌙 button again
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

### "Theme resets on refresh"
- Check if browser allows localStorage
- Try a different browser
- Some privacy extensions block this

---

## 🔥 Cool Features You Have

🌤️ **Smart Weather**
- Real-time current conditions
- 3-hour forecast (not just daily!)
- Detailed metrics (wind, humidity, pressure)

👗 **Outfit Intelligence**
- Recommends outfits based on temperature
- Adjusts for humidity, wind, rain
- Includes specific items and tips

📊 **Beautiful Design**
- Gradient backgrounds
- Smooth animations
- Works on all devices
- Dark & light themes

🔄 **Completely Automatic**
- Updates daily at 6 AM
- Data refreshes every 30 minutes
- No maintenance needed

---

## 💡 Next Steps (Optional)

Want to add more features? Try:

1. **Air Quality Page** - Add AQI data
2. **Pollen Forecast** - Add allergen info
3. **Multiple Locations** - Add dropdown to switch cities
4. **Sunset Times** - Add sunrise/sunset data
5. **Weather Alerts** - Show severe weather warnings

All of these are just new API calls in `app.js`!

---

## 📞 Need Help?

1. **Read the full README.md** - Has detailed docs
2. **Check browser console** - Press F12, see error messages
3. **Verify API is working** - Open these URLs in your browser:
   - `https://api.open-meteo.com/v1/forecast?latitude=35.2526&longitude=-82.1959&current=temperature_2m`
   - `https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt`

---

## 🎉 Congratulations!

You now have a **beautiful, automated weather dashboard** that updates every day completely for free!

**Share it with friends:**
```
https://yourusername.github.io/landrum-weather-dashboard/
```

Enjoy! 🌤️✨

---

**Made with:** ❤️ Open-source APIs • GitHub Pages • Vanilla JavaScript

**Location:** Landrum, SC  
**Update Schedule:** 6:00 AM EST Daily  
**Cost:** $0  
**Maintenance:** ~1 minute per year
