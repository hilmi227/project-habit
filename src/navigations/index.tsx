import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MainScreen from '../screens/mainactionscreen';

type RootTabParamList = {
  Home: undefined;
  Routines: undefined;
  Main: undefined;
  Calendar: undefined;
  Profile: undefined;
};

const HomeScreen = () => (
  <View style={styles.center}><Text>Ana Sayfa</Text></View>
);
const RoutineScreen = () => (
  <View style={styles.center}><Text>Rutinler</Text></View>
);
const CalendarScreen = () => (
  <View style={styles.center}><Text>Gelecek Planları</Text></View>
);
const ProfileScreen = () => (
  <View style={styles.center}><Text>Profil ve Ayarlar</Text></View>
);

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

  const scale = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const translateY = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

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
          tabBarIcon: ({ focused }: { focused: boolean; color: string; size: number }) => {
            let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

            if (route.name === 'Home') iconName = 'home-variant';
            else if (route.name === 'Routines') iconName = 'format-list-checks';
            else if (route.name === 'Main') iconName = 'plus-circle';
            else if (route.name === 'Calendar') iconName = 'calendar-month';
            else if (route.name === 'Profile') iconName = 'account-cog';
            else iconName = 'help-circle';

            return <AnimatedIcon focused={focused} iconName={iconName} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Routines" component={RoutineScreen} />
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
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