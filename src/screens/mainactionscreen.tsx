import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  TextInput, ScrollView, Modal, Switch 
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Günler listesi
const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<'habit' | 'addiction' | 'task'>('habit');
  const [title, setTitle] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [goalType, setGoalType] = useState<'off' | 'timer' | 'repeat'>('off');
  
  // Pomodoro Ayarları
  const [isPomodoro, setIsPomodoro] = useState(false);
  const [focusTime, setFocusTime] = useState('25');
  const [breakTime, setBreakTime] = useState('5');

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <View style={styles.container}>
      {/* ÜST TABLAR (Chrome Sekmeleri gibi) */}
      <View style={styles.tabContainer}>
        {['habit', 'addiction', 'task'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'habit' ? 'Alışkanlık' : tab === 'addiction' ? 'Bırakma' : 'Görev'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.form}>
        {/* İSİM VE RENK SEÇİMİ */}
        <View style={styles.section}>
          <Text style={styles.label}>Alışkanlık İsmi & Renk</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={styles.input} 
              placeholder="Örn: Kitap Oku..." 
              value={title}
              onChangeText={setTitle}
            />
            <View style={[styles.colorDot, { backgroundColor: selectedColor }]} />
          </View>
          <View style={styles.colorRow}>
            {COLORS.map(c => (
              <TouchableOpacity 
                key={c} 
                style={[styles.colorOption, { backgroundColor: c }]} 
                onPress={() => setSelectedColor(c)}
              />
            ))}
          </View>
        </View>

        {/* GÜN SEÇİMİ */}
        <View style={styles.section}>
          <Text style={styles.label}>Aktif Günler</Text>
          <View style={styles.daysRow}>
            {DAYS.map(day => (
              <TouchableOpacity 
                key={day} 
                style={[styles.dayCircle, selectedDays.includes(day) && { backgroundColor: selectedColor }]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[styles.dayText, selectedDays.includes(day) && { color: '#fff' }]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* HEDEF AYARLARI */}
        <View style={styles.section}>
          <Text style={styles.label}>Hedef Tipi</Text>
          <View style={styles.goalRow}>
            {['off', 'timer', 'repeat'].map(type => (
              <TouchableOpacity 
                key={type}
                style={[styles.goalBtn, goalType === type && styles.activeGoalBtn]}
                onPress={() => setGoalType(type as any)}
              >
                <Text>{type === 'off' ? 'Kapalı' : type === 'timer' ? 'Süre' : 'Tekrar'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SÜRE (TIMER) SEÇİLİRSE ÇIKACAK PANEL */}
          {goalType === 'timer' && (
            <View style={styles.subSection}>
              <View style={styles.switchRow}>
                <Text>Pomodoro Modu</Text>
                <Switch value={isPomodoro} onValueChange={setIsPomodoro} />
              </View>
              {isPomodoro && (
                <View style={styles.pomodoroInputs}>
                  <TextInput placeholder="Odak (dk)" keyboardType="numeric" style={styles.smallInput} />
                  <TextInput placeholder="Mola (dk)" keyboardType="numeric" style={styles.smallInput} />
                </View>
              )}
            </View>
          )}
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: selectedColor }]}>
          <Text style={styles.saveBtnText}>Veritabanına Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC', paddingTop: 50 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 15, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: '#E2E8F0', borderRadius: 10, marginHorizontal: 2 },
  activeTab: { backgroundColor: '#fff', borderBottomWidth: 3, borderBottomColor: '#82baff' },
  tabText: { color: '#718096', fontWeight: 'bold' },
  activeTabText: { color: '#2D3748' },
  form: { padding: 20 },
  section: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#4A5568' },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15 },
  input: { flex: 1, height: 50, fontSize: 16 },
  colorDot: { width: 20, height: 20, borderRadius: 10, marginLeft: 10 },
  colorRow: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  colorOption: { width: 35, height: 35, borderRadius: 17 },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDF2F7', justifyContent: 'center', alignItems: 'center' },
  dayText: { fontSize: 12, fontWeight: 'bold' },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  goalBtn: { padding: 10, backgroundColor: '#EDF2F7', borderRadius: 8, flex: 1, alignItems: 'center', marginHorizontal: 3 },
  activeGoalBtn: { backgroundColor: '#CBD5E0' },
  subSection: { marginTop: 15, padding: 15, backgroundColor: '#fff', borderRadius: 12 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pomodoroInputs: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  smallInput: { borderBottomWidth: 1, borderColor: '#CBD5E0', width: '45%', textAlign: 'center' },
  saveBtn: { padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 100 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});