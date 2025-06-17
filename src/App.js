// import rainbowicon from './images/rainbow.webp';
 import cloudicon from './images/cloudy.webp';
 import clearicon from './images/sunny1.webp';
// import fogy1icon from './images/fogy1.webp';
// import fogy2icon from './images/fogy2.webp';
// import lightningicon from './images/lightning.gif';
// import nightcloudy1icon from './images/night-cloudy1.webp';
// import nightmoonicon from './images/night-moon.webp';
// import partiallycloudy1icon from './images/partially-cloudy1.webp';
// import partiallycloudy2icon from './images/partially-cloudy2.webp';
// import partiallycloudy3icon from './images/partial-cloudy3.webp';
import rainyicon from './images/rainy.webp';
// import snow1icon from './images/snow1.gif';
import snowicon from './images/snow2.webp';
import drizzleicon from './images/storm.gif';
// import thunderstormicon from './images/Thunderstorm.webp';
// import fogy2icon from './images/fogy2.webp';
import searchglassicon from './images/magnifying-glass.gif';
import windspeedicon from './images/wind-speed.gif';
import humidityicon from './images/humidity.gif';
import './App.css';
/* The following line can be included in your src/index.js or App.js file */
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import Stack from 'react-bootstrap/Stack';

import { useState } from 'react';

const Weatherdetails=({icon,temp,city,country,latitude,longitude,humidity,wind})=>{
  return(
      <>
    <div className="container px-3">
        <img src={icon} className="img-fluid rounded" alt="img" id="season"></img>
      <div className="col-lg-12" id="mainreport">
        <ul className="list-inline" id="main">
          <li className="h4" id="deg">{temp}°C</li>
          <li className="h3" id="city">{city}</li>
          <li className="h4" id="country">{country}</li>
        </ul>
      </div>
    </div>
    <div className="container" id="secondpart">
      <div className="row">
        <div className="col-lg-6">
          <ul className="list-inline">
          <li>latitude</li>
          <li>{latitude}</li>
          </ul>
          </div>
        <div className="col-lg-6">
          <ul className="list-inline">
          <li>longitude</li>
          <li>{longitude}</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container" id="thirdpart">
      <div className="row">
        <div className="col-lg-6">
          <img src={windspeedicon} alt="img"></img>
          {wind} km/h
        </div>
        <div className="col-lg-6">
          <img src={humidityicon} alt="img"></img> 
          {humidity}%
        </div>
      </div>
      </div>
  </>
  );
};



function App() {
    let api_key="3bc6c3a18431c04518ed3171bb0613d8";

  const [text,setText]=useState("Karur");
  const [icon,setIcon]=useState(rainyicon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("karur");
  const [country,setCountry]=useState("IN");
  const [latitude,setLatitude]=useState("22.5");
  const [longitude,setLongitude]=useState("5.2");
  const [humidity,setHumidity]=useState("0");
  const [wind,setWind]=useState("0");

  const [cityNotfound,setcityNotfound]=useState(false);
  const [loading,setloading]=useState(false);
  const [error,setError]=useState(null);

  const WeatherIconMap={
    "01d":clearicon,
    "01n":clearicon,
    "02d":cloudicon,
    "02n":cloudicon,
    "03d":drizzleicon,
    "03n":drizzleicon,
    "04d":cloudicon,
    "04n":cloudicon,
    "09d":rainyicon,
    "09n":rainyicon,
    "010d":rainyicon,
    "010n":rainyicon,
    "013d":snowicon,
    "013n":snowicon,
  };

const search = async () =>{
  setloading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
  try{
    let res = await fetch(url);
    let data = await res.json();
    //console.log(data);
    if(data.cod === "404"){
      console.error("city not found");
      setcityNotfound(true);
      setloading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLatitude(data.coord.lat);
    setLongitude(data.coord.lon);
    const WeatherIconCode = data.weather[0].icon;
    setIcon(WeatherIconMap[WeatherIconCode] || clearicon);
    setcityNotfound(false);
  }catch(error){
    console.error("an error occured",error.message)
    setError("an error found while fetching data")
  }finally{
    setloading(false)
    console.log("end")
  }
}

const cityChange=(e)=>{
  setText(e.target.value);
};

const pressenter=(e)=>{
  if(e.key==="Enter"){
    search();
  }
};

  return (
    <>
     <div className="body">
      <div className="h1" id="title">WEATHER APP</div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12" >
            <input type="text" placeholder="Enter the city name"
             id="seachinput" onChange={cityChange} value={text} onKeyDown={pressenter}></input>
          </div>
          <div className="col" onClick={()=>search()}>
            <img src={searchglassicon} alt="img" id="searchglass"></img>
          </div>
        </div>
      </div>
      {!loading && !cityNotfound && <Weatherdetails icon={icon} temp={temp} 
      city={city} country={country} latitude={latitude}
      longitude={longitude} humidity={humidity} wind={wind}/>}
      {loading && <div className="loading-message">loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotfound && <div className="city-not-found">city not found</div>}
      <div id="madeby"> made by Tamil prabaharan</div>
     </div>
    </>
  );
}

export default App;
