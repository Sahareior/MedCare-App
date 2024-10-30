import { View, Text, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useGetDoctorsQuery } from '../../../Redux/slices/apiSlice';

const AdminScreen = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const { data:doctors } = useGetDoctorsQuery({});

  const toggleTopListed = (id) => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor.id === id ? { ...doctor, isTopListed: !doctor.isTopListed } : doctor
      )
    );
  };

  const deleteDoctor = (id) => {
    Alert.alert(
      "Delete Doctor",
      "Are you sure you want to delete this doctor?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => setDoctors((prevDoctors) => prevDoctors.filter(doctor => doctor.id !== id)) },
      ]
    );
  };

  const filteredDoctors = selectedSpecialization
    ? doctors.filter((doctor) => doctor.specialization === selectedSpecialization)
    : doctors;

  const specializations = [...new Set(doctors.map((doctor) => doctor.specialization))];

  const renderDoctor = ({ item }) => (
    <View style={{ 
      flexDirection: 'row', 
      padding: 15, 
      marginVertical: 10, 
      borderRadius: 8, 
      borderColor: '#ddd', 
      borderWidth: 1, 
      backgroundColor: '#fff', 
      shadowColor: '#000', 
      shadowOpacity: 0.2, 
      shadowRadius: 5,
      elevation: 2 
    }}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-photo/portrait-young-handsome-man-jean-shirt-smiling-with-crossed-arms_176420-12083.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid' }}
        style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
      />
      
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: item.isTopListed ? 'bold' : 'normal' }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 16, color: '#888' }}>{item.specialization}</Text>
      </View>
      
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => toggleTopListed(item.id)} style={{ marginBottom: 10 }}>
          <Icon 
            name={item.isTopListed ? 'star' : 'star-o'} 
            size={24} 
            color={item.isTopListed ? '#f8c102' : '#888'} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteDoctor(item.id)}>
          <Icon name="trash" size={24} color="#e63946" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Admin - Doctor Management</Text>
      
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => setSelectedSpecialization(null)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: selectedSpecialization === null ? '#007bff' : '#ddd',
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          <Text style={{ color: selectedSpecialization === null ? '#fff' : '#333' }}>All</Text>
        </TouchableOpacity>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {specializations.map((specialization) => (
          <TouchableOpacity
            key={specialization}
            onPress={() => setSelectedSpecialization(specialization)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: selectedSpecialization === specialization ? '#007bff' : '#ddd',
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ color: selectedSpecialization === specialization ? '#fff' : '#333' }}>
              {specialization}
            </Text>
          </TouchableOpacity>
        ))}
  </ScrollView>
      </View>

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item._id}
        renderItem={renderDoctor}
      />
    </View>
  );
};

export default AdminScreen;
