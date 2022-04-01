const fetch=require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();
const getTripInfo =async(tripInfo)=>{
const geoRequest=await fetch (
    `http://api.geonames.org/postalCodeLookupJSON?placename=${tripInfo.destination}&maxRows=1&username=${process.env.GEOUSERNAME}`
      )
const geoRes=await geoRequest.json()
const locationImage=await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYAPIKEY}&q=${tripInfo.destination}`)
const locationRes=await locationImage.json()
const weatherRequest=await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoRes.postalcodes[0].lat}&lon=${geoRes.postalcodes[0].lng}&days=${tripInfo.days}&key=${process.env.WEATHERBITAPIKEY}`)
const weatherRes=await weatherRequest.json()

const weatherDescription=weatherRes.data[weatherRes.data.length-1].weather.description
const weatherTemp=weatherRes.data[weatherRes.data.length-1].temp 
    const trip={
      image:locationRes.hits[0].largeImageURL,
      weather:{
      icon:`https://www.weatherbit.io/static/img/icons/${weatherRes.data[weatherRes.data.length-1].weather.icon}.png`,
      decription:weatherDescription,
      temp:weatherTemp
    }
    }
    return trip;

  }

  module.exports =getTripInfo 