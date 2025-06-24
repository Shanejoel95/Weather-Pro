 // Weather API Configuration
        const API_KEY = 'c8e2d87dfffb48d7a41153534252306';
        const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

        // DOM Elements
        const locationInput = document.getElementById('locationInput');
        const searchBtn = document.getElementById('searchBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const errorMessage = document.getElementById('errorMessage');
        const weatherData = document.getElementById('weatherData');
        const weatherBg = document.getElementById('weatherBg');
        const timeDisplay = document.getElementById('timeDisplay');

        // Weather data elements
        const locationEl = document.getElementById('location');
        const weatherIcon = document.getElementById('weatherIcon');
        const temperature = document.getElementById('temperature');
        const feelsLike = document.getElementById('feelsLike');
        const condition = document.getElementById('condition');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');
        const uvIndex = document.getElementById('uvIndex');
        const visibility = document.getElementById('visibility');
        const pressure = document.getElementById('pressure');
        const localTime = document.getElementById('localTime');

        let currentLocation = 'Colombo';

        // Enhanced weather condition mappings
        const weatherConditions = {
            'sunny': { icon: '☀️', bg: 'sunny' },
            'clear': { icon: '🌙', bg: 'clear' },
            'partly cloudy': { icon: '⛅', bg: 'cloudy' },
            'cloudy': { icon: '☁️', bg: 'cloudy' },
            'overcast': { icon: '☁️', bg: 'cloudy' },
            'mist': { icon: '🌫️', bg: 'cloudy' },
            'fog': { icon: '🌫️', bg: 'cloudy' },
            'freezing fog': { icon: '🌫️', bg: 'cloudy' },
            'patchy rain possible': { icon: '🌦️', bg: 'rainy' },
            'light rain': { icon: '🌦️', bg: 'rainy' },
            'moderate rain': { icon: '🌧️', bg: 'rainy' },
            'heavy rain': { icon: '🌧️', bg: 'rainy' },
            'light rain shower': { icon: '🌦️', bg: 'rainy' },
            'moderate or heavy rain shower': { icon: '🌧️', bg: 'rainy' },
            'torrential rain shower': { icon: '🌧️', bg: 'rainy' },
            'patchy snow possible': { icon: '🌨️', bg: 'snowy' },
            'light snow': { icon: '🌨️', bg: 'snowy' },
            'moderate snow': { icon: '❄️', bg: 'snowy' },
            'heavy snow': { icon: '❄️', bg: 'snowy' },
            'blizzard': { icon: '🌨️', bg: 'snowy' },
            'thundery outbreaks possible': { icon: '⛈️', bg: 'thunder' },
            'patchy light rain with thunder': { icon: '⛈️', bg: 'thunder' },
            'moderate or heavy rain with thunder': { icon: '⛈️', bg: 'thunder' },
            'patchy light snow with thunder': { icon: '⛈️', bg: 'thunder' },
            'moderate or heavy snow with thunder': { icon: '⛈️', bg: 'thunder' }
        };

        // Update time display
        function updateTimeDisplay() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            timeDisplay.textContent = now.toLocaleDateString('en-US', options);
        }

        // Show/Hide elements
        function showLoading() {
            loading.classList.add('show');
            error.classList.remove('show');
            weatherData.style.display = 'none';
        }

        function hideLoading() {
            loading.classList.remove('show');
        }

        function showError(message) {
            hideLoading();
            errorMessage.textContent = message;
            error.classList.add('show');
            weatherData.style.display = 'none';
        }

        function showWeatherData() {
            hideLoading();
            error.classList.remove('show');
            weatherData.style.display = 'block';
        }

        // Enhanced animation creation functions
        function createRainDrops() {
            const rainContainer = document.createElement('div');
            for (let i = 0; i < 150; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.height = (Math.random() * 30 + 15) + 'px';
                drop.style.animationDelay = Math.random() * 2 + 's';
                drop.style.animationDuration = (Math.random() * 0.5 + 0.4) + 's';
                rainContainer.appendChild(drop);
            }
            
            // Add puddles
            for (let i = 0; i < 5; i++) {
                const puddle = document.createElement('div');
                puddle.className = 'puddle';
                puddle.style.left = Math.random() * 90 + '%';
                puddle.style.animationDelay = Math.random() * 2 + 's';
                rainContainer.appendChild(puddle);
            }
            
            return rainContainer;
        }

        function createSnowflakes() {
            const snowContainer = document.createElement('div');
            const snowflakes = ['❄', '❅', '❆', '✻', '✼', '❋'];
            for (let i = 0; i < 80; i++) {
                const flake = document.createElement('div');
                flake.className = 'snowflake';
                flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
                flake.style.left = Math.random() * 100 + '%';
                flake.style.fontSize = (Math.random() * 15 + 15) + 'px';
                flake.style.animationDelay = Math.random() * 3 + 's';
                flake.style.animationDuration = (Math.random() * 3 + 3) + 's';
                snowContainer.appendChild(flake);
            }
            return snowContainer;
        }

       function createClouds() {
  const cloudContainer = document.createElement('div');
  cloudContainer.className = 'cloud-container'; // for styling if needed

  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    
    const width = Math.random() * 120 + 100;
    const height = Math.random() * 60 + 50;

    cloud.style.width = width + 'px';
    cloud.style.height = height + 'px';
    cloud.style.top = (Math.random() * 60 + 10) + 'vh';
    cloud.style.left = '-' + (Math.random() * 200 + 100) + 'px';
    cloud.style.animationDelay = Math.random() * 5 + 's';
    cloud.style.animationDuration = (Math.random() * 20 + 30) + 's';
    cloud.style.opacity = (Math.random() * 0.3 + 0.7).toFixed(2); // more transparency variety
    cloud.style.zIndex = Math.floor(Math.random() * 3) + 1;

    cloud.style.setProperty('--before-width', (width * 0.6) + 'px');
    cloud.style.setProperty('--before-height', (height * 0.6) + 'px');
    cloud.style.setProperty('--after-width', (width * 0.8) + 'px');
    cloud.style.setProperty('--after-height', (height * 0.5) + 'px');

    cloudContainer.appendChild(cloud);
  }

  return cloudContainer;
}

        function createSun() {
            const sun = document.createElement('div');
            sun.className = 'sun';
            return sun;
        }

        function createLightning() {
            const lightning = document.createElement('div');
            lightning.className = 'lightning';
            lightning.style.left = (Math.random() * 60 + 20) + '%';
            return lightning;
        }

        // Enhanced weather background update
        function updateWeatherBackground(conditionText) {
            weatherBg.innerHTML = '';
            weatherBg.className = 'weather-bg';

            const condition = conditionText.toLowerCase();
            
            if (condition.includes('rain') || condition.includes('drizzle')) {
                weatherBg.classList.add('rainy-bg');
                weatherBg.appendChild(createRainDrops());
                weatherBg.appendChild(createClouds());
            } else if (condition.includes('snow') || condition.includes('blizzard')) {
                weatherBg.classList.add('snowy-bg');
                weatherBg.appendChild(createSnowflakes());
            } else if (condition.includes('thunder') || condition.includes('storm')) {
                weatherBg.classList.add('thunder-bg');
                weatherBg.appendChild(createRainDrops());
                weatherBg.appendChild(createClouds());
                weatherBg.appendChild(createLightning());
            } else if (condition.includes('cloud') || condition.includes('overcast')) {
                weatherBg.classList.add('cloudy-bg');
                weatherBg.appendChild(createClouds());
            } else if (condition.includes('sunny') || condition.includes('clear')) {
                weatherBg.classList.add('sunny-bg');
                weatherBg.appendChild(createSun());
            } else {
                weatherBg.classList.add('cloudy-bg');
                weatherBg.appendChild(createClouds());
            }
        }

        function getWeatherIcon(conditionText) {
            const condition = conditionText.toLowerCase();
            
            for (const [key, value] of Object.entries(weatherConditions)) {
                if (condition.includes(key)) {
                    return value.icon;
                }
            }
            
            return '🌤️';
        }

        // Enhanced fetch weather data function
        async function fetchWeatherData(location) {
            showLoading();
            currentLocation = location;

            try {
                const url = `${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('🌍 Location not found. Please enter a valid city name.');
                    } else if (response.status === 401) {
                        throw new Error('🔑 Invalid API key. Please check your WeatherAPI configuration.');
                    } else if (response.status === 403) {
                        throw new Error('⚠️ API key exceeded quota or access denied.');
                    } else {
                        throw new Error(`🌐 Weather service error: ${response.status}`);
                    }
                }

                const data = await response.json();
                
                if (!data.current || !data.location) {
                    throw new Error('❌ Invalid response from weather service.');
                }
                
                displayWeatherData(data);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                if (err.message.includes('fetch')) {
                    showError('🌐 Network error. Please check your internet connection and try again.');
                } else {
                    showError(err.message);
                }
            }
        }

        // Enhanced display weather data function
        function displayWeatherData(data) {
            const { location: loc, current } = data;

            // Location and time information
            locationEl.textContent = `${loc.name}, ${loc.region}, ${loc.country}`;
            localTime.textContent = new Date(loc.localtime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            
            // Current weather data
            temperature.textContent = `${Math.round(current.temp_c)}°C`;
            feelsLike.textContent = `Feels like ${Math.round(current.feelslike_c)}°C`;
            condition.textContent = current.condition.text;
            
            // Weather details with enhanced formatting
            humidity.textContent = `${current.humidity}%`;
            windSpeed.textContent = `${current.wind_kph} km/h`;
            uvIndex.textContent = getUVIndexDescription(current.uv);
            visibility.textContent = `${current.vis_km} km`;
            pressure.textContent = `${current.pressure_mb} mb`;

            // Update weather icon
            weatherIcon.textContent = getWeatherIcon(current.condition.text);

            // Update background animation
            updateWeatherBackground(current.condition.text);

            // Update input field
            locationInput.value = loc.name;

            // Update time display
            updateTimeDisplay();

            console.log('Weather Data Updated:', {
                location: `${loc.name}, ${loc.country}`,
                temperature: `${current.temp_c}°C`,
                condition: current.condition.text,
                humidity: `${current.humidity}%`,
                windSpeed: `${current.wind_kph} km/h`,
                uvIndex: current.uv,
                localTime: loc.localtime
            });

            showWeatherData();
        }

        // Helper function for UV Index description
        function getUVIndexDescription(uv) {
            if (uv <= 2) return `${uv} Low`;
            if (uv <= 5) return `${uv} Moderate`;
            if (uv <= 7) return `${uv} High`;
            if (uv <= 10) return `${uv} Very High`;
            return `${uv} Extreme`;
        }

        // Auto-refresh functionality
        function startAutoRefresh() {
            setInterval(() => {
                if (currentLocation && weatherData.style.display !== 'none') {
                    fetchWeatherData(currentLocation);
                }
            }, 300000); // Refresh every 5 minutes
        }

        // Enhanced event listeners
        searchBtn.addEventListener('click', () => {
            const location = locationInput.value.trim();
            if (location) {
                fetchWeatherData(location);
            }
        });

        locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const location = locationInput.value.trim();
                if (location) {
                    fetchWeatherData(location);
                }
            }
        });

        // Enhanced refresh button functionality
        refreshBtn.addEventListener('click', () => {
            if (currentLocation) {
                fetchWeatherData(currentLocation);
            }
        });

        // Geolocation functionality
        function getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        fetchWeatherData(`${lat},${lon}`);
                    },
                    (error) => {
                        console.log('Geolocation error:', error);
                        fetchWeatherData('Colombo'); // Fallback to Colombo
                    }
                );
            } else {
                fetchWeatherData('Colombo'); // Fallback if geolocation not supported
            }
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                if (currentLocation) {
                    fetchWeatherData(currentLocation);
                }
            }
            if (e.key === 'Escape') {
                locationInput.blur();
            }
        });

        // Enhanced input focus behavior
        locationInput.addEventListener('focus', () => {
            locationInput.select();
        });

        // Initialize the application
        function initializeApp() {
            updateTimeDisplay();
            startAutoRefresh();
            
            // Try to get user's location, fallback to Colombo
            if (navigator.geolocation) {
                showLoading();
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        fetchWeatherData(`${lat},${lon}`);
                    },
                    (error) => {
                        console.log('Geolocation not available, using default location');
                        fetchWeatherData('Colombo');
                    },
                    { timeout: 5000 }
                );
            } else {
                fetchWeatherData('Colombo');
            }
        }

        // Update time every minute
        setInterval(updateTimeDisplay, 60000);

        // Initialize the app when page loads
        window.addEventListener('load', initializeApp);

        // Handle page visibility changes for auto-refresh
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && currentLocation) {
                fetchWeatherData(currentLocation);
            }
        });