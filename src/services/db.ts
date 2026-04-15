import * as SQLite from 'expo-sqlite';

// Veri tabanını açıyoruz
const db = SQLite.openDatabaseSync('habit_tracker.db');

export const initDB = () => {
  // Alışkanlıklar tablosu (SQLite formatında)
  db.execSync(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      icon TEXT,
      color TEXT,
      days TEXT, -- 'Pzt,Sal,Çar' gibi string saklayacağız
      type TEXT, -- 'habit', 'addiction', 'task'
      goal_type TEXT, -- 'timer', 'repetition', 'off'
      pomodoro_focus INTEGER,
      pomodoro_break INTEGER,
      repeat_count INTEGER DEFAULT 0,
      is_completed INTEGER DEFAULT 0
    );
  `);
};

export default db;