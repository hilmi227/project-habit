import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RoutinesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rutinler</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  text: { color: '#00FFFF', fontSize: 22, fontWeight: 'bold' },
});