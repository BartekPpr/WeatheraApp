import React from 'react'
import '../css/ForecastCard.css'
import { useEffect, useState, useRef } from 'react'
import clear from '../assets/clear.svg'
import drizzle from '../assets/drizzle.svg'
import humidity from '../assets/humidity.svg'
import partly_cloudy from '../assets/partly-cloudy.svg'
import rain from '../assets/rain.svg'
import snow from '../assets/snow.svg'
import wind from '../assets/wind.svg'
import search_icon from '../assets/search.png'

function ForecastCard() {
    
    const [errMessage, seterrMessage] = useState('')
    const inputRef= useRef()
    const [weatherData, setweatherData] = useState(false)
    const icons = {
        '01d': clear,
        '01n': clear,
        '02d': partly_cloudy,
        '02n': partly_cloudy,
        '03d': partly_cloudy,
        '03n': partly_cloudy,
        '04d': drizzle,
        '04n': drizzle,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '13d': snow,
        '13n': snow
    }

    const search = async (city) => {
        
        try{
            if(city.trim() === '' ){
            seterrMessage('Enter City Name')
            return
        } seterrMessage('')
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
            const response = await fetch(url)
            if(!response.ok){
            seterrMessage('Incorrect City Name')
            return
            } seterrMessage('')

            const data = await response.json()
            
            const icon = icons[data.weather[0].icon] || clear

            setweatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch(error) {
            setweatherData(false)
        }
    }

    return (

    <div className="forecast-card">
        <h1>Weather Forecast</h1>
       {errMessage && <p className="errMessage">{errMessage}</p>}
        
        <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} className='search_icon'/>
        </div>

        {weatherData? <>

        <p className='location'>{weatherData.location.toUpperCase()}</p>
        <img src={weatherData.icon} alt="weather icon" className='weather_icon'/>
        <p className='temp'>{weatherData.temp}°C</p>
        
        <div className="weather-data">
            
            <div className="data">
                <img src={humidity} alt="humidity icon" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="data">
                <img src={wind} alt="wind icon" />
                <div>
                    <p>{weatherData.wind}km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
            
        </div>
        </>:<></>}


    </div>
    )
}


export default ForecastCard