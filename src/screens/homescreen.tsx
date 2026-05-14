import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const button = () => {
    Alert.alert('uyari', "deneme yazili butona basildi");
  }

  const [gorev, setGorev] = useState<number>(0);

  type DataItem = {
    id: number;       
    title: string;
  };

  const Data: DataItem[] = [
    { id: 1,  title: 'one' },    
    { id: 2,  title: 'two' },
    { id: 3,  title: 'three' },
    { id: 4,  title: 'four' },
    { id: 5,  title: 'five' },
    { id: 6,  title: 'six' },
    { id: 7,  title: 'seven' },
    { id: 8,  title: 'eight' },
    { id: 9,  title: 'nine' },
    { id: 10, title: 'ten' },
    { id: 11, title: 'eleven' },
    { id: 12, title: 'twelve' },
    { id: 13, title: 'thirteen' },
    { id: 14, title: 'fourteen' },
    { id: 15, title: 'fifteen' },
    { id: 16, title: 'sixteen' },
    { id: 17, title: 'seventeen' },
    { id: 18, title: 'eighteen' },
    { id: 19, title: 'nineteen' },
    { id: 20, title: 'twenty' },
    { id: 21, title: 'twenty-one' },
    { id: 22, title: 'twenty-two' },
    { id: 23, title: 'twenty-three' },
    { id: 24, title: 'twenty-four' },
    { id: 25, title: 'twenty-five' }, 
    { id: 26, title: 'twenty-six' },
    { id: 27, title: 'twenty-seven' },
    { id: 28, title: 'twenty-eight' },
    { id: 29, title: 'twenty-nine' },
    { id: 30, title: 'thirty' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ust}>
        <TouchableOpacity style={styles.button} onPress={button}>
          <Text style={{ fontSize: 20, color: '#000000', textAlign: 'center' }}>+ New</Text>
        </TouchableOpacity>
        <Text style={styles.textust}>Gorevler</Text>
        <Text style={styles.gorev}>mevcut gorevler: {gorev}</Text>
      </View>
      <View style={styles.orta}>
        <FlatList
          data={Data}
          renderItem={({ item }) => (
            <Text style={styles.text}>{item.id}. {item.title}</Text>   // ✅ Text komponenti
          )}
          keyExtractor={item => item.id.toString()}   // ✅ number → string
        />
      </View>
      <View style={styles.alt}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   width:'100%',
   height:'100%',
   backgroundColor: '#b3d2ff' ,
  },
   ust: {
    flex:1.5,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#e0e0e0',
   },
   orta:{
    flex:11,
    justifyContent:'space-between',
    backgroundColor:'#e0e0e0',
   },
   alt:{
    flex:1,
    justifyContent:'flex-end',
   },
  text: { 
    color: '#00bfff',
    fontSize: 22,
    fontWeight: 'bold' 
  },
  button: {
    position:'absolute',
    right:10,
    top:'25%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ff0000',
    width:85,
    height:45,
    borderRadius:50,
    borderColor:'#000000',
    borderWidth:2,
  },
  textust:{
    position:'absolute',
    left:10,
    top:20,
    justifyContent:'center',
    alignItems:'center',
    color:'#000000',
    fontSize:20,
    fontWeight:'bold'

  },
  gorev:{
    position:'absolute',
    left:15,
    bottom:10,
    fontWeight:'bold',
  },
});