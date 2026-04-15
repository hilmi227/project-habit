import React, { createContext, useState, useContext } from 'react';

// Alışkanlık tipi
interface Habit {
  id: string;
  title: string;
  color: string;
  days: string[];
  type: 'habit' | 'addiction' | 'task';
  goalType: 'off' | 'timer' | 'repeat';
}

const HabitContext = createContext<any>(null);

export const HabitProvider = ({ children }: any) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const addHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit]);
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);