const Weather = require("../models/weather")
//const User = require('../models/user')
const request = require('request')




const getWeather = (url) => {
    return new Promise((resolve, reject) => {
        console.log('in get weather')
        var options = {
            'method': 'GET',
            'url': url
        };
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(JSON.parse(response.body))
        });
    })

}
const createWeather = async (req, res) => {
    console.log('in create weather')
    try {
        console.log(`req.params.uid: ${req.params.uid}`)
        let user = await Weather.findById(req.params.uid)
        //Haifa
        //Tel-aviv
        //Ashkelon
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.APPID}`
        let weatherJson = await getWeather(url)
        weather = new Weather({date:Date.now(),city:weatherJson.name,temp:weatherJson.main.temp,feelLike:weatherJson.feels_like,userId:req.params.uid})
        await weather.save()

        if (user) {
            await weather.save()
            res.status(200).send(`temp:${weatherJson.main.temp},feel like:${weatherJson.main.feels_like},user:${user}`)
        }
        else {
            res.status(200).send("not found!")
        }
    }
    catch (err) {
        console.log(`err: ${err.message}`)
        res.status(400).send(err.message)
    }
}
const deleteWeather = async (req, res) => {    
    try {
        let weather = await Weather.findById(req.params.wid )
        if (weather) {
            await Weather.remove(weather)
            res.status(200).send("delete")
        }
        else {
            res.status(400).send("not found !")
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}
const getWeathersByUserId = async (req, res) => {
    try {
        let weahters = await Weather.find().where('userId').equals(req.params.uid)
        if(weahters)
        {
             res.status(200).send(weahters)
        }
        else 
        {
             res.status(400).send("not found !")
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}
const getWeatherById = async (req, res) => {
    try {
        let weather = await Weather.findById(req.params.wid)
        console.log(weather)
        if(weather)
        {
             res.status(200).send(weather)
        }
        else 
        {
             res.status(400).send("not found !")
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports = {
    createWeather,
    getWeather,//
    deleteWeather,
    getWeathersByUserId,
    getWeatherById
}