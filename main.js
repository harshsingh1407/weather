const weatherbtn = document.getElementById("weather-btn");
weatherbtn.addEventListener("click", async function getWeather(event) {
    event.preventDefault(); 
    const city = document.getElementById("weather-input").value.trim();
    const weatherInfoDiv = document.getElementById("weather-info");

    if (!city) {
      weatherInfoDiv.innerHTML = '<p class="placeholder-text">Please enter a city name.</p>';
      return;
    }

    weatherInfoDiv.innerHTML = '<p class="placeholder-text">Fetching weather data...</p>';

    const apiKey = "6324f53ed38d4d59b48133646251304"; 
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      weatherInfoDiv.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <div class="temp">${data.current.temp_c}°C</div>
        <div class="condition-text">${data.current.condition.text}</div>
        
        <div class="info">
          <div><i class="fas fa-temperature-half info-icon"></i><strong>Feels Like:</strong><span>${data.current.feelslike_c}°C</span></div>
          <div><i class="fas fa-tint info-icon"></i><strong>Humidity:</strong><span>${data.current.humidity}%</span></div>
          <div><i class="fas fa-wind info-icon"></i><strong>Wind:</strong><span>${data.current.wind_kph} kph</span></div>
          <div><i class="fas fa-tachometer-alt info-icon"></i><strong>Pressure:</strong><span>${data.current.pressure_mb} mb</span></div>
          <div><i class="fas fa-eye info-icon"></i><strong>Visibility:</strong><span>${data.current.vis_km} km</span></div>
          <div><i class="fas fa-sun info-icon"></i><strong>UV Index:</strong><span>${data.current.uv}</span></div>
          <div><i class="fas fa-smog info-icon"></i><strong>PM2.5:</strong><span>${data.current.air_quality["pm2_5"].toFixed(1)}</span></div>
          <div><i class="fas fa-clock info-icon"></i><strong>Local Time:</strong><span>${data.location.localtime.split(' ')[1]}</span></div>
        </div>
      `;
    } catch (error) {
      weatherInfoDiv.innerHTML = '<p class="placeholder-text">City not found. Please try again.</p>';
      console.error("Error fetching weather data:", error);
    }
});