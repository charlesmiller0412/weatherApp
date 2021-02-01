import './App.css';
import React, { useState } from 'react';
const api = {
    // key: "",
    base: "https://api.openweathermap.org/data/2.5/"
  }


function App() {

  //GET LOCATION
  // navigator.geolocation.getCurrentPosition();

  // ACTIONS TO MOVE TO RESULTS SCREEN
  const [home, showHome] = useState(true);
  const [searchNav, showNav] = useState(false);
  const [results, showResults] = useState(false);

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});


  // SEARCH FUNCTION
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query},US&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          showHome(false); showNav(true); showResults(true);
        });
      
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

      {searchNav ? <nav className="navbar justify-content-between bg-light">
        <div className="navLogo">
          WA
        </div>
        <div className="navRight col-9 d-flex justify-content-evenly align-items-center">
          <input
            type="text"
            placeholder="Search by City or Zip Code"
            className="search-bar col-7 text-center"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button className="searchButton"><i className="fas fa-search"></i></button>
        </div>
      </nav> : null}

      <main className="d-flex justify-content-center align-items-center">

        {/* ------------ */}
        {/* HOME SECTION */}
        {/* ------------ */}
        {home ? <section className="home">

            <div className="container text-center">
              <h1 id="homeTitle">Weather App</h1>

              <input
                type="text"
                placeholder="Search by City or Zip Code"
                className="search-bar col-7 d-block text-center"
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
              <button className="searchBtn"
                onClick={search}>
                SEARCH
                </button>
            </div>
        </section> : null}

        

        {/* ------------ */}
        {/*RESULTS SECTION*/}
        {/* ------------ */}
        {results ? <section className="results">
          <div className="container-fluid text-center">
            <h2 className="location">{weather.name}, {weather.cod}, {weather.sys.country}</h2>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="card">
              <div className="card__image">
                <div className="row d-block">
                  <h4>Current</h4>
                  <span className="curTemp">{Math.round(weather.main.temp)}&deg;F</span>
                </div>
                <div className="row">
                  <h5>Feels Like</h5>
                  <span className="feels">{Math.round(weather.main.feels_like)}&deg;F</span>
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
        </section>:null}
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