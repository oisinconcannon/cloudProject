import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet, TouchableHighlight, Animated  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyChart } from './MyChart';
import { YellowBox } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from './weatherConditions';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state',]);


//const weatherData=[{''}];
function HomeScreen({ navigation, route })
{
  const [text, onChangeText] = React.useState(null);
  const [weatherData, setWeatherData] = React.useState("hello");

  return(
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>

        <Text style={styles.tempText}>OL Weather App</Text>

      </View>
      <View style={styles.bodyContainer}>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
      <MaterialCommunityIcons size={48} name="weather-cloudy" color={'#fff'} />
      <MaterialCommunityIcons size={48} name="weather-lightning" color={'#fff'} />
      <MaterialCommunityIcons size={48} name="weather-snowy" color={'#fff'} />
      <MaterialCommunityIcons size={48} name="weather-pouring" color={'#fff'} />
      </View>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text}/>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <View style={{ padding: 10, backgroundColor: '#f7b733', marginBottom: 10, marginTop: 10, borderColor: '#f7b733', borderWidth: 3, borderRadius: 10}} >
          <Text style ={{fontSize:20, color: '#fff'}} onPress={() => navigation.navigate('CurrentWeather')}>Search Weather</Text>
        </View>
        <View style={{ padding: 10, backgroundColor: '#f7b733', marginBottom: 10, marginTop: 10, borderColor: '#f7b733', borderWidth: 3, borderRadius: 10}} >
          <Text style ={{fontSize:20, color: '#fff'}} onPress={() => navigation.navigate('CurrentWeather')}>Search Forecast</Text>
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
  fetch('https://api.openweathermap.org/data/2.5/weather?q=ankara&appid=1f3b675bf27e4e2e0ec49c0f6a5bc146')
  .then((response) => response.json())
  .then((json) =>
  {
    setTemperature(json.main.temp)
    setWeather(json.weather[0].main)
    /*this.setState({
          temperature: json.main.temp,
          weather: json.weather[0].main,
    });*/

  });

  return(
      <View style={[styles.weatherContainer,{ backgroundColor: weatherConditions[weather].color }]}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
          </Text>
        </View>
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
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
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


function ChartTheDataToday({ navigation, route })
{
  const [text, onChangeText] = React.useState(null);
  return(
    <View style={{ flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor: '#fff', paddingBottom: 50}}>

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <Image source={{uri: 'https://scx2.b-cdn.net/gfx/news/hires/2019/weatherforec.jpg'}} style={{width: 400, height: 350}}/>
      </View>

      <View style={{flexDirection:'row'}}>
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
              backgroundColor: '#f7b733',
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
          name="ChartTheDataToday"
          component={ChartTheDataToday}
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
        name="CurrentWeather"
        component={CurrentWeather}
        options={{
          title: 'Current Weather',
          backgroundColor: '#f7b733',
          headerStyle: {
            backgroundColor: weatherConditions['Clear'].color,
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
