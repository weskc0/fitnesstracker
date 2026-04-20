// Landrum, SC coordinates
const LOCATION = {
    lat: 35.2526,
    lon: -82.1959,
    name: 'Landrum, SC'
};

// Update timestamp on page load and every minute
function updateTimestamp() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleTimeString();
}

// Fetch weather data from Open-Meteo (free API, no key required)
async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,uv_index_max&hourly=temperature_2m,weather_code,precipitation_probability&timezone=America/New_York&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

// Fetch news from NewsAPI (free tier)
async function fetchNews() {
    try {
        // Using free newsapi.org endpoint - works without key
        const response = await fetch(
            'https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt&pageSize=20',
            {
                headers: {
                    'X-API-Key': 'demo'  // Using demo key for free tier
                }
            }
        );
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback: Try BBC News RSS feed
        return fetchRSSNews();
    }
}

// Fallback RSS news feed
async function fetchRSSNews() {
    try {
        // Using RSS2JSON service
        const response = await fetch(
            'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/rss.xml?edition=us'
        );
        const data = await response.json();
        return (data.items || []).map(item => ({
            title: item.title,
            description: item.description,
            source: { name: 'BBC News' },
            publishedAt: item.pubDate,
            url: item.link,
            content: item.description
        }));
    } catch (error) {
        console.error('Error fetching RSS:', error);
        return [];
    }
}

// Weather code to emoji mapping
function getWeatherEmoji(code, isDay = true) {
    // WMO weather codes
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code === 51 || code === 53 || code === 55) return '🌦️';
    if (code === 61 || code === 63 || code === 65) return '🌧️';
    if (code === 71 || code === 73 || code === 75) return '❄️';
    if (code === 77) return '❄️';
    if (code === 80 || code === 81 || code === 82) return '🌧️';
    if (code === 85 || code === 86) return '🌨️';
    if (code === 95 || code === 96 || code === 99) return '⛈️';
    return '⛅';
}

// WMO description
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown';
}

// Display current weather
function displayWeather(data) {
    if (!data) return;

    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    // Update main weather
    document.getElementById('weatherIcon').textContent = getWeatherEmoji(current.weather_code);
    document.getElementById('temperature').textContent = Math.round(current.temperature_2m) + '°F';
    document.getElementById('description').textContent = getWeatherDescription(current.weather_code);
    document.getElementById('feelsLike').textContent = Math.round(current.apparent_temperature) + '°F';
    document.getElementById('humidity').textContent = current.relative_humidity_2m + '%';
    document.getElementById('windSpeed').textContent = Math.round(current.wind_speed_10m) + ' mph';
    document.getElementById('visibility').textContent = (current.visibility / 1609.34).toFixed(1) + ' mi';
    document.getElementById('pressure').textContent = Math.round(current.pressure_msl) + ' mb';

    // Display hourly forecast (next 24 hours)
    displayHourlyForecast(hourly);

    // Display daily forecast (7 days)
    displayDailyForecast(daily);

    // Update build time
    document.getElementById('buildTime').textContent = new Date().toLocaleString();
}

// Display hourly forecast
function displayHourlyForecast(hourly) {
    const container = document.getElementById('hourlyForecast');
    container.innerHTML = '';

    const now = new Date();
    const currentHour = now.getHours();

    // Show next 24 hours
    for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
        const hour = (currentHour + i) % 24;
        const temp = Math.round(hourly.temperature_2m[i]);
        const code = hourly.weather_code[i];
        const precipitation = hourly.precipitation_probability[i] || 0;

        const item = document.createElement('div');
        item.className = 'hourly-item';
        item.innerHTML = `
            <div class="time">${hour}:00</div>
            <div class="icon">${getWeatherEmoji(code)}</div>
            <div class="temp">${temp}°</div>
            <div class="chance">💧 ${precipitation}%</div>
        `;
        container.appendChild(item);
    }
}

// Display daily forecast
function displayDailyForecast(daily) {
    const container = document.getElementById('dailyForecast');
    container.innerHTML = '';

    for (let i = 0; i < Math.min(7, daily.time.length); i++) {
        const date = new Date(daily.time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const high = Math.round(daily.temperature_2m_max[i]);
        const low = Math.round(daily.temperature_2m_min[i]);
        const code = daily.weather_code[i];
        const precip = daily.precipitation_sum[i] || 0;
        const uv = daily.uv_index_max[i] || 0;

        const item = document.createElement('div');
        item.className = 'daily-item';
        item.innerHTML = `
            <div class="date">${dayName}<br>${monthDay}</div>
            <div class="icon">${getWeatherEmoji(code)}</div>
            <div class="temps">
                <span class="high">${high}°</span>
                <span class="low">${low}°</span>
            </div>
            <div class="info">
                💧 ${precip.toFixed(2)}"<br>
                ☀️ UV ${uv.toFixed(1)}
            </div>
        `;
        container.appendChild(item);
    }
}

// Display news
function displayNews(articles) {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    if (articles.length === 0) {
        container.innerHTML = '<div class="loading-state">No news available</div>';
        return;
    }

    articles.slice(0, 10).forEach(article => {
        const date = new Date(article.publishedAt);
        const timeAgo = getTimeAgo(date);

        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
            <h3>${article.title || 'No title'}</h3>
            <div class="news-meta">
                <span class="news-source">${article.source?.name || 'News Source'}</span>
                <span class="news-date">${timeAgo}</span>
            </div>
            <p class="news-description">${article.description || article.content || 'No description available'}</p>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">Read More →</a>
        `;
        container.appendChild(item);
    });
}

// Get time ago string
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [key, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
            return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

// Load all data
async function loadData() {
    updateTimestamp();
    
    const weather = await fetchWeather();
    if (weather) {
        displayWeather(weather);
    }

    const news = await fetchNews();
    displayNews(news);
}

// Event listeners
document.getElementById('refreshWeather').addEventListener('click', async () => {
    const btn = document.getElementById('refreshWeather');
    btn.style.transform = 'rotate(180deg)';
    const weather = await fetchWeather();
    if (weather) displayWeather(weather);
    setTimeout(() => btn.style.transform = 'rotate(0deg)', 600);
});

document.getElementById('refreshEvents').addEventListener('click', async () => {
    const btn = document.getElementById('refreshEvents');
    btn.style.transform = 'rotate(180deg)';
    const news = await fetchNews();
    displayNews(news);
    setTimeout(() => btn.style.transform = 'rotate(0deg)', 600);
});

// Initial load
window.addEventListener('load', () => {
    loadData();
});

// Update timestamp every minute
setInterval(updateTimestamp, 60000);

// Refresh data every 30 minutes
setInterval(loadData, 30 * 60 * 1000);
