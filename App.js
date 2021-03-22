import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyChart } from './MyChart';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([ // https://reactnavigation.org/docs/troubleshooting/
  'Non-serializable values were found in the navigation state',
]);
//const weatherData=[{''}];
function HomeScreen({ navigation, route })
{

  const [text, onChangeText] = React.useState(null);
  const [weatherData, setWeatherData] = React.useState("hello");
  const getWeatherDataFromApi = () =>
  {
     fetch('https://api.openweathermap.org/data/2.5/weather?q=dublin&appid=1f3b675bf27e4e2e0ec49c0f6a5bc146')
      .then((response) => response.json())
      .then((json) => {
        if(json){
          setWeatherData(json.weather);
          console.log(json.weather);
          console.log(weatherData);
        }
        else(
          console.log("error")
        )
      })
      .catch((error) => {
        console.error("error");
      });
    }

  return (
    <View style={{ flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: '#fff',
                   paddingBottom: 50
                 }}>

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#778899' }}>

      <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Please Enter The Name Of The City"
      />


      <Image source={{uri: 'https://scx2.b-cdn.net/gfx/news/hires/2019/weatherforec.jpg'}}
               style={{width: 400, height: 350}} />
        <Text style={{ margin: 10 ,color:'#000',padding: 5,backgroundColor: '#fff',borderColor: '#000', borderWidth: 2, borderRadius: 10}}>Weather Data:
        </Text>

      </View>
      <View style={{flexDirection:'row'}}>
      <View style={{ padding: 5, backgroundColor: '#FFFF33', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
      <Text style ={{fontSize:20}}onPress={() => navigation.navigate('ChartTheDataToday')}>
      Search Weather
      </Text>
      </View>
      <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
    <Text style ={{fontSize:20}}onPress={() => navigation.navigate('ChartTheData')}>
      Search Forecast
    </Text>

    </View>
    <View style={{ padding: 5, backgroundColor: '#0f0', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
    <Text style ={{fontSize:20}} onPress={getWeatherDataFromApi}>
      Search
    </Text>

    </View>
    </View>
    </View>

  );
}

function ChartTheData({ navigation, route }) {
//  if(route.params.show == false){
  //  return null;
  //}

  let lineData = {interpolation: 'T', data: [10, 12, 8, 9, 10, 5, 0, -5],
                  nativeData: {
                    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat","Sun"],
                    datasets: [
                    {
                      data: [
                        Math.random() * 90,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }
  };
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#1e90ff',
                   paddingBottom: 50
                 }}>
      <View style={{ backgroundColor: '#ffffff', borderColor: '#000000', borderWidth: 2, padding: 2 }} >
        <MyChart dataToChart = {lineData}> </MyChart>
      </View>
      <View style={{ padding: 5, marginTop: 10, backgroundColor: '#c0c0c0', borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.goBack()}>
          Done (back to Home screen)
        </Text>
      </View>
    </View>
  );
}

function ChartTheDataToday({ navigation, route }) {
 const [text, onChangeText] = React.useState(null);

  return (
    <View style={{ flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: '#fff',
                   paddingBottom: 50
                 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>

        <Image source={{uri: 'https://scx2.b-cdn.net/gfx/news/hires/2019/weatherforec.jpg'}}
               style={{width: 400, height: 350}} />

      </View>
      <View style={{flexDirection:'row'}}>



    </View>
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
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
