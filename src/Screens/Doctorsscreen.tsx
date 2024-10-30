import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './Components/Home/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Searchbar from './Components/Home/Searchbar';
import Slider from './Components/Home/Slider';
import Doctors from './Components/Home/Doctors';
import { useNavigation } from '@react-navigation/native';
import { useGetDoctorsQuery } from '../Redux/slices/apiSlice';

const Doctorsscreen = () => {
  const [category, setCategory] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null); // State to track selected specialization
  const navigation = useNavigation();
  const { data } = useGetDoctorsQuery({});

  useEffect(() => {
    if (data) {
      const uniqueSpecializations = [...new Set(data.map(d => d.specialization))];
      setCategory(uniqueSpecializations);
    }
  }, [data]);

  const handleSpecializationPress = specialization => {
    setSelectedSpecialization(specialization); // Set selected specialization
  };

  // Filter doctors based on selected specialization
  const filteredDoctors = selectedSpecialization
    ? data.filter(d => d.specialization === selectedSpecialization)
    : data;

  return (
    <SafeAreaView className="bg-zinc-200 py-6" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View>
          <Text className="text-2xl font-bold px-5 text-blue-600 mb-6">Our Doctors</Text>

          {/* Category filter buttons slider */}
          <FlatList
            data={['All', ...category]} // Add "All" button to the category array
            horizontal
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSpecializationPress(item === 'All' ? null : item)} // Clear filter if "All" is selected
                className={`px-4 py-2 m-2 rounded-full ${selectedSpecialization === item ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <Text className={`text-lg ${selectedSpecialization === item ? 'text-white' : 'text-black'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
          />

          <FlatList
            data={filteredDoctors} // Use filtered data
            numColumns={2}
            keyExtractor={item => item._id} // Unique key for each item
            renderItem={({ item }) => (
              <Doctors data={item} />
            )} // Render Doctors component with item as prop
            scrollEnabled={false} // Disable FlatList scrolling so ScrollView takes over
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Doctorsscreen;
