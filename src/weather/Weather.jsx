import './weather.css';
import React, { useState } from 'react';

import location from './image/point.png';
import search from './image/search.png';
import wind from "./image/wind.png";
import temp from "./image/thermometer.png"

import broken_clouds from './image/weather/broken clouds.png';
import clear_sky from './image/weather/clear_sky.png';
import few_cloud from './image/weather/few_cloud.png';
import mist from './image/weather/mist.png';
import rain from './image/weather/rain.png';
import scattered_clouds from './image/weather/scattered clouds.png';
import shower_rain from './image/weather/shower rain.png';
import snow from './image/weather/snow.png';
import thunderstorm from './image/weather/thunderstorm.png';

const Weather = () => {
    const [value, setValue] = useState('');
    const [active, setActive] = useState(false);
    const key = 'e033209650fa0b14f48a756ffa9a2928';
    const [elem, setElem] = useState('');
    let icon_weather;

    function creatImg (data) {
      if (data === 'Clear') {
        icon_weather = clear_sky
      }
      if (data === 'Clouds') {
        icon_weather = broken_clouds;
      }
      if (data === 'Thunderstorm') {
        icon_weather = thunderstorm;
      }
      if (data === 'Haze' | data === 'Mist') {
        icon_weather = mist;
      }
      if (data === 'Rain') {
        icon_weather = shower_rain;
      }
      if (data === 'Drizzle') {
        icon_weather = rain;
      }
      if (data === 'Snow') {
        icon_weather = snow;
      }
    }


    function searchCity (value) {
        if (value === '') {
            setActive(false);
            setElem('');
        }else if (value !== '') {
            setActive(true);

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.cod === '404') {
            setTimeout(() => {
              setElem('not found')
            },1000);
          } else {
          setTimeout(() =>{
            console.log(data.weather[0].main);
            creatImg(data.weather[0].main);
            setElem(<><div className='weather'>
              <div><img src={icon_weather} alt="weather" /></div>
              <div className='temp_wind'>
                <img src={wind} alt="wind" />
                <span>{data.wind.speed}</span>
                <img src={temp} alt="temp" /><span>{Math.round(+(data.main.temp) - 273.15)}</span>
              </div>
            </div>
              </>)
          },1000);
        }
        });
      }
    }
  


    return (
    <div className='container'>
       <div className={active? 'seach_menu active' : 'seach_menu'}>
        <div className='menu'>
        <span><img src={location} alt="location" /></span>
        <input placeholder='Введите название города' type="text" value={value} onChange={(event) => setValue(event.target.value)}></input>
        <button onClick={() => searchCity(value)}><img src={search} alt="search" /></button></div>
        <div className={active? 'location_menu active' : 'location_menu'}>
          {elem}
        </div>
       </div>
    </div>);
}

export default Weather;