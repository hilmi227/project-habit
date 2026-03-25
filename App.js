import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens;
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/Statsscreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Ana sayfa' }} 
        />
        <Stack.Screen 
          name="Stats" 
          component={StatsScreen} 
          options={{ title: 'Analiz' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//en son guncellee
