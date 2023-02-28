try {
  //create variables for various pieces of information
    let cityId = ''
    let country = ''
    let cityName = ''
    let latitude = ''
    let longitude = ''
    let population = ''
    let temperature = ''
    let elevation = ''

    let cityInput = prompt('Enter a city name within South Africa')
    let search = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=Q258&namePrefix=${cityInput}`
    // let searchWeather = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=Q258&namePrefix=${cityInput}`

    //create options for city id to be fetched
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8bbef399e8msh544f7799a44c433p109289jsn6640c2d77abf',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }
       //create options for elevation
      const optionsElevation = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8bbef399e8msh544f7799a44c433p109289jsn6640c2d77abf',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    }
      //create options for current weather
      const optionsWeather = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8bbef399e8msh544f7799a44c433p109289jsn6640c2d77abf',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };
//fetch the information about a city, excluding city ID that will later be needed to obtain a city elevation
fetch(search, options)
.then((res) => res.json()).then((data) => { //get the gersponse and accss data
  //output random affirmation
     cityId = data.data[0].wikiDataId
     country = data.data[0].country
     cityName = data.data[0].city
     latitude = data.data[0].latitude.toFixed(1)
     longitude = data.data[0].longitude.toFixed(1)
     population = data.data[0].population
})
//get current temperature, using latiture and longtitude as identifiers
.then(() =>{
  setTimeout(() => {//delay response to allow the city id and city geo locaiton to be fetched first
    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lat=${latitude}&lon=${longitude}`, optionsWeather)
    .then(response => response.json())
    .then((data) => {
     temperature = data.data[0].app_temp
    })
    .catch(err => console.error(err))
  }, 50)
})
.then(() =>{
  setTimeout(() => {//delay response to allow the city id to be fetched first, then fetch the elevation
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`, optionsElevation)
    .then(response => response.json())
    .then((data) => {
          elevation = data.data.elevationMeters
      })
    .catch(err => console.error(err))
  }, 50)
})
.then(() =>{
  setTimeout(() => {
    //print out city  population, elevation and temperature
    console.log(`City name: ${cityName}, population: ${population}, elevation: ${elevation}, current temperature: ${temperature}`)
  }, 500)
})
  }
  catch(err) {
    alert(err.message)
  }
