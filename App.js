import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyChart } from './MyChart';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([ // https://reactnavigation.org/docs/troubleshooting/
  'Non-serializable values were found in the navigation state',
]);

function HomeScreen({ navigation, route }) {



  return (
    <View style={{ flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#778899' }}>
        <Image source={{uri: 'https://scx2.b-cdn.net/gfx/news/hires/2019/weatherforec.jpg'}}
               style={{width: 400, height: 350}} />
        <Text style={{ margin: 10 ,color:'#fff',padding: 5,backgroundColor: '#778899',borderColor: '#fff', borderWidth: 2, borderRadius: 10}}>This App
is designed to display weather for a current day or current week using Yahoo weather api.
        </Text>

      </View>
      <View style={{flexDirection:'row'}}>
      <View style={{ padding: 5, backgroundColor: '#FFFF33', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
      <Text style ={{fontSize:20}}onPress={() => navigation.navigate('ChartTheData')}>
      Search Weather
      </Text>
      </View>
      <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
    <Text style ={{fontSize:20}}onPress={() => navigation.navigate('ChartTheData')}>
      Search Forecast
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

  let lineData = {interpolation: 'T', data: [0, 5, 10, 15, 10, 5, 0, -5],
                  nativeData: {
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                    {
                      data: [
                        Math.random() * 90,
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
        <MyChart dataToChart = {lineData} > </MyChart>
      </View>
      <View style={{ padding: 5, marginTop: 10, backgroundColor: '#c0c0c0', borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.goBack()}>
          Done (back to Home screen)
        </Text>
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
              backgroundColor: '#708090',
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
});
