document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = document.querySelector("input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim() || "Delhi";

    try {
      const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      document.querySelector(".location").textContent = data.location;
      document.querySelector(".temperature").textContent = data.temp + "°";
      document.querySelector(".status").textContent = data.condition;

      document.querySelector(".feelslike").textContent = `Feels Like: ${data.feelslike}°C`;
      document.querySelector(".humidity").textContent = `Humidity: ${data.humidity}%`;
      document.querySelector(".wind").textContent = `Wind: ${data.wind} kph`;
      document.querySelector(".uv").textContent = `UV Index: ${data.uv}`;

      // Set background
      const bgImage = getBackgroundImage(data.condition);
      document.body.style.backgroundImage = `url('${bgImage}')`;

    } catch (err) {
      alert("Failed to fetch weather. Check console.");
      console.error(err);
    }
  });
});

// Background image function
function getBackgroundImage(condition) {
  const conditionMap = {
    Clear: 'sunny.png',
    Clouds: 'cloudy.png',
    Rain: 'rainy.png',
    Snow: 'snow.png',
    Thunderstorm: 'storm.png',
    Mist: 'mist.png',
    Haze: 'haze.png',
    Fog: 'fog.png',
    Drizzle: 'drizzle.png',
    Night: 'night.png'
  };

  const key = Object.keys(conditionMap).find(k => condition.toLowerCase().includes(k.toLowerCase()));
  return `/images/${conditionMap[key] || 'sunny.png'}`;
}
