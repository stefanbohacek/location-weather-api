![Weather web app showing weather in Brooklyn](https://fourtonfish.com/wp-content/uploads/2019/03/web-apis-tutorial-06-app-finished-700x411.png)

# Location and weather API

## How to use

First, fill out `.env` with the following:

```
APP_URL='https://yourapp.glitch.me'
API_KEY='this-can-be-anything-1234'
```

`APP_URL` is the url of the app that will be calling your API. (Be sure to remove any trailing slashes). You will also need to include `API_KEY` when making calls to your API. Make it something random and hard to guess.

Apply for API keys for [OpenWeatherMap](https://openweathermap.org/api) and [Flickr](http://www.flickr.com/services/apps/create/apply/) and add them as well.

```
OWM_APP_ID='1234abcd5678efg9'
FLICKR_API_KEY='1234abcd5678efg9'
```

Now you can access your API at following endpoints:

### `yourapp.glitch.me/weather`

This endpoint is fully automatic, you only need to provide the API key.


```
https://yourapp.glitch.me/weather?api_key=your-api-key-1234
```

The script will detect the IP address and the location and then loads the weather for the location.

Optionally you can pass a `units` parameter:

- for temperature in Fahrenheit use `units=imperial` (this is the default if the `units` parameter is omited)
- for temperature in Celsius use `units=metric`

Example:

```
https://yourapp.glitch.me/weather?api_key=your-api-key-1234&units=metric
```

Here's a shortened example response:

```
{
  "weather": {
    "coord": {
      "lon": -12.34,
      "lat": 98.76
    },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky"
      }
    ],
    "main": {
      "temp": 37.31,
      "pressure": 1030,
      "humidity": 48,
      "temp_min": 32,
      "temp_max": 43
    },
    "visibility": 16093,
    "wind": {
      "speed": 5.19,
      "deg": 189
    }
  },
  "location": {
    "city": "Brooklyn",
    "country": "United States",
    "countryCode": "US",
    "lon": -12.34,
    "lat": 98.76
  }
}
```


### `yourapp.glitch.me/background`

You need to provide `weather` which is text used to search Flickr, and location as `latitude`, and `longitude` that will help filter images based on where they were taken.

Example request URL:

```
https://yourapp.glitch.me/background?api_key=your-api-key-1234&weather=cloudy&latitude=-12.34&longitude=98.76
```


Example response:

```
{
  "photos": {
    "page": 1,
    "pages": 1,
    "perpage": 250,
    "total": "140",
    "photo": [
      {
        "id": "32263946454",
        "owner": "25756794@N04",
        "secret": "48b91eb335",
        "server": "2504",
        "farm": 3,
        "title": "New York",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0,
        "url_l": "https://farm3.staticflickr.com/2504/32263946454_48b91eb335_b.jpg",
        "height_l": "1024",
        "width_l": "1024"
      },
      /* more photos... */
      ]
  },
  "stat": "ok"
}
```

## Powered by

- [IP-API.com](http://ip-api.com)
- [OpenWeatherMap](https://openweathermap.org/api)
- [Flickr](http://flickr.com/services/api/)
- and [Glitch](https://glitch.com)

## Learn more

- [Example weather web app](https://weather-web-app.glitch.me/) ([source code](https://glitch.com/edit/#!/weather-web-app?path=README.md))
- [Weather web app tutorial](https://fourtonfish.com/blog/weather-web-app-web-api-tutorial/) (coming soon!)

Created by [@fourtonfish](https://twitter.com/fourtonfish) 