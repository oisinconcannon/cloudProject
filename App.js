import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyChart } from './MyChart';
import { YellowBox } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state',]);


//const weatherData=[{''}];
function HomeScreen({ navigation, route })
{

  const [text, onChangeText] = React.useState(null);


  return(
    <View style={{ flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor: '#fff',paddingBottom: 50}}>

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#778899' }}>
          <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Please Enter The Name Of The City"/>

      </View>

      <View style={{flexDirection:'row'}}>
        <View style={{ padding: 5, backgroundColor: '#FFFF33', marginBottom: 10, marginTop: 10, borderColor: '#000', borderWidth: 2, borderRadius: 10, }} >
          <Text style ={{fontSize:20}}onPress={() => navigation.navigate('ChartTheDataToday')}>Search Weather</Text>
        </View>
        <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#000', borderWidth: 2, borderRadius: 10, }} >
          <Text style ={{fontSize:20}}onPress={() => navigation.navigate('ChartTheData')}>Search Forecast</Text>
        </View>

      </View>

    </View>
  );
}

function ChartTheData({ navigation, route })
{
  const [text, onChangeText] = React.useState(null);
  const getWeatherDataFromApi = () =>
  {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=53.2719&lon=-9.0489&exclude=&appid=1f3b675bf27e4e2e0ec49c0f6a5bc146')

    .then((response) => response.json())
    .then((json) =>
    {
      if(json)
      {
        console.log(json);
      }
      else(console.log("error"));
    })
    .catch((error) =>
    {
      console.error("error");
    });
  }

  return(
    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor: '#1e90ff',paddingBottom: 50}}>

      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Please Enter The Name Of The City"/>

      <View style={{ padding: 5, backgroundColor: '#0f0', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style ={{fontSize:20}} onPress={getWeatherDataFromApi}>Search</Text>
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

  const [weatherData, setWeatherData] = React.useState("");
  const [weatherTemp, setWeatherTemp] = React.useState("");
  const [weatherName, setWeatherName] = React.useState("");
  const [weatherTempMin, setWeatherTempMin] = React.useState("");
  const [weatherTempMax, setWeatherTempMax] = React.useState("");
  const [weatherHumidity, setWeatherHumidity] = React.useState("");
  const [cityName, setCityName] = React.useState("");

  const getWeatherDataFromApi = () =>
  {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ text + '&appid=1f3b675bf27e4e2e0ec49c0f6a5bc146')
    .then((response) => response.json())
    .then((json) =>
    {
      if(json)
      {
        setWeatherData(json.weather[0].description);
        setWeatherTemp((json.main.temp)-273.15);
        setWeatherName(json.name);
        setWeatherHumidity(json.main.humidity +'%');
        setWeatherTempMin((json.main.temp_min)-273.15);
        setWeatherTempMax((json.main.temp_max)-273.15);
        setCityName("Weather in:" + weatherName);
        console.log(json);
          console.log(cityName);
        console.log(weatherData);
      }
      else(console.log("error"));
    })
    .catch((error) =>
    {
      console.error("error");
    });
  }
  return(
    <View style={{ flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor: '#fff', paddingBottom: 50}}>

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <View style={{flexDirection:'row'}}>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Please Enter The Name Of The City"/>
      <View style={{ padding: 5, backgroundColor: '#0f0', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style ={{fontSize:20}} onPress={getWeatherDataFromApi}>Search</Text>
      </View>
      </View>
        <Text style={{ margin: 10 ,color:'#000',padding: 5,backgroundColor: '#fff',borderColor: '#000', borderWidth: 2, borderRadius: 10}}>
City Name : {weatherName} Weather Summary: {weatherData} Temp: {weatherTemp} Temp Min: {weatherTempMin} Temp Max: {weatherTempMax} Humidity: {weatherHumidity}</Text>
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
            title: 'OL Forecast',
            headerStyle: {
              backgroundColor: '#1E90FF',
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
            title: 'Current Weather',
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


      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },

});
