import './App.css';
import React, { useState } from 'react';
import logo from './assets/logo.png';

const api = {
    key: "39589031fed2ef9a1d52c7de5347bbec",
    base: "https://api.openweathermap.org/data/2.5/",
}

function App() {

  // ACTIONS TO MOVE TO RESULTS SCREEN
  const [home, showHome] = useState(true);
  const [searchNav, showNav] = useState(false);
  const [results, showResults] = useState(false);
  const [error, showError] = useState(false);

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [futureWeather, setFuture] = useState({});

  // Home Button
  const goHome = evt => {
    showHome(true); showNav(false); showResults(false);
  }
  

  // SEARCH FUNCTIONS
  function search() {
    fetch(`${api.base}forecast?q=${query},US&units=imperial&APPID=${api.key}`)
        .then(res =>res.json())
        .then(future => {
          setFuture(future);
        })
      fetch(`${api.base}weather?q=${query},US&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(current => {
        setWeather(current);
        setQuery('');
        showHome(false); showNav(true); showResults(true); showError(false);
      });
  }

  const validate = evt => {
    fetch(`${api.base}forecast?q=${query},US&units=imperial&APPID=${api.key}`)
      .then(function (res) {
        res.json();
        if (res.ok) {
          search();
          showError(false);
        } else {
          showError(true);
        }
    })
  }

  const searchBtn = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}forecast?q=${query},US&units=imperial&APPID=${api.key}`)
      .then(function (res) {
        res.json();
        if (res.ok) {
          search();
        } else {
          showError(true);
        }
    })
    }
  }
  
  // GET DATES
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  } 
  
  return (

    <div className="app">

      {searchNav ? <nav className="navbar justify-content-between">
        <div className="col-3 homeTitle">
          <div onClick={goHome} className="navLogo">
            <img src={logo} alt="logo"/>
            <h2>REACTIVE WEATHER</h2>
          </div>
        </div>
        <div className="navRight col-9 d-flex justify-content-start align-items-center">
          <input
            type="text"
            placeholder="Search by City or Zip Code"
            className="search-bar col-6 text-center"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={searchBtn}
          />
          <button className="searchButton" onClick={validate}><i className="fas fa-search"></i></button>
        </div>
        {error ? <div className="error col-7 d-flex justify-content-center" id="error">
          <span className="errorMsg">
            Error! Location not found. Please enter a US zip code or city name or check your spelling
          </span>
        </div> : null}
      </nav> : null}

      <main className="d-flex justify-content-center align-items-center">

        {/* ------------ */}
        {/* HOME SECTION */}
        {/* ------------ */}
        {home ? <section className="home">

          <div className="container text-center">
            <img src={logo} alt="logo" className="homeLogo"/>
            <h1 className="homeTitle">Reactive Weather</h1>
            
            <input
              type="text"
              placeholder="Search by City or Zip Code"
              className="search-bar col-7 d-block text-center"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={searchBtn}
            />
          
            {error ? <div className="error col-7 d-flex justify-content-center" id="error">
              <span className="errorMsg">
                Error! Location not found. Please enter a US zip code or city name or check your spelling
                </span>
            </div> : null}
              
            <button className="searchButton" onClick={validate}>
              SEARCH
            </button>
          </div>
        </section> : null}
        

        {/* ------------ */}
        {/*RESULTS SECTION*/}
        {/* ------------ */}
        {results ? <section className="results">
          <div className="container-fluid text-center">
            <h2 className="location">{weather.name}, {weather.sys.country}</h2>
            <div className="date">{dateBuilder(new Date())}</div>

            {/* BEGIN CURRENT WEATHER CARD */}
            <div className="card">
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' className='weather-icon'/>
              <div className="card__image currentText w-100">
                <h4>Current</h4>
                <span className="curTemp">{Math.round(weather.main.temp)}&deg;F</span>
                <div className="row">
                  <div className="col-6">
                    <h5>Feels Like</h5>
                    <span className="feels">{Math.round(weather.main.feels_like)}&deg;F</span>
                  </div>
                  <div className="col-6">
                    <h5>Condition</h5>
                    <span className="feels">{weather.weather[0].main}</span>
                  </div>
                </div>
                {/* FIND WEATHER IMAGES FOR SUNNY CLOUDY ETC */}
              </div>
              
              <div className="container card-bottom">

                <div className="row">
                  <div className="col-6">
                    <h5>High</h5>
                    <span>{Math.round(weather.main.temp_max)}&deg;F</span>
                  </div>
                  <div className="col-6">
                    <h5>Low</h5>
                    <span>{Math.round(weather.main.temp_min)}&deg;F</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <h5>Wind Speed</h5>
                    <span>{Math.round(weather.wind.speed)}MPH</span>
                  </div>
                  <div className="col-6">
                    <h5>Wind Direction</h5>
                    <span>{Math.round(weather.wind.deg)}&deg;</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <h5>Humidity</h5>
                    <span>{weather.main.humidity}&#37;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END CURRENT CARD */}

          {/* BEGIN 5 DAY CARD */}
          <div className="dayBanner col-10 m-auto mt-3">
            <div className="row d-flex justify-content-evenly">
              <div className="day col-12 col-md-2">
                <div className="container text-center">
                  <div><h4>Tomorrow</h4></div>
                  <div className="row">
                    <div className="col-4">
                      <h5>High</h5>
                      <span>{Math.round(futureWeather.list[3].main.temp_max)}&deg;F</span>
                    </div>
                    <div className="col-4">
                      <img src={`http://openweathermap.org/img/wn/${futureWeather.list[2].weather[0].icon}@2x.png`} alt='weather icon'/>
                    </div>
                    <div className="col-4">
                      <h5>Low</h5>
                      <span>{Math.round(futureWeather.list[0].main.temp_min)}&deg;F</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="day col-12 col-md-2">
                <div className="container text-center">
                  <div><h4>{futureWeather.list[6].dt_txt.substring(0, 10)}</h4></div>
                  <div className="row">
                    <div className="col-4">
                      <h5>High</h5>
                      <span>{Math.round(futureWeather.list[11].main.temp_max)}&deg;F</span>
                    </div>
                    <div className="col-4">
                      <img src={`http://openweathermap.org/img/wn/${futureWeather.list[10].weather[0].icon}@2x.png`} alt='weather icon'/>
                    </div>
                    <div className="col-4">
                      <h5>Low</h5>
                      <span>{Math.round(futureWeather.list[8].main.temp_min)}&deg;F</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="day col-12 col-md-2">
                <div className="container text-center">
                  <div><h4>{futureWeather.list[14].dt_txt.substring(0, 10)}</h4></div>
                  <div className="row">
                    <div className="col-4">
                      <h5>High</h5>
                      <span>{Math.round(futureWeather.list[19].main.temp_max)}&deg;F</span>
                    </div>
                    <div className="col-4">
                      <img src={`http://openweathermap.org/img/wn/${futureWeather.list[18].weather[0].icon}@2x.png`} alt='weather icon'/>
                    </div>
                    <div className="col-4">
                      <h5>Low</h5>
                      <span>{Math.round(futureWeather.list[16].main.temp_min)}&deg;F</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="day col-12 col-md-2">
                <div className="container text-center">
                  <div><h4>{futureWeather.list[22].dt_txt.substring(0, 10)}</h4></div>
                  <div className="row">
                    <div className="col-4">
                      <h5>High</h5>
                      <span>{Math.round(futureWeather.list[27].main.temp_max)}&deg;F</span>
                    </div>
                    <div className="col-4">
                      <img src={`http://openweathermap.org/img/wn/${futureWeather.list[26].weather[0].icon}@2x.png`} alt='weather icon'/>
                    </div>
                    <div className="col-4">
                      <h5>Low</h5>
                      <span>{Math.round(futureWeather.list[24].main.temp_min)}&deg;F</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="day col-12 col-md-2">
                <div className="container text-center">
                  <div><h4>{futureWeather.list[30].dt_txt.substring(0, 10)}</h4></div>
                  <div className="row">
                    <div className="col-4">
                      <h5>High</h5>
                      <span>{Math.round(futureWeather.list[35].main.temp_max)}&deg;F</span>
                    </div>
                    <div className="col-4">
                      <img src={`http://openweathermap.org/img/wn/${futureWeather.list[34].weather[0].icon}@2x.png`} alt='weather icon'/>
                    </div>
                    <div className="col-4">
                      <h5>Low</h5>
                      <span>{Math.round(futureWeather.list[32].main.temp_min)}&deg;F</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> : null}
      </main>




        {/* ------------ */}
        {/*    FOOTER    */}
        {/* ------------ */}
      <footer className="d-flex justify-content-center align-items-center">
        Created by Charles Miller for educational purposes only.
      </footer>
    </div>
  );
}

export default App;