import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Doctors from './Components/Home/Doctors';


  const CategoryScreen = ({route}) => {
    const data = route?.params.category
    console.log(data)
    return (
      <SafeAreaView className=" bg-zinc-200 py-6" style={{ flex: 1,paddingBottom:60 }}>
    
        <View>
        <Text className="text-2xl font-bold px-5 text-blue-600 mb-6">Choose Your Doctor</Text>

          <FlatList
            data={data} // Array of data
            numColumns={2}
            keyExtractor={item => item._id} // Unique key for each item
            renderItem={({ item }) => (
                <Doctors data={item} />          
            )} // Render Doctors component with item as prop
          />
        </View>

    </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f9f9f9',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 0,
      marginVertical: 15,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 8,
    },
    image: {
      width: '100%',
      height: 180,
    },
    content: {
      padding: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: 5,
    },
    specialization: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#7f8c8d',
      marginBottom: 5,
    },
    experience: {
      fontSize: 14,
      color: '#34495e',
      marginBottom: 15,
    },
    divider: {
      height: 1,
      backgroundColor: '#ecf0f1',
      marginVertical: 8,
    },
    contactSection: {
      marginBottom: 15,
    },
    contactInfo: {
      fontSize: 14,
      color: '#34495e',
      marginBottom: 5,
    },
    rating: {
      fontSize: 16,
      color: '#f39c12',
      fontWeight: '500',
      marginBottom: 10,
    },
    availableTimes: {
      fontSize: 15,
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: 5,
    },
    timeSlot: {
      fontSize: 14,
      color: '#34495e',
    },
    button: {
      backgroundColor: '#3498db',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  
  export default CategoryScreen;