// Location data
const LOCATION = {
    lat: 35.2526,
    lon: -82.1959,
    name: 'Landrum, SC'
};

// ===== OUTFIT RECOMMENDATION ENGINE =====
const OutfitEngine = {
    getOutfitByTemp: function(temp) {
        if (temp < 32) {
            return {
                emoji: '🧊',
                vibe: 'Freezing',
                outfit: 'Bundle up completely! Heavy winter coat, thermal layers, insulated boots, winter hat, gloves, and scarf. Stay warm!',
                items: ['Heavy Coat', 'Thermal Layers', 'Winter Boots', 'Hat', 'Gloves', 'Scarf', 'Wool Socks'],
                colors: ['Black', 'Navy', 'Gray', 'White'],
                tips: [
                    '❄️ Layer up! Thermal base + insulating middle + wind-proof outer layer',
                    '🧣 Protect extremities - hands, feet, ears, and nose are first to freeze',
                    '🎒 Keep hand warmers or hot beverage in your bag',
                    '⚠️ Watch for black ice when walking'
                ]
            };
        } else if (temp < 45) {
            return {
                emoji: '🧥',
                vibe: 'Cold',
                outfit: 'Jacket weather! Wear a warm sweater or light coat with long sleeves. Jeans and closed-toe shoes recommended.',
                items: ['Jacket', 'Sweater', 'Long Sleeves', 'Jeans', 'Closed-Toe Shoes', 'Light Scarf'],
                colors: ['Navy', 'Charcoal', 'Olive', 'Burgundy'],
                tips: [
                    '🧥 Jacket is essential - choose wool or insulated material',
                    '👖 Long pants are your friend today',
                    '🧦 Keep warm socks handy',
                    '☕ Perfect weather for hot coffee breaks'
                ]
            };
        } else if (temp < 60) {
            return {
                emoji: '👕',
                vibe: 'Cool',
                outfit: 'Light jacket or sweater with long sleeves. Comfortable jeans or chinos work great.',
                items: ['Light Jacket', 'Long Sleeve Shirt', 'Jeans', 'Sneakers', 'Light Sweater'],
                colors: ['Earth Tones', 'Pastels', 'Denim', 'Cream'],
                tips: [
                    '🧥 A cardigan or light jacket is perfect for layering',
                    '👕 Long sleeves recommended',
                    '🚶 Great weather for outdoor activities',
                    '☀️ Sun might still be strong - consider sunglasses'
                ]
            };
        } else if (temp < 75) {
            return {
                emoji: '👖',
                vibe: 'Pleasant',
                outfit: 'T-shirt or short sleeve with jeans or shorts. Light and comfortable!',
                items: ['T-Shirt', 'Shorts', 'Jeans', 'Sneakers', 'Light Layer'],
                colors: ['Bright Colors', 'Pastels', 'White', 'Blue'],
                tips: [
                    '🌞 This is perfect weather - embrace it!',
                    '🕶️ Sunglasses and sunscreen recommended',
                    '💧 Keep a water bottle handy',
                    '🎽 You can wear whatever feels comfortable'
                ]
            };
        } else if (temp < 85) {
            return {
                emoji: '👕',
                vibe: 'Warm',
                outfit: 'Light and breathable! Short sleeves, shorts, light fabric. Sandals are perfect.',
                items: ['T-Shirt', 'Shorts', 'Sandals', 'Light Pants', 'Sunglasses'],
                colors: ['Bright', 'White', 'Pastels', 'Light Blue'],
                tips: [
                    '🌞 Sun protection is important - wear sunscreen SPF 30+',
                    '💦 Stay hydrated - drink plenty of water',
                    '🕶️ Sunglasses are essential',
                    '👒 Consider a hat for outdoor activities'
                ]
            };
        } else {
            return {
                emoji: '🩳',
                vibe: 'Hot',
                outfit: 'Keep it minimal! Lightweight shorts, sleeveless or very light clothing. Stay cool and hydrated!',
                items: ['Shorts', 'Tank Top', 'Sandals', 'Light Dress', 'Cooling Fabrics'],
                colors: ['White', 'Light Colors', 'Pastels', 'Neon'],
                tips: [
                    '☀️ Sunscreen is a MUST - SPF 50+ recommended',
                    '💦 Drink 2x your normal water intake',
                    '🧢 Wide-brimmed hat or cap for sun protection',
                    '💨 Breathable, moisture-wicking fabrics are your friend'
                ]
            };
        }
    },

    getOutfitByConditions: function(temp, humidity, windSpeed, weatherCode) {
        let outfit = this.getOutfitByTemp(temp);
        
        // Adjust for high humidity
        if (humidity > 70) {
            outfit.tips.push('💧 High humidity - choose moisture-wicking fabrics');
        }

        // Adjust for wind
        if (windSpeed > 20) {
            outfit.tips.push(`💨 Wind is strong (${Math.round(windSpeed)} mph) - secure loose clothing/hat`);
            if (!outfit.items.includes('Windbreaker')) {
                outfit.items.push('Windbreaker');
            }
        }

        // Adjust for rain
        if (weatherCode >= 51 && weatherCode <= 82) {
            outfit.tips.push('🌧️ Rain expected - bring umbrella and waterproof jacket');
            if (!outfit.items.includes('Rain Jacket')) {
                outfit.items.unshift('Rain Jacket');
            }
        }

        return outfit;
    }
};

// ===== WEATHER CODE TO EMOJI/DESCRIPTION =====
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

// ===== FETCH WEATHER DATA =====
async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&hourly=temperature_2m,weather_code,precipitation_probability&timezone=America/New_York&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

// ===== FETCH NEWS =====
async function fetchNews() {
    try {
        const response = await fetch(
            'https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt&pageSize=15',
            { headers: { 'X-API-Key': 'demo' } }
        );
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// ===== DISPLAY WEATHER =====
function displayWeather(data) {
    if (!data) return;

    const current = data.current;
    const hourly = data.hourly;
    const daily = data.daily;

    // Update hero section
    document.getElementById('mainWeatherIcon').textContent = getWeatherEmoji(current.weather_code);
    document.getElementById('weatherStatus').textContent = getWeatherDescription(current.weather_code);
    document.getElementById('mainTemp').textContent = Math.round(current.temperature_2m) + '°F';
    document.getElementById('feelsLike').textContent = Math.round(current.apparent_temperature) + '°F';
    document.getElementById('humidity').textContent = current.relative_humidity_2m + '%';
    document.getElementById('wind').textContent = Math.round(current.wind_speed_10m) + ' mph';
    document.getElementById('uv').textContent = '5';

    // Detail cards
    document.getElementById('windDetail').textContent = Math.round(current.wind_speed_10m) + ' mph';
    document.getElementById('windGusts').textContent = Math.round(current.wind_speed_10m * 1.3) + ' mph';
    document.getElementById('humidityDetail').textContent = current.relative_humidity_2m + '%';
    document.getElementById('humidityFill').style.width = current.relative_humidity_2m + '%';
    document.getElementById('pressureDetail').textContent = Math.round(current.pressure_msl) + ' mb';
    document.getElementById('visibilityDetail').textContent = (current.visibility / 1609.34).toFixed(1) + ' mi';

    // Display hourly (every 3 hours)
    displayHourlyForecast(hourly, current.timezone_offset_seconds);

    // Display daily forecast
    displayDailyForecast(daily);

    // Display outfit recommendations
    const outfit = OutfitEngine.getOutfitByConditions(
        current.temperature_2m,
        current.relative_humidity_2m,
        current.wind_speed_10m,
        current.weather_code
    );
    displayOutfit(outfit, current.temperature_2m, getWeatherDescription(current.weather_code));

    // Update timestamp
    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
}

// ===== DISPLAY HOURLY (EVERY 3 HOURS) =====
function displayHourlyForecast(hourly, timezoneOffset) {
    const container = document.getElementById('hourlyForecast');
    container.innerHTML = '';

    const now = new Date();
    const currentHour = now.getHours();

    // Display every 3 hours
    for (let i = 0; i < Math.min(hourly.time.length, 24); i += 3) {
        const temp = Math.round(hourly.temperature_2m[i]);
        const code = hourly.weather_code[i];
        const precip = hourly.precipitation_probability[i] || 0;
        const hour = (currentHour + i) % 24;

        const item = document.createElement('div');
        item.className = 'hourly-item';
        if (i === 0) item.classList.add('active');
        item.innerHTML = `
            <div class="hourly-time">${hour.toString().padStart(2, '0')}:00</div>
            <div class="hourly-icon">${getWeatherEmoji(code)}</div>
            <div class="hourly-temp">${temp}°</div>
            <div class="hourly-rain">💧 ${precip}%</div>
        `;
        container.appendChild(item);
    }
}

// ===== DISPLAY DAILY FORECAST =====
function displayDailyForecast(daily) {
    const container = document.getElementById('forecastGrid');
    container.innerHTML = '';

    for (let i = 0; i < Math.min(7, daily.time.length); i++) {
        const date = new Date(daily.time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
        const high = Math.round(daily.temperature_2m_max[i]);
        const low = Math.round(daily.temperature_2m_min[i]);
        const code = daily.weather_code[i];
        const precip = daily.precipitation_sum[i] || 0;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-date">${monthDay}</div>
            <div class="forecast-icon">${getWeatherEmoji(code)}</div>
            <div class="forecast-temps">
                <span class="forecast-high">${high}°</span>
                <span class="forecast-low">${low}°</span>
            </div>
            <div class="forecast-info">
                ${precip > 0 ? `💧 ${precip.toFixed(2)}"` : 'Dry'}
            </div>
        `;
        container.appendChild(card);
    }

    // Summary
    const avgTemp = Math.round(
        daily.temperature_2m_max.slice(0, 7).reduce((a, b) => a + b) / 7
    );
    const rainyDays = daily.weather_code.slice(0, 7).filter(c => c >= 51).length;
    
    document.getElementById('forecastSummary').innerHTML = `
        <div class="summary-text">
            <p>This week looks <strong>${avgTemp > 75 ? 'warm' : avgTemp > 50 ? 'mild' : 'cool'}</strong> with an average high of <strong>${avgTemp}°F</strong>. 
            Expect <strong>${rainyDays}</strong> day${rainyDays !== 1 ? 's' : ''} of rain throughout the week.</p>
        </div>
    `;
}

// ===== DISPLAY OUTFIT =====
function displayOutfit(outfit, temp, condition) {
    const tempColor = temp < 32 ? 'cold' : temp < 50 ? 'cool' : temp < 75 ? 'mild' : temp < 85 ? 'warm' : 'hot';
    
    document.getElementById('outfitTemp').textContent = Math.round(temp) + '°F';
    document.getElementById('outfitCondition').textContent = condition;

    const outfitCard = document.getElementById('outfitCard');
    outfitCard.innerHTML = `
        <div class="outfit-main">
            <div class="outfit-emoji">${outfit.emoji}</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">${outfit.vibe} Weather</h3>
            <p class="outfit-description">${outfit.outfit}</p>
        </div>
    `;

    // Items
    const itemsContainer = document.getElementById('outfitItems');
    itemsContainer.innerHTML = outfit.items.map(item => `
        <div class="item-badge">
            <div class="item-icon">${getItemEmoji(item)}</div>
            <div class="item-name">${item}</div>
        </div>
    `).join('');

    // Tips
    const tipsContainer = document.getElementById('outfitTips');
    tipsContainer.innerHTML = outfit.tips.map(tip => `
        <div class="tip-item">
            <div class="tip-text">${tip}</div>
        </div>
    `).join('');
}

// ===== ITEM EMOJI MAP =====
function getItemEmoji(item) {
    const emojiMap = {
        'Heavy Coat': '🧥',
        'Thermal Layers': '🩱',
        'Winter Boots': '🥾',
        'Hat': '🎩',
        'Gloves': '🧤',
        'Scarf': '🧣',
        'Wool Socks': '🧦',
        'Jacket': '🧥',
        'Sweater': '🧶',
        'Long Sleeves': '👕',
        'Jeans': '👖',
        'Closed-Toe Shoes': '👟',
        'Light Scarf': '🧣',
        'Light Jacket': '🧥',
        'T-Shirt': '👕',
        'Shorts': '🩳',
        'Sneakers': '👟',
        'Light Layer': '👕',
        'Light Pants': '👖',
        'Sandals': '👡',
        'Sunglasses': '🕶️',
        'Tank Top': '🏃',
        'Light Dress': '👗',
        'Cooling Fabrics': '🧵',
        'Windbreaker': '🧥',
        'Rain Jacket': '🌧️',
    };
    return emojiMap[item] || '👕';
}

// ===== DISPLAY NEWS =====
function displayNews(articles) {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    if (articles.length === 0) {
        container.innerHTML = '<div class="loading-spinner">No news available</div>';
        return;
    }

    articles.slice(0, 10).forEach(article => {
        const date = new Date(article.publishedAt);
        const timeAgo = getTimeAgo(date);

        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
            <div class="news-title">${article.title}</div>
            <div class="news-meta">
                <span class="news-source">${article.source?.name || 'News'}</span>
                <span class="news-date">${timeAgo}</span>
            </div>
            <div class="news-description">${article.description || 'Click to read more...'}</div>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">Read Full Story →</a>
        `;
        container.appendChild(item);
    });
}

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
        if (interval >= 1) return `${interval}${key[0]} ago`;
    }
    return 'just now';
}

// ===== PAGE NAVIGATION =====
function navigateTo(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    // Show selected page
    document.getElementById(pageName + '-page').classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark-theme');
    }
}

// ===== EVENT LISTENERS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        navigateTo(e.target.dataset.page);
    });
});

document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

document.querySelector('.refresh-btn').addEventListener('click', async () => {
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
}

window.addEventListener('load', init);

// Auto-refresh every 30 minutes
setInterval(async () => {
    const weather = await fetchWeather();
    if (weather) displayWeather(weather);
}, 30 * 60 * 1000);

// Update timestamp every minute
setInterval(() => {
    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
}, 60000);
