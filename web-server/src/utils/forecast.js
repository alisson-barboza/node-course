const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + '98d8c02c94cd1f85d43dee189c55816b' + '/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to location services!!')
        }else if(body.error){
            callback('Unable to find location. Try another search')
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
