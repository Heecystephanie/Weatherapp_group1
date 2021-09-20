const api = {
  key: 'b44da764a7831b13974228f2ab6b2f3e',
  base: 'https://api.openweathermap.org/data/2.5/',
}
const searchBtn = document.querySelector('#search-btn')
const searchbox = document.querySelector('.search-box')

searchBtn.addEventListener('click', getResults)

searchbox.addEventListener('keypress', setQuery)

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value)
  }
}

function getResults() {
  const search = document.querySelector('#search').value
  fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then((response) => {
      
      if (response.status !== 200) {
        throw new Error(`Country not found (${response.status})`)
      }

      return response.json()
    })
    .then((data) => {
      displayResults(data)
    })
    .catch((err) => {
      
      alert(`city not found`)
    })
}

function displayResults(weather) {
  let city = document.querySelector('.city')
  city.innerText = `${weather.name}, ${weather.sys.country}`

  let now = new Date()
  let date = document.querySelector('.date')
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.temp')
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

  let weather_el = document.querySelector('.weather')
  weather_el.innerText = weather.weather[0].main

  let hilow = document.querySelector('.hi-low')
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`
}

function dateBuilder(d) {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let days = [
    'Sunday',
    'Monday',
    'Tuseday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day} ${date} ${month} ${year}`
}
