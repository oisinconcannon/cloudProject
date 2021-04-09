import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet, TouchableHighlight, Animated, ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { YellowBox } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from './weatherConditions';
import { useIsFocused } from '@react-navigation/native';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state',]);
var x =0;
//const weatherData=[{''}];
function HomeScreen({ navigation, route })
{

  const isFocused = useIsFocused();
  const [text, onChangeText] = React.useState('');
  const [weatherData, setWeatherData] = React.useState("");
  x=0;
  return(
    <View style={[styles.weatherContainer ,{ backgroundColor: '#570091'}]}>
      <View style={[styles.headerContainer]}>
        <Text style={[styles.appHeading]}>OL Weather App</Text>
      </View>

      <View style={[styles.bodyContainer]}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <MaterialCommunityIcons size={48} name="weather-sunny" color={'#f7b733'} />
          <MaterialCommunityIcons size={48} name="weather-cloudy" color={'#666666'} />
          <MaterialCommunityIcons size={48} name="weather-lightning" color={'#c44fff'} />
          <MaterialCommunityIcons size={48} name="weather-snowy" color={'#00d2ff'} />
          <MaterialCommunityIcons size={48} name="weather-rainy" color={'#005BEA'} />
        </View>

        <TextInput style={styles.input} placeholder="Enter City" onChangeText={onChangeText} value={text}/>

        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>

          <View style={{ padding: 10, backgroundColor: '#570091', marginBottom: 10, marginTop: 10, borderColor: '#570091', borderWidth: 3, borderRadius: 10}} >
            <Text style ={{fontSize:20, color: '#fff'}} onPress={() => navigation.navigate('CurrentWeather',{ paramKey:text})}>Search Weather</Text>
          </View>

          <View style={{ padding: 10, backgroundColor: '#570091', marginBottom: 10, marginTop: 10, borderColor: '#570091', borderWidth: 3, borderRadius: 10}} >
            <Text style ={{fontSize:20, color: '#fff'}} onPress={() => navigation.navigate('ForecastWeather',{ paramKey:text})}
            >Search Forecast</Text>
          </View>
          <View style={{ padding: 10, backgroundColor: '#570091', marginBottom: 10, marginTop: 10, borderColor: '#570091', borderWidth: 3, borderRadius: 10}} >
            <Text style ={{fontSize:20, color: '#fff'}} onPress={() =>navigation.navigate('SearchHistory')}
            >Search History</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function CurrentWeather({ navigation, route })
{
  x++;
  const [weather, setWeather] = React.useState({ weatherCondition: "Clear", temperature: "", feelsliketemperature: "", pressure: "",
        humidity: "", windDirection: "", windSpeed: "", weatherDescription: ""});
  const [city, setCity] = React.useState(route.params.paramKey);

  if(x==1){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=13776b8ebe5a6b4382130fef9aa0ad33')
    .then((response) => response.json())
    .then((json) =>
    {
      setWeather({
                  weatherCondition: json.weather[0].main,
                  temperature: Math.round((json.main.temp) - 273.15),
                  feelsliketemperature: Math.round((json.main.feels_like) - 273.15),
                  pressure: json.main.pressure,
                  humidity: json.main.humidity,
                  windDirection: json.wind.deg + 90 + 'deg',
                  windSpeed: Math.round(json.wind.speed),
                  weatherDescription: json.weather[0].description})

      let weatherData =
      {
        city:city,
        temp: Math.round((json.main.temp) - 273.15),
        windspeed: Math.round(json.wind.speed),
        weatherdescription: json.weather[0].description,
        weatherCondition: json.weather[0].main
      }

      fetch('http://192.168.1.17:8000/saveWeather/',
      {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({weatherData})
        });
      console.log(weather);
      console.log(weatherData);
    });
}




  return(
      <View style={[styles.weatherContainer,{ backgroundColor: weatherConditions[weather.weatherCondition].color }]}>
        <View style = {{justifyContent: 'center'}, {alignItems: 'center'}}>
        <Text style={styles.tempText}>{city}</Text>
          <MaterialCommunityIcons size={80} name={weatherConditions[weather.weatherCondition].icon} color={'#fff'}/>
          <Text style={styles.tempText}>{weather.temperature}˚C</Text>
        </View>
        <ScrollView>
        <View style={styles.bodyContainer}>
            <View style = {{justifyContent: 'center'}, {alignItems: 'center'}}>
              <Text style={styles.infoHeadingText}>Feels Like</Text>
              <Text style={styles.infosubtitleText}>{weather.feelsliketemperature}˚C</Text>
              <Text style={styles.infoHeadingText}>Wind</Text>
              <Text style={styles.infosubtitleText}>{weather.windSpeed} km/p</Text>
              <MaterialCommunityIcons size={50} name='rewind-outline'   style={{transform: [{ rotate: weather.windDirection }]}} color={'#fff'}/>
              <Text style={styles.infoHeadingText}>Humidity</Text>
              <Text style={styles.infosubtitleText}> {weather.humidity}%</Text>
              <Text style={styles.infoHeadingText}>Pressure</Text>
              <Text style={styles.infosubtitleText}>{weather.pressure} hPa</Text>
            </View>
        </View>
        </ScrollView>
        <View style = {{justifyContent: 'flex-end'}, {alignItems: 'center'}}>
          <Text style={styles.title}>{weatherConditions[weather.weatherCondition].title}</Text>
          <Text style={styles.subtitle}>{weather.weatherDescription}</Text>
        </View>
        </View>

    );
};

function ForecastWeather({ navigation, route })
{
  const [city, setCity] = React.useState(route.params.paramKey);
  //const [latlon, setLatLon] = React.useState({lon: null, lat: null});
  const [forecast, setForecast] = React.useState({
                                        day1: {weatherCondition: "Clear", temperature: "", weatherDescription: ""},
                                        day2: {weatherCondition: "Clear", temperature: "", weatherDescription: "" },
                                        day3: {weatherCondition: "Clear", temperature: "", weatherDescription: "" },
                                        day4: {weatherCondition: "Clear", temperature: "", weatherDescription: "" },
                                        day5: {weatherCondition: "Clear", temperature: "", weatherDescription: "" },
                                        day6: {weatherCondition: "Clear", temperature: "", weatherDescription: "" },
                                        day7: {weatherCondition: "Clear", temperature: "", weatherDescription: "" }
                                      });


  x++;
  console.log("Current:"+x)

if(x==1){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=13776b8ebe5a6b4382130fef9aa0ad33')
  .then((response) => response.json())
  .then((json) =>
  {
    let latlon =
    {
      lat:json.coord.lat,
      lon: json.coord.lon
    }
    let weatherData =
    {
      city:city,
      temp: Math.round((json.main.temp) - 273.15),
      windspeed: Math.round(json.wind.speed),
      weatherdescription: json.weather[0].description,
      weatherCondition: json.weather[0].main
    }

    fetch('http://192.168.1.17:8000/saveWeather/',
    {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({weatherData})
      });
      console.log(weatherData);
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latlon.lat+'&lon='+latlon.lon+'&exclude=&appid=13776b8ebe5a6b4382130fef9aa0ad33')
    .then((response) => response.json())
    .then((json) =>
    {
      if(json)
      {
        setForecast({
                    day1:
                    {
                      weatherCondition: json.daily[0].weather[0].main ,
                      temperature: Math.round((json.daily[0].temp.day) - 273.15),
                      weatherDescription: json.daily[0].weather[0].description
                    },
                    day2:
                    {
                      weatherCondition: json.daily[1].weather[0].main ,
                      temperature: Math.round((json.daily[1].temp.day) - 273.15),
                      weatherDescription: json.daily[1].weather[0].description
                    },
                    day3:
                    {
                      weatherCondition: json.daily[2].weather[0].main ,
                      temperature: Math.round((json.daily[2].temp.day) - 273.15),
                      weatherDescription: json.daily[2].weather[0].description
                    },
                    day4:
                    {
                      weatherCondition: json.daily[3].weather[0].main ,
                      temperature: Math.round((json.daily[3].temp.day) - 273.15),
                      weatherDescription: json.daily[3].weather[0].description
                    },
                    day5:
                    {
                      weatherCondition: json.daily[4].weather[0].main ,
                      temperature: Math.round((json.daily[4].temp.day) - 273.15),
                      weatherDescription: json.daily[4].weather[0].description
                    },
                    day6:
                    {
                      weatherCondition: json.daily[5].weather[0].main ,
                      temperature: Math.round((json.daily[5].temp.day) - 273.15),
                      weatherDescription: json.daily[5].weather[0].description
                    },
                    day7:
                    {
                      weatherCondition: json.daily[6].weather[0].main ,
                      temperature: Math.round((json.daily[6].temp.day) - 273.15),
                      weatherDescription: json.daily[6].weather[0].description
                    },
              })
      }
      else(console.log("error"));
    });
    console.log(weatherData);
    console.log(latlon.lat);
    console.log(latlon.lon);
  })
}
console.log(forecast);


  return(
    <View style={[styles.weatherContainer ,{ backgroundColor: '#570091'}]}>

        <View style = {{justifyContent: 'center'}, {alignItems: 'center'}}>
          <Text style={styles.appHeading}>{city}</Text>
    </View>
        <ScrollView>
        <View style={styles.bodyContainer}>


          <Text style={styles.titleForcast} >1 Days Time</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[forecast.day1.weatherCondition].icon} color={weatherConditions[forecast.day1.weatherCondition].color}/>
            <Text style={styles.subtitle}>{forecast.day1.temperature}˚C</Text>
          </View>
          <Text style={styles.subtitleForecast}>{forecast.day1.weatherDescription}</Text>


          <Text style={styles.titleForcast}>2 Days Time</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[forecast.day2.weatherCondition].icon} color={weatherConditions[forecast.day2.weatherCondition].color}/>
            <Text style={styles.subtitle}>{forecast.day2.temperature}˚C</Text>
          </View>
          <Text style={styles.subtitleForecast}>{forecast.day2.weatherDescription}</Text>


          <Text style={styles.titleForcast}>3 Days Time</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[forecast.day3.weatherCondition].icon} color={weatherConditions[forecast.day3.weatherCondition].color}/>
            <Text style={styles.subtitle}>{forecast.day3.temperature}˚C</Text>
          </View>
          <Text style={styles.subtitleForecast}>{forecast.day3.weatherDescription}</Text>


          <Text style={styles.titleForcast}>4 Days Time</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[forecast.day4.weatherCondition].icon} color={weatherConditions[forecast.day4.weatherCondition].color}/>
            <Text style={styles.subtitle}>{forecast.day4.temperature}˚C</Text>
          </View>
          <Text style={styles.subtitleForecast}>{forecast.day4.weatherDescription}</Text>

          <Text style={styles.titleForcast}>5 Days Time</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[forecast.day5.weatherCondition].icon} color={weatherConditions[forecast.day5.weatherCondition].color}/>
            <Text style={styles.subtitle}>{forecast.day5.temperature}˚C</Text>
          </View>
          <Text style={styles.subtitleForecast}>{forecast.day5.weatherDescription}</Text>

          <Text style={styles.titleForcast}>6 Days Time</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[forecast.day6.weatherCondition].icon} color={weatherConditions[forecast.day6.weatherCondition].color}/>
            <Text style={styles.subtitle}>{forecast.day6.temperature}˚C</Text>
          </View>
          <Text style={styles.subtitleForecast}>{forecast.day6.weatherDescription}</Text>

          <Text style={styles.titleForcast}>7 Days Time</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[forecast.day7.weatherCondition].icon} color={weatherConditions[forecast.day7.weatherCondition].color}/>
            <Text style={styles.subtitle}>{forecast.day7.temperature}˚C</Text>
          </View>
          <Text style={styles.subtitleForecast}>{forecast.day7.weatherDescription}</Text>
        </View>

      </ScrollView>
      <View style = {{justifyContent: 'flex-end'}, {alignItems: 'center'}}>
      <Text style={styles.appHeading}>7 Day Forecast</Text>
      </View>
      </View>

  );
};
function SearchHistory({ navigation, route })
{
   const [cityHistory, setCityHistory] = React.useState({
                                        city1: {city: "", weatherCondition: "Clear", temperature: "", weatherDescription: "" , windSpeed: ""},
                                        city2: {city: "", weatherCondition: "Clear", temperature: "", weatherDescription: "" , windSpeed: ""},
                                        city3: {city: "", weatherCondition: "Clear", temperature: "", weatherDescription: "" , windSpeed: ""},
                                        city4: {city: "", weatherCondition: "Clear", temperature: "", weatherDescription: "" , windSpeed: ""},
                                        city5: {city: "", weatherCondition: "Clear", temperature: "", weatherDescription: "" , windSpeed: ""},
                                        city6: {city: "", weatherCondition: "Clear", temperature: "", weatherDescription: "" , windSpeed: ""},
                                        city7: {city: "", weatherCondition: "Clear", temperature: "", weatherDescription: "" , windSpeed: ""}
                                      });

    fetch('http://192.168.1.17:8000/getHistory/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      })
      .then((response) => response.json())
      .then((json) => {
       setCityHistory({
                   city1:
                   {
                     city: json.city.[json.city.length - 1].city,
                     weatherCondition: json.city.[json.city.length - 1].weatherCondition ,
                     temperature: json.city.[json.city.length - 1].temp,
                     weatherDescription: json.city.[json.city.length - 1].weatherdescription,
                     windSpeed: json.city.[json.city.length - 1].windspeed
                   },
                   city2:
                   {
                     city: json.city.[json.city.length - 3].city,
                     weatherCondition: json.city.[json.city.length - 3].weatherCondition ,
                     temperature: json.city.[json.city.length - 3].temp,
                     weatherDescription: json.city.[json.city.length - 3].weatherdescription,
                     windSpeed: json.city.[json.city.length - 3].windspeed
                   },
                   city3:
                   {
                     city: json.city.[json.city.length - 5].city,
                     weatherCondition: json.city.[json.city.length - 5].weatherCondition ,
                     temperature: json.city.[json.city.length - 5].temp,
                     weatherDescription: json.city.[json.city.length - 5].weatherdescription,
                     windSpeed: json.city.[json.city.length - 5].windspeed
                   },
                   city4:
                   {
                     city: json.city.[json.city.length - 7].city,
                     weatherCondition: json.city.[json.city.length - 7].weatherCondition ,
                     temperature: json.city.[json.city.length - 7].temp,
                     weatherDescription: json.city.[json.city.length - 7].weatherdescription,
                     windSpeed: json.city.[json.city.length - 7].windspeed
                   },
                   city5:
                   {
                     city: json.city.[json.city.length - 9].city,
                     weatherCondition: json.city.[json.city.length - 9].weatherCondition ,
                     temperature: json.city.[json.city.length - 9].temp,
                     weatherDescription: json.city.[json.city.length - 9].weatherdescription,
                     windSpeed: json.city.[json.city.length - 9].windspeed
                   },
                   city6:
                   {
                     city: json.city.[json.city.length - 11].city,
                     weatherCondition: json.city.[json.city.length - 11].weatherCondition ,
                     temperature: json.city.[json.city.length - 11].temp,
                     weatherDescription: json.city.[json.city.length - 11].weatherdescription,
                     windSpeed: json.city.[json.city.length - 11].windspeed
                   },
                   city7:
                   {
                     city: json.city.[json.city.length - 13].city,
                     weatherCondition: json.city.[json.city.length - 13].weatherCondition ,
                     temperature: json.city.[json.city.length - 13].temp,
                     weatherDescription: json.city.[json.city.length - 13].weatherdescription,
                     windSpeed: json.city.[json.city.length - 13].windspeed
                   },
             })
     })
     .catch((error) =>
     {
       console.error(error);
     });


  return(
    <View style={[styles.weatherContainer ,{ backgroundColor: '#570091'}]}>
      <View style = {{justifyContent: 'center'}, {alignItems: 'center'}}>
        <Text style={styles.appHeading}>History</Text>
      </View>

        <ScrollView>
        <View style={styles.bodyContainer}>


          <Text style={styles.titleForcast} >{cityHistory.city1.city}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[cityHistory.city1.weatherCondition].icon} color={weatherConditions[cityHistory.city1.weatherCondition].color}/>
            <Text style={styles.subtitle}>{cityHistory.city1.temperature}˚C</Text>
          </View>
          <Text style={styles.infosubtitleText}>Wind {cityHistory.city1.windSpeed} km/p</Text>
          <Text style={styles.subtitleForecast}>{cityHistory.city1.weatherDescription}</Text>

          <Text style={styles.titleForcast} >{cityHistory.city2.city}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[cityHistory.city2.weatherCondition].icon} color={weatherConditions[cityHistory.city2.weatherCondition].color}/>
            <Text style={styles.subtitle}>{cityHistory.city2.temperature}˚C</Text>
          </View>
          <Text style={styles.infosubtitleText}>Wind {cityHistory.city2.windSpeed} km/p</Text>
          <Text style={styles.subtitleForecast}>{cityHistory.city2.weatherDescription}</Text>


          <Text style={styles.titleForcast} >{cityHistory.city3.city}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[cityHistory.city3.weatherCondition].icon} color={weatherConditions[cityHistory.city3.weatherCondition].color}/>
            <Text style={styles.subtitle}>{cityHistory.city3.temperature}˚C</Text>
          </View>
          <Text style={styles.infosubtitleText}>Wind {cityHistory.city3.windSpeed} km/p</Text>
          <Text style={styles.subtitleForecast}>{cityHistory.city3.weatherDescription}</Text>

          <Text style={styles.titleForcast} >{cityHistory.city4.city}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[cityHistory.city4.weatherCondition].icon} color={weatherConditions[cityHistory.city4.weatherCondition].color}/>
            <Text style={styles.subtitle}>{cityHistory.city4.temperature}˚C</Text>
          </View>
          <Text style={styles.infosubtitleText}>Wind {cityHistory.city4.windSpeed} km/p</Text>
          <Text style={styles.subtitleForecast}>{cityHistory.city4.weatherDescription}</Text>

          <Text style={styles.titleForcast} >{cityHistory.city5.city}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[cityHistory.city5.weatherCondition].icon} color={weatherConditions[cityHistory.city5.weatherCondition].color}/>
            <Text style={styles.subtitle}>{cityHistory.city5.temperature}˚C</Text>
          </View>
          <Text style={styles.infosubtitleText}>Wind {cityHistory.city5.windSpeed} km/p</Text>
          <Text style={styles.subtitleForecast}>{cityHistory.city5.weatherDescription}</Text>

          <Text style={styles.titleForcast} >{cityHistory.city6.city}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[cityHistory.city6.weatherCondition].icon} color={weatherConditions[cityHistory.city6.weatherCondition].color}/>
            <Text style={styles.subtitle}>{cityHistory.city6.temperature}˚C</Text>
          </View>
          <Text style={styles.infosubtitleText}>Wind {cityHistory.city6.windSpeed} km/p</Text>
          <Text style={styles.subtitleForecast}>{cityHistory.city6.weatherDescription}</Text>

          <Text style={styles.titleForcast} >{cityHistory.city7.city}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons size={60} name={weatherConditions[cityHistory.city7.weatherCondition].icon} color={weatherConditions[cityHistory.city7.weatherCondition].color}/>
            <Text style={styles.subtitle}>{cityHistory.city7.temperature}˚C</Text>
          </View>
          <Text style={styles.infosubtitleText}>Wind {cityHistory.city7.windSpeed} km/p</Text>
          <Text style={styles.subtitleForecast}>{cityHistory.city7.weatherDescription}</Text>

        </View>
        </ScrollView>
      </View>

  );
};
const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appHeading: {
    fontSize: 38,
    marginTop:7,
    marginBottom:7,
    color: '#fff'
  },

  tempText: {
    fontSize: 54,
    color: '#fff'
  },
  infoHeadingText: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 2
  },
  infosubtitleText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  bodyForecastContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 54,
    color: '#fff'
  },
  titleForcast: {
    fontSize: 33,
    color: '#fff'
  },
  subtitle: {
    fontSize: 30,
    color: '#fff'
  },
  subtitleForecast: {
    fontSize: 25,
    color: '#fff',
    marginTop: -10,
    marginBottom: 20
  },

  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 10
  }
});


const Stack = createStackNavigator();
export default function App()
{
  return(
    <NavigationContainer>
      <Stack.Navigator mode="modal">


        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#570091',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />

        <Stack.Screen
          name="SearchHistory"
          component={SearchHistory}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#570091',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />

        <Stack.Screen
          name="ForecastWeather"
          component={ForecastWeather}
          options={{
            title: 'Forecast',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#570091',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />


      <Stack.Screen
        name="CurrentWeather"
        component={CurrentWeather}
        options={{
          title: 'Current Weather',
          backgroundColor: '#f7b733',
          headerStyle: {
            backgroundColor: '#570091',
            height: 50,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
