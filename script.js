function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById("datetime").textContent = now.toLocaleDateString('en-US', options);
}

// Call the function on page load
updateDateTime();

// Update the time every 60 seconds
setInterval(updateDateTime, 60000);

async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "c8304b20864268d0268f32cc5ae8dd5f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data); // Debugging

        if (data.cod === 200) {
            const weatherIcon = data.weather[0].icon;
            console.log("Weather Icon Code:", weatherIcon); // Debugging

            document.getElementById("weather").innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png?random=${Math.random()}" 
                     alt="Weather Icon" 
                     onerror="this.onerror=null; this.src='fallback-image.png';">
            `;
        } else {
            document.getElementById("weather").innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather").innerHTML = `<p>Error fetching data.</p>`;
    }
}