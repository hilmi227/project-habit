import React from 'react';
import AppNavigation from './src/navigations/index';
import { HabitProvider } from './src/context/Habitcontext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <AppNavigation />
      </HabitProvider>
    </SafeAreaProvider>
  );
}