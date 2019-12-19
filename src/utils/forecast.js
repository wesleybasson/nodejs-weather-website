const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1b32141397e2a53cdf591b8040c2468b/${latitude},${longitude}?units=si`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Could not connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const { temperature, precipProbability, cloudCover } = body.currently
            const { temperatureHigh, temperatureLow, summary } = body.daily.data[0]
            callback(undefined, {
                forecast: `The forecasted high for today is ${temperatureHigh} degrees and the low is ${temperatureLow} degrees`,
                current: `${summary} It is currently ${temperature} degrees out. Expect about ${cloudCover * 100}% cloud cover and a ${precipProbability * 100}% chance of rain.`
            })
        }
    })
}

module.exports = forecast
