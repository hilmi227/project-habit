import React from 'react';
import AppNavigation from './src/navigations/index';
import { HabitProvider } from './src/context/Habitcontext';

export default function App() {
  return (
    <HabitProvider>
      <AppNavigation />
    </HabitProvider>
  );
}