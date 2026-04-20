// Location
const LOCATION = {
    lat: 35.2526,
    lon: -82.1959,
    name: 'Landrum, SC'
};

// ===== OUTFIT ENGINE =====
const OutfitEngine = {
    getRecommendation: function(temp, humidity, wind, rainProbability) {
        let recommendation = {
            emoji: '🌤️',
            vibe: 'Comfortable',
            description: '',
            items: [],
            tips: []
        };

        // Temperature-based
        if (temp < 32) {
            recommendation.emoji = '🧊';
            recommendation.vibe = 'Freezing';
            recommendation.description = 'Bundle up! Heavy coat, thermal layers, insulated boots, winter hat, gloves & scarf.';
            recommendation.items = ['Heavy Coat', 'Thermal Layers', 'Winter Boots', 'Hat', 'Gloves', 'Scarf', 'Wool Socks'];
            recommendation.tips = [
                '❄️ Layer everything - thermal + insulating + windproof',
                '🧣 Protect extremities first',
                '☕ Hot beverage recommended',
                '⚠️ Watch for ice on walkways'
            ];
        } else if (temp < 45) {
            recommendation.emoji = '🧥';
            recommendation.vibe = 'Cold';
            recommendation.description = 'Jacket weather! Wear a warm sweater with long sleeves. Jeans and closed-toe shoes.';
            recommendation.items = ['Jacket', 'Sweater', 'Long Sleeves', 'Jeans', 'Closed-Toe Shoes', 'Light Scarf'];
            recommendation.tips = [
                '🧥 Insulated jacket is essential',
                '👖 Long pants recommended',
                '🧦 Keep warm socks handy',
                '☕ Perfect coffee weather'
            ];
        } else if (temp < 60) {
            recommendation.emoji = '👕';
            recommendation.vibe = 'Cool';
            recommendation.description = 'Light jacket or sweater with long sleeves. Comfortable jeans or chinos work great.';
            recommendation.items = ['Light Jacket', 'Long Sleeve Shirt', 'Jeans', 'Sneakers', 'Cardigan'];
            recommendation.tips = [
                '🧥 Cardigan or light jacket for layering',
                '👕 Long sleeves recommended',
                '🚶 Great for outdoor activities',
                '☀️ Sunglasses might be useful'
            ];
        } else if (temp < 75) {
            recommendation.emoji = '👖';
            recommendation.vibe = 'Pleasant';
            recommendation.description = 'T-shirt or light top with jeans or shorts. This is perfect weather!';
            recommendation.items = ['T-Shirt', 'Shorts', 'Jeans', 'Sneakers', 'Light Layer'];
            recommendation.tips = [
                '🌞 Ideal weather - enjoy it!',
                '🕶️ Sunglasses are nice',
                '💧 Stay hydrated',
                '👟 Comfortable shoes'
            ];
        } else if (temp < 85) {
            recommendation.emoji = '👕';
            recommendation.vibe = 'Warm';
            recommendation.description = 'Light and breathable! Short sleeves, shorts, light fabric. Sandals perfect.';
            recommendation.items = ['T-Shirt', 'Shorts', 'Sandals', 'Light Pants', 'Sunglasses'];
            recommendation.tips = [
                '🌞 Sunscreen SPF 30+ needed',
                '💦 Drink plenty of water',
                '🕶️ Sunglasses essential',
                '👒 Hat for sun protection'
            ];
        } else {
            recommendation.emoji = '🔥';
            recommendation.vibe = 'Hot';
            recommendation.description = 'Keep it minimal! Lightweight shorts, sleeveless top. Stay cool and hydrated!';
            recommendation.items = ['Shorts', 'Tank Top', 'Sandals', 'Light Dress', 'Sunglasses'];
            recommendation.tips = [
                '☀️ SPF 50+ sunscreen required',
                '💦 Drink 2x normal water intake',
                '🧢 Wide-brimmed hat essential',
                '💨 Breathable fabrics only'
            ];
        }

        // Humidity adjustment
        if (humidity > 70) {
            recommendation.tips.push('💧 Humidity high - moisture-wicking fabrics');
        }

        // Wind adjustment
        if (wind > 20) {
            recommendation.tips.push(`💨 Strong wind (${Math.round(wind)} mph) - secure loose items`);
            if (!recommendation.items.includes('Windbreaker')) {
                recommendation.items.push('Windbreaker');
            }
        }

        // Rain adjustment
        if (rainProbability > 40) {
            recommendation.tips.unshift('🌧️ Rain likely - bring umbrella & rain jacket');
            if (!recommendation.items.includes('Rain Jacket')) {
                recommendation.items.unshift('Rain Jacket');
            }
        }

        return recommendation;
    }
};

// ===== WEATHER CODES =====
function getWeatherEmoji(code) {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code === 51 || code === 53 || code === 55) return '🌦️';
    if (code === 61 || code === 63 || code === 65) return '🌧️';
    if (code === 71 || code === 73 || code === 75) return '❄️';
    if (code === 80 || code === 81 || code === 82) return '🌧️';
    if (code === 85 || code === 86) return '🌨️';
    if (code === 95 || code === 96 || code === 99) return '⛈️';
    return '⛅';
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear',
        1: 'Mostly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light Drizzle',
        53: 'Drizzle',
        55: 'Heavy Drizzle',
        61: 'Light Rain',
        63: 'Rain',
        65: 'Heavy Rain',
        71: 'Light Snow',
        73: 'Snow',
        75: 'Heavy Snow',
        80: 'Rain Showers',
        81: 'Heavy Rain',
        82: 'Violent Rain',
        85: 'Snow Showers',
        86: 'Heavy Snow',
        95: 'Thunderstorm',
        96: 'Thunderstorm',
        99: 'Thunderstorm'
    };
    return descriptions[code] || 'Unknown';
}

// ===== FETCH WEATHER =====
async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&hourly=temperature_2m,weather_code,precipitation_probability&timezone=America/New_York&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
        );
        return await response.json();
    } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
    }
}

// ===== FETCH NEWS =====
async function fetchNews() {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt&pageSize=10');
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('News fetch error:', error);
        return [];
    }
}

// ===== DISPLAY WEATHER =====
function displayWeather(data) {
    if (!data) return;

    const current = data.current;
    const hourly = data.hourly;
    const daily = data.daily;

    // Current conditions
    document.getElementById('weatherIcon').textContent = getWeatherEmoji(current.weather_code);
    document.getElementById('temperature').textContent = Math.round(current.temperature_2m) + '°F';
    document.getElementById('description').textContent = getWeatherDescription(current.weather_code);
    document.getElementById('feelsLike').textContent = Math.round(current.apparent_temperature) + '°F';
    document.getElementById('humidity').textContent = current.relative_humidity_2m + '%';
    document.getElementById('windSpeed').textContent = Math.round(current.wind_speed_10m) + ' mph';
    document.getElementById('uvIndex').textContent = '5';
    document.getElementById('pressure').textContent = Math.round(current.pressure_msl) + ' mb';
    document.getElementById('visibility').textContent = (current.visibility / 1609.34).toFixed(1) + ' mi';
    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();

    // Hourly (every 3 hours)
    displayHourly(hourly);

    // Daily forecast
    displayDaily(daily);

    // Outfit
    const outfit = OutfitEngine.getRecommendation(
        current.temperature_2m,
        current.relative_humidity_2m,
        current.wind_speed_10m,
        hourly.precipitation_probability[0] || 0
    );
    displayOutfit(outfit, current.temperature_2m, getWeatherDescription(current.weather_code));
}

function displayHourly(hourly) {
    const container = document.getElementById('hourlyForecast');
    container.innerHTML = '';
    
    const now = new Date();
    const currentHour = now.getHours();

    // Every 3 hours for 24 hours
    for (let i = 0; i < 24; i += 3) {
        const temp = Math.round(hourly.temperature_2m[i]);
        const code = hourly.weather_code[i];
        const rain = Math.round(hourly.precipitation_probability[i] || 0);
        const hour = (currentHour + i) % 24;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="time">${hour.toString().padStart(2, '0')}:00</div>
            <div class="icon">${getWeatherEmoji(code)}</div>
            <div class="temp">${temp}°</div>
            <div class="rain">💧 ${rain}%</div>
        `;
        container.appendChild(card);
    }
}

function displayDaily(daily) {
    const container = document.getElementById('dailyForecast');
    container.innerHTML = '';

    for (let i = 0; i < 7 && i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const high = Math.round(daily.temperature_2m_max[i]);
        const low = Math.round(daily.temperature_2m_min[i]);
        const code = daily.weather_code[i];

        const card = document.createElement('div');
        card.className = 'daily-card';
        card.innerHTML = `
            <div class="day">${day}</div>
            <div class="icon">${getWeatherEmoji(code)}</div>
            <div class="temps">
                <span class="high">${high}°</span>
                <span class="low">${low}°</span>
            </div>
        `;
        container.appendChild(card);
    }
}

function displayOutfit(outfit, temp, condition) {
    document.getElementById('outfitTemp').textContent = Math.round(temp) + '°F';
    document.getElementById('outfitCondition').textContent = condition;

    const card = document.getElementById('outfitCard');
    card.innerHTML = `
        <div class="outfit-emoji">${outfit.emoji}</div>
        <div class="outfit-vibe">${outfit.vibe} Weather</div>
        <div class="outfit-description">${outfit.description}</div>
    `;

    // Items
    const itemsContainer = document.getElementById('outfitItems');
    itemsContainer.innerHTML = outfit.items.map(item => `
        <div class="item-badge">
            <div class="item-emoji">${getItemEmoji(item)}</div>
            <div class="item-name">${item}</div>
        </div>
    `).join('');

    // Tips
    const tipsContainer = document.getElementById('outfitTips');
    tipsContainer.innerHTML = outfit.tips.map(tip => `
        <div class="tip-item">
            <p>${tip}</p>
        </div>
    `).join('');
}

function getItemEmoji(item) {
    const map = {
        'Heavy Coat': '🧥', 'Thermal Layers': '🩱', 'Winter Boots': '🥾', 'Hat': '🎩', 'Gloves': '🧤', 'Scarf': '🧣', 'Wool Socks': '🧦',
        'Jacket': '🧥', 'Sweater': '🧶', 'Long Sleeves': '👕', 'Jeans': '👖', 'Closed-Toe Shoes': '👟', 'Light Scarf': '🧣',
        'Light Jacket': '🧥', 'T-Shirt': '👕', 'Shorts': '🩳', 'Sneakers': '👟', 'Light Layer': '👕', 'Cardigan': '🧶',
        'Light Pants': '👖', 'Sandals': '👡', 'Sunglasses': '🕶️', 'Tank Top': '🏃', 'Light Dress': '👗', 'Windbreaker': '🧥', 'Rain Jacket': '🌧️'
    };
    return map[item] || '👕';
}

// ===== DISPLAY NEWS =====
function displayNews(articles) {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    articles.slice(0, 10).forEach(article => {
        const date = new Date(article.publishedAt);
        const timeAgo = getTimeAgo(date);

        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
            <div class="news-title">${article.title}</div>
            <div class="news-meta">
                <span class="news-source">${article.source.name}</span>
                <span class="news-date">${timeAgo}</span>
            </div>
            <div class="news-description">${article.description || 'Click to read more'}</div>
            <a href="${article.url}" target="_blank" rel="noopener" class="news-link">Read Full Story →</a>
        `;
        container.appendChild(item);
    });
}

function getTimeAgo(date) {
    const secs = Math.floor((new Date() - date) / 1000);
    if (secs < 60) return 'just now';
    if (secs < 3600) return Math.floor(secs / 60) + 'm ago';
    if (secs < 86400) return Math.floor(secs / 3600) + 'h ago';
    return Math.floor(secs / 86400) + 'd ago';
}

// ===== TAB NAVIGATION =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabName = e.target.dataset.tab;
        document.getElementById(tabName).classList.add('active');
    });
});

// ===== THEME TOGGLE =====
document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
}

// ===== REFRESH =====
document.getElementById('refreshBtn').addEventListener('click', async () => {
    const weather = await fetchWeather();
    if (weather) displayWeather(weather);
    const news = await fetchNews();
    displayNews(news);
});

// ===== INIT =====
async function init() {
    loadTheme();
    
    const weather = await fetchWeather();
    if (weather) displayWeather(weather);
    
    const news = await fetchNews();
    displayNews(news);
    
    document.getElementById('buildTime').textContent = new Date().toLocaleDateString();
}

window.addEventListener('load', init);

// Auto refresh every 30 minutes
setInterval(async () => {
    const weather = await fetchWeather();
    if (weather) displayWeather(weather);
}, 30 * 60 * 1000);
