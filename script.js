console.log("works");

const weatherFormElement= document.querySelector(".weather");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "2d4715fe816333c66397ec1701d7dbd4";
const thunderstorm="https://lottie.host/89070fee-b5f9-4c94-a2df-3d8dfa480dbf/0KfXXdplFS.json"
const drizzle = "https://lottie.host/d69baa60-2e39-44a9-ac21-ba0a665c7a7d/cz4eUaeDt5.json";
const rain = "https://lottie.host/c3c7f3bc-ef8d-49af-acc2-cf172cdfad12/uuC80fOefe.json";
const snow = "https://lottie.host/8778d189-30f0-41a1-9288-3c47dad35bad/NdP33D0klM.json";
const atmosphere = "https://lottie.host/56c10a14-214d-4b14-b6db-f413de694b9a/5PvqYpC3dc.json";
const sunny = "https://lottie.host/7a7ccf6c-c544-4c5e-ba77-d5e25d385a60/KRDNLDq96d.json";
const cloudy = "https://lottie.host/dd22c115-fbc6-4b13-9195-20e3faa09b97/BMQQXM4K6R.json";
const unknown = "./img/404-error.png";

weatherFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;
  
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError("City not found");
    }
      finally
      {
        cityInput.value=""        
      }
    }
   else {
    displayError("Please enter a city");
  }
});
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log(apiUrl);
  const response = await fetch(apiUrl);
  console.log(response);
  if (!response) {
    throw new Error("City not found");
  }
  return await response.json();
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
 
  card.textContent=""
 card.style.justifyContent = "center";
 card.style.alignItems = "center";
 card.style.display="flex"
 card.style.flexDirection="column"

 


  const cityDisplay=document.createElement("h2")
  const tempDisplay=document.createElement("p")
  const humid=document.createElement("p")
  const desc=document.createElement("p")
  const weatherSign = document.createElement('dotlottie-player');
  
  cityDisplay.textContent=city;
  tempDisplay.textContent=`${(temp - 273.15).toFixed(1)}°C`;
  humid.textContent=`Humidity: ${humidity}%`;
  desc.textContent=description;
  weatherSign.textContent=weatherEmoji(id);

  cityDisplay.className = "text-2xl font-bold text-gray-800 mt-8";
  tempDisplay.className = "text-xl text-blue-600  ";
  humid.className = "text-md text-gray-700";
  desc.className = "text-md text-gray-600 "; 

weatherSign.setAttribute('src', weatherEmoji(data.weather[0].id)); // Assuming id is passed correctly
weatherSign.setAttribute('background', 'transparent');
weatherSign.setAttribute('speed', '1');
weatherSign.setAttribute('loop', '');
weatherSign.setAttribute('autoplay', '');
weatherSign.style.width = '300px';
weatherSign.style.height = '300px';

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humid);
  card.appendChild(desc);
  card.appendChild(weatherSign);
  card.classList.remove("hidden");
  

}

function weatherEmoji(weatherID) {
  switch (true) {
    
    case (weatherID>=200&&weatherID<300):
      return thunderstorm ;
    case (weatherID>=300&&weatherID<400):
      return  drizzle;
    case (weatherID>=500&&weatherID<600):
      return  rain;
    case (weatherID>=600&&weatherID<700):
      return snow ;
    case (weatherID>=700&&weatherID<800):
      return atmosphere ;
      case (weatherID===800):
        return sunny;
        case (weatherID>=801&&weatherID<810):
      return cloudy;
     
      default:
        return unknown;
  }

}



function displayError(message) {
  card.textContent = ""; // Clear previous contents or errors

  // Create an image element and set its source
  const errorImage = document.createElement("img");
  errorImage.src = "./img/404-error.png"; // Replace with your image path
  errorImage.alt = "Error"; // Alt text for accessibility
  errorImage.style.width = "40vw"; // Optional: set image size
  errorImage.style.height = "45vh"; // Optional: set image size

  // Create a paragraph for the error message
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.className="text-red-500 text-3xl text-bold mt-5"

  // Modify card display properties
  card.classList.remove("hidden");
  card.style.display = "flex";
  card.style.flexDirection = "column"; // Align items vertically
  card.style.alignItems = "center"; // Center items horizontally
  card.style.justifyContent = "center"; // Center items vertically

  // Append the image and the paragraph to the card
  card.appendChild(errorDisplay);
  card.appendChild(errorImage);
}

  

 



