import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet, TouchableHighlight, Animated  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyChart } from './MyChart';
import { YellowBox } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from './weatherConditions';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state',]);

var x =0;
//const weatherData=[{''}];
function HomeScreen({ navigation, route })
{
  const [text, onChangeText] = React.useState(null);
  const [weatherData, setWeatherData] = React.useState("hello");
  x=0;
  console.log("HomeScreen:"+x);
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
  const [weather, setWeather] = React.useState('Clear');
  const [temperature, setTemperature] = React.useState(null);
  const [feelsliketemperature, setFeelsLikeTemperature] = React.useState(null);
  const [pressure, setPressure] = React.useState(null);
  const [humidity, setHumidity] = React.useState(null);
  const [windDirection, setWindDirection] = React.useState('');
  const [windDirectionStr, setWindDirectionStr] = React.useState('');
  const [windSpeed, setWindSpeed] = React.useState(null);
  const [weatherDescription, setweatherDescription] = React.useState(null);
  const [city, setCity] = React.useState(route.params.paramKey);
  x++;
  console.log("Current:"+x)
  if(x==1){
    fetch('http://192.168.1.53:8000/saveWeather/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({city})
      });
}

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=1f3b675bf27e4e2e0ec49c0f6a5bc146')
  .then((response) => response.json())
  .then((json) =>
  {
    setTemperature(Math.round((json.main.temp) - 273.15))
    setFeelsLikeTemperature(Math.round((json.main.feels_like) - 273.15))
    setPressure(json.main.pressure)
    setHumidity(json.main.humidity)
    setWindSpeed(Math.round(json.wind.speed))
    setWindDirection(json.wind.deg + 90 + 'deg')
    setweatherDescription(json.weather[0].description)
    setWeather(json.weather[0].main)
    console.log(windDirection);
    setWindDirectionStr('"'+windDirection+'"');

    /*this.setState({
          temperature: json.main.temp,
          weather: json.weather[0].main,
    });*/

  });


  return(
      <View style={[styles.weatherContainer,{ backgroundColor: weatherConditions[weather].color }]}>
        <View style = {{justifyContent: 'center'}, {alignItems: 'center'}}>
        <Text style={styles.tempText}>{city}</Text>
          <MaterialCommunityIcons size={80} name={weatherConditions[weather].icon} color={'#fff'}/>
          <Text style={styles.tempText}>{temperature}˚C</Text>
          <View style={styles.bodyContainer}>
            <View style = {{justifyContent: 'center'}, {alignItems: 'center'}}>
              <Text style={styles.infoHeadingText}>Feels Like</Text>
              <Text style={styles.infosubtitleText}>{feelsliketemperature}˚C</Text>
              <Text style={styles.infoHeadingText}>Wind</Text>
              <Text style={styles.infosubtitleText}>{windSpeed} km/p</Text>
              <MaterialCommunityIcons size={50} name='rewind-outline'   style={{transform: [{ rotate: windDirection }]}} color={'#fff'}/>
              <Text style={styles.infoHeadingText}>Humidity</Text>
              <Text style={styles.infosubtitleText}> {humidity}%</Text>
              <Text style={styles.infoHeadingText}>Pressure</Text>
              <Text style={styles.infosubtitleText}>{pressure} hPa</Text>
            </View>
            <Text style={styles.title}>{weatherConditions[weather].title}</Text>
            <Text style={styles.subtitle}>{weatherDescription}</Text>
          </View>
        </View>
      </View>

    );
};

function ForecastWeather({ navigation, route })
{
  const [city, setCity] = React.useState(route.params.paramKey);
  const [lon, setLon] = React.useState('');
  const [day1, setDay1] = React.useState(null);
  const [day2, setDay2] = React.useState(null);
  const [day3, setDay3] = React.useState(null);
  const [day4, setDay4] = React.useState(null);
  const [day5, setDay5] = React.useState(null);
  const [day6, setDay6] = React.useState(null);
  const [day7, setDay7] = React.useState(null);
  const [weatherday1, setweatherDay1] = React.useState(null);
  const [weatherday2, setweatherDay2] = React.useState(null);
  const [weatherday3, setweatherDay3] = React.useState(null);
  const [weatherday4, setweatherDay4] = React.useState(null);
  const [weatherday5, setweatherDay5] = React.useState(null);
  const [weatherday6, setweatherDay6] = React.useState(null);
  const [weatherday7, setweatherDay7] = React.useState(null);
  const [weatherConditionDay1, setweatherConditionDay1] = React.useState('Clear');
  const [weatherConditionDay2, setweatherConditionDay2] = React.useState('Clear');
  const [weatherConditionDay3, setweatherConditionDay3] = React.useState('Clear');
  const [weatherConditionDay4, setweatherConditionDay4] = React.useState('Clear');
  const [weatherConditionDay5, setweatherConditionDay5] = React.useState('Clear');
  const [weatherConditionDay6, setweatherConditionDay6] = React.useState('Clear');
  const [weatherConditionDay7, setweatherConditionDay7] = React.useState('Clear');
  const [lat, setLat] = React.useState('');
  x++;
  console.log("Current:"+x)
  if(x==1){
    fetch('http://192.168.1.53:8000/saveWeather/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({city})
      });
}
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=1f3b675bf27e4e2e0ec49c0f6a5bc146')
  .then((response) => response.json())
  .then((json) =>
  {
  setLon(json.coord.lon);
  setLat(json.coord.lat);

  });
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=&appid=1f3b675bf27e4e2e0ec49c0f6a5bc146')
    .then((response) => response.json())
    .then((json) =>
    {
      if(json)
      {
        setDay1(Math.round((json.daily[0].temp.day) - 273.15));
        setweatherDay1(json.daily[0].weather[0].description)
        setweatherConditionDay1(json.daily[0].weather[0].main)

        setDay2(Math.round((json.daily[1].temp.day) - 273.15));
        setweatherDay2(json.daily[1].weather[0].description)
        setweatherConditionDay2(json.daily[1].weather[0].main)

        setDay3(Math.round((json.daily[2].temp.day) - 273.15));
        setweatherDay3(json.daily[2].weather[0].description);
        setweatherConditionDay3(json.daily[2].weather[0].main);

        setDay4(Math.round((json.daily[3].temp.day) - 273.15));
        setweatherDay4(json.daily[3].weather[0].description);
        setweatherConditionDay4(json.daily[3].weather[0].main);

        console.log(weatherConditionDay1);
      }
      else(console.log("error"));
    })
    .catch((error) =>
    {
      console.error("error");
    });



  return(
    <View style={[styles.weatherContainer ,{ backgroundColor: '#570091'}]}>
      <View style = {{justifyContent: 'center'}, {alignItems: 'center'}}>
        <Text style={styles.appHeading}>{city}</Text>
        <Text style={styles.appHeading}>4 Day Forecast</Text>

      <View style={styles.bodyContainer}>


        <Text style={styles.titleForcast} >1 Days Time</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons size={60} name={weatherConditions[weatherConditionDay1].icon} color={weatherConditions[weatherConditionDay1].color}/>
          <Text style={styles.subtitle}>{day1}˚C</Text>
        </View>
        <Text style={styles.subtitleForecast}>{weatherday1}</Text>


        <Text style={styles.titleForcast}>2 Days Time</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons size={60} name={weatherConditions[weatherConditionDay2].icon} color={weatherConditions[weatherConditionDay2].color}/>
          <Text style={styles.subtitle}>{day2}˚C</Text>
        </View>
        <Text style={styles.subtitleForecast}>{weatherday2}</Text>


        <Text style={styles.titleForcast}>3 Days Time</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons size={60} name={weatherConditions[weatherConditionDay3].icon} color={weatherConditions[weatherConditionDay3].color}/>
          <Text style={styles.subtitle}>{day3}˚C</Text>
        </View>
        <Text style={styles.subtitleForecast}>{weatherday3}</Text>


        <Text style={styles.titleForcast}>4 Days Time</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons size={60} name={weatherConditions[weatherConditionDay4].icon} color={weatherConditions[weatherConditionDay4].color}/>
          <Text style={styles.subtitle}>{day4}˚C</Text>
        </View>
        <Text style={styles.subtitleForecast}>{weatherday4}</Text>


      </View>
      </View>
    </View>
  );
};
function SearchHistory({ navigation, route })
{


    fetch('http://192.168.1.53:8000/getHistory/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      })
      .then((response) => response.json())
                 .then((json) => {

                   console.log(json.city[0]);
                 })
                 .catch((error) => {
                   console.error(error);
                 });





  return(
      <Text> Hello </Text>



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
    fontSize: 48,
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
    marginBottom: 40
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


function ChartTheData({ navigation, route })
{
//  if(route.params.show == false){
  //  return null;
  //}
  let lineData =
  {
    interpolation: 'T', data: [10, 12, 8, 9, 10, 5, 0, -5],
    nativeData:
    {
      labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat","Sun"],
      datasets:
      [{
      data:
        [
          Math.random() * 90,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }
  };
  return(
    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor: '#1e90ff',paddingBottom: 50}}>

      <View style={{ backgroundColor: '#ffffff', borderColor: '#000000', borderWidth: 2, padding: 2 }}>
        <MyChart dataToChart = {lineData}> </MyChart>
      </View>

      <View style={{ padding: 5, marginTop: 10, backgroundColor: '#c0c0c0', borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }}>
        <Text onPress={() => navigation.goBack()}>Done (back to Home screen)</Text>
      </View>

    </View>
  );
}




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
          name="ChartTheData"
          component={ChartTheData}
          options={{
            title: 'Chart',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#000080',
              height: 50,
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
