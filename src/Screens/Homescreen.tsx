import { View, Text, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './Components/Home/Header';
import Searchbar from './Components/Home/Searchbar';
import Slider from './Components/Home/Slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import NewDocCard from './Components/New/NewDocCard';
import { useGetDoctorsQuery } from '../Redux/slices/apiSlice';
import { useSelector } from 'react-redux';

const Homescreen = () => {
    const [category, setCategory] = useState([]); // State to store unique categories
    const navigation = useNavigation();
    const { data } = useGetDoctorsQuery({});

    // Icon mapping for each specialization
    const specializationIcons = {
        'Cardiologist': 'heartbeat',
        'Dermatologist': 'allergies',
        'Pediatrician': 'baby',
        'Neurologist': 'brain',
        'Orthopedic': 'bone',
        'Psychiatrist': 'user-md',
        'General Physician': 'stethoscope',
        'Endocrinologist': 'syringe',
        'Gastroenterologist': 'procedures',
        'Oncologist': 'ribbon',
        'Pulmonologist': 'lungs',
        'Radiologist': 'x-ray',
        'Urologist': 'toilet',
        'Allergist': 'hand-holding-heart',
        'Ophthalmologist': 'eye',
        'Nephrologist': 'tint',
        'Rheumatologist': 'hand-paper',
        'Hematologist': 'vial',
        'Gynecologist': 'female',
        'ENT Specialist': 'deaf',
        'Plastic Surgeon': 'user-nurse',
        'Anesthesiologist': 'mask',
        'Infectious Disease Specialist': 'virus'
    };

    useEffect(() => {
        // Create an array of objects containing both specialization and icon
        const specializationsWithIcons = data?.map(d => ({
            specialization: d.specialization,
            icon: specializationIcons[d.specialization] || 'user-md' // Default icon if not found
        }));

        // Filter for unique specializations based on specialization field
        const uniqueSpecializations = specializationsWithIcons?.filter(
            (item, index, self) =>
                index === self.findIndex(t => t.specialization === item.specialization)
        );

        // Update state to trigger re-render
        setCategory(uniqueSpecializations || []);
    }, [data]); // Dependency on data

    const handleSpecializationPress = (type) => {
        // console.log(`Selected specialization: ${type}`);
        const item = data.filter(doctors=>doctors.specialization === type)
        
        navigation.navigate("Category",{ category: item })
    };



    return (
        <SafeAreaView className='flex-1 bg-gray-700'>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className='bg-red-400 shadow-lg shadow-gray-800 rounded-b-3xl pb-8'>
            <Header navigation={navigation} />
            <Searchbar />
          </View>
  
          <View className='mt-2'>
            <Slider />
  
            <View className='px-1 py-2'>
              <Text className='text-start bg-white shadow-lg text-black shadow-gray-800 rounded-lg font-mono font-bold text-xl px-3 py-4'>
                Choose Your Category
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
                className='mt-4'
              >
                {category?.map((item) => (
                  <TouchableOpacity
                    key={item.specialization}
                    onPress={() => handleSpecializationPress(item.specialization)}
                    className='px-3'
                  >
                    <View className='w-28 bg-yellow-500 h-28 justify-center items-center rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md shadow-indigo-800'>
                      <Icon name={item.icon} size={34} color="#fff" />
                      <Text className='mt-2 text-white font-semibold text-center'>{item.specialization}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
  
            <Text className='text-xl text-black font-mono font-bold px-4 py-4 mt-3 bg-white shadow-lg shadow-gray-800 rounded-lg text-start'>
              Top Doctors
            </Text>
            <FlatList
              data={data}  // Array of data
              className='py-8 px-4'
              ItemSeparatorComponent={() => <View className="h-6" />}
              keyExtractor={(item) => item._id} // Unique key for each item
              renderItem={({ item }) => <NewDocCard data={item} />} // Render Doctors component with item as prop
              scrollEnabled={false} // Disable FlatList scrolling so ScrollView takes over
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

export default Homescreen;
