import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {

    const puan:number =50;
    const mesaj1:string ="tebrikler";
    const mesaj2:string ="tekrar deneyiniz";

  return (
    <View style={styles.container}>

        <View>
            <Text style={{color: '#8400ff', fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>
                {puan}
            </Text>
            <Text style={{color: '#ff0000', fontSize: 22,}}>
                {puan>=60 ? mesaj1 : mesaj2}
            </Text>
        </View>
      <Text style={styles.text}>Ana Sayfa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  text: { color: '#00FFFF', fontSize: 22, fontWeight: 'bold' },
});