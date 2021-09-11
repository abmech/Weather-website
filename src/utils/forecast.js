const request = require('request')

const forecast = (longitude, lattitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=23a869b39a9e5b8ff7421a54bc594466&query='+ longitude +',' + lattitude +'&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location.', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. Feels like " + body.current.feelslike + " degrees. Humidity is "+ body.current.humidity +".")
        }
    })

} 



module.exports = forecast