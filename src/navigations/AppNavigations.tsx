import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/homescreen';
import RoutinesScreen from '../screens/routinescreen';
import MainActionScreen from '../screens/mainactionscreen';
import CalendarScreen from '../screens/calendarscreen';
import ProfileScreen from '../screens/profilescreen';

type RootTabParamList = {
  Home: undefined;
  Routines: undefined;
  Main: undefined;
  Calendar: undefined;
  Profile: undefined;
};

const AnimatedIcon = ({
  focused,
  iconName,
}: {
  focused: boolean;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
}) => {
  const animVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animVal, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  }, [focused]);

  const scale = animVal.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });
  const translateY = animVal.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={focused ? '#00FFFF' : '#8a8a8a'}
      />
    </Animated.View>
  );
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        id={undefined}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused }) => {
            const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
              Home: 'home-variant',
              Routines: 'format-list-checks',
              Main: 'plus-circle',
              Calendar: 'calendar-month',
              Profile: 'account-cog',
            };
            const iconName = icons[route.name] ?? 'help-circle';
            return <AnimatedIcon focused={focused} iconName={iconName} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Routines" component={RoutinesScreen} />
        <Tab.Screen name="Main" component={MainActionScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A202C',
    height: 70,
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 20,
    borderTopWidth: 0,
    elevation: 10,
    paddingBottom: 0,
  },
});