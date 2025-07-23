const apikey="e1cabe37659a7e3fadd17072eab98660";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const messageBox = document.querySelector(".message");

async function checkweather(city) {
  const response=await fetch(apiurl + city +`&appid=${apikey}`);
  
  if(response.status==404){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
  }else{
    var data=await response.json();

  

  document.querySelector(".city").innerHTML=data.name;
  document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+'°C';
  document.querySelector(".humidity").innerHTML=data.main.humidity+'%';
  document.querySelector(".wind").innerHTML=data.wind.speed+"Kmph";

  if(data.weather[0].main=="Clouds"){
    weatherIcon.src="images/clouds.png";
  }
  else if(data.weather[0].main=="Clear"){
    weatherIcon.src="images/clear.png";
  }
  else if(data.weather[0].main=="Rain"){
    weatherIcon.src="images/rain.png";
  }
  else if(data.weather[0].main=="Drizzle"){
    weatherIcon.src="images/drizzle.png";
  }
  else if(data.weather[0].main=="Mist"){
    weatherIcon.src="images/mist.png";
  }

  document.querySelector(".weather").style.display="block";
  document.querySelector(".error").style.display="none";
 
  }
  
  
}
  
 searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkweather(city);
  } else {
    messageBox.textContent = "Please enter a city name.";
  }
});


searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    messageBox.textContent = "";
    checkweather(city);
  } else {
    messageBox.textContent = "Please enter a city name.";
    document.querySelector(".weather").style.display = "none";  // Hide old data
    document.querySelector(".error").style.display = "none";    // Also hide error if any
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) {
      messageBox.textContent = "";
      checkweather(city);
    } else {
      messageBox.textContent = "Please enter a city name.";
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".error").style.display = "none";
    }
  }
});



