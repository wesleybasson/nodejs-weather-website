const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1Ijoid2VzbGV5bWJhc3NvbiIsImEiOiJjanJsdWF4NXEwYmUzNDltczRrb2s1cGxkIn0.63ejs1RyFUwAdhPI1bznmQ`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to identify target address. Try another search', undefined)
        } else {
            const { place_name, center } = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode
