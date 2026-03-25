
import React, { useState } from 'react'; // 1. useState'i buraya ekledik
import { FlatList, View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  
  // 2. Kasa (State) artık fonksiyonun İÇİNDE
  const [habit, setHabits] = useState([
    { id: '1', title: 'Deneme 1' },
    { id: '2', title: 'Deneme 2' }
  ]);

  // 3. Şablon (Kalıp)
  const renderHabit = ({ item }) => (
    <View style={styles.habitcard}>
      <Text style={styles.habitText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GÜNLÜK </Text>

      {/* 4. FlatList kullanımı düzeltildi */}
      <FlatList
        data={habit}
        renderItem={renderHabit}
        keyExtractor={item => item.id}
        style={{ width: '100%' }} // Listenin tam genişlik kaplaması için
      />

      <Button 
        title="Analiz Sayfasına Git" 
        onPress={() => navigation.navigate('Stats')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50, // Listenin en üste yapışmaması için
    alignItems: 'center',
    backgroundColor: '#fff' 
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  habitcard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  habitText: { fontSize: 18 }
});