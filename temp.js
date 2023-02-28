try {
    let cityId = ''
    let country = ''
    let cityName = ''
    let latitude = ''
    let longitude = ''
    let population = ''
    let temperature = ''

    let cityInput = prompt('Enter a city name within South Africa')
    let search = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=Q258&namePrefix=${cityInput}`
    // let searchWeather = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=Q258&namePrefix=${cityInput}`


    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8bbef399e8msh544f7799a44c433p109289jsn6640c2d77abf',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }

      const optionsElevation = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8bbef399e8msh544f7799a44c433p109289jsn6640c2d77abf',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    }

      const optionsWeather = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8bbef399e8msh544f7799a44c433p109289jsn6640c2d77abf',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };
// const fetch  = require('isomorphic-fetch')

//create the function fetching the API
// async function cityFunction() { 
//     let res = await fetch(search, options)
//     // let data = await res.json()
// }
// print out the url


fetch(search, options)
.then((res) => res.json()).then((data) => { //get the gersponse and accss data
  //output random affirmation
     cityId = data.data[0].wikiDataId
     country = data.data[0].country
     cityName = data.data[0].city
     latitude = data.data[0].latitude.toFixed(1)
     longitude = data.data[0].longitude.toFixed(1)
     population = data.data[0].population

    //  console.log(data)
    //  console.log(cityId)
    //  console.log(latitude)
    //  console.log(longitude)
    //  console.log(cityName)
    //  console.log(country)
    //  console.log(population)





     fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lat=${latitude}&lon=${longitude}`, optionsWeather)
     .then(response => response.json())
     .then((data) => {
      temperature = data.data[0].app_temp
      console.log(temperature)
     })
     .catch(err => console.error(err))
})
// .then(() =>{
//   fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`, optionsElevation)
// 	.then(response => response.json())
// 	.then((data) => {
//         // elevation = data.data[0].elevationMeters
//         console.log(data)
//     })
// 	.catch(err => console.error(err))
// })
// .then(() => { 
//     fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`, optionsElevation)
// 	.then(response => response.json())
// 	.then((data) => {
//         elevation = data
//         console.log(elevation)
//     })
// 	.catch(err => console.error(err));
// })
// .then((data) => {

// })

    





  

// fetch(search, options)
// .then(response => response.json())
// .then(data => console.log(data + data.data[0].latitude + data.data[0].longtitude + data.data[0].city + data.data[0]))
// .catch(err => console.error(err));

  }
  catch(err) {
    alert(err.message)
  }

// cityFunction()
