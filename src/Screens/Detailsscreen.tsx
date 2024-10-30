import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const DetailsScreen = ({ route }) => {
  const [seeMore,setSeeMore] = useState(false)
const doctor = route?.params.docData

const currentUser = useSelector((state) => state.taskStore.currentUser);
const email = currentUser?.email
  // const  = docData[0];
  const navigation = useNavigation();

 

  

  return (
    <SafeAreaView>
      <ScrollView className="bg-gray-100 ">
        <View className="bg-neutral-300 rounded-lg shadow-lg py-9 p-2">
          {/* Doctor Image */}
          <Image
            source={{ uri: doctor?.image }}
            className="w-full h-64  rounded-lg"
            resizeMode="cover"
          />

          {/* Doctor Name and Specialization */}
          <View className="mt-4 flex-row justify-between  items-center">
            <View>
              <Text className="text-3xl font-bold text-black">{doctor.name}</Text>
              <Text className="text-xl text-red-500 mt-1">{doctor.specialization}</Text>
            </View>
            <Text className="text-yellow-500 text-sm">
              ⭐ {doctor.rating} 
            </Text>
          </View>

          {/* Additional Info */}
          <View className="flex-row mt-4 mb-7 items-center justify-between">
            <View className="mt-3 space-y-1  items-center">
              <View className="  ">
                <Icon name="people" size={36} color="black" />
              </View>
              <Text className="text-gray-600 font-bold text-sm ml-2">116+</Text>
              <Text className='font-bold'>Patients</Text>
            </View>
            <View className="mt-3 space-y-1 items-center">
              <View className="">
                <Icon name="time-outline" size={36} color="black" />
              </View>
              <Text className="text-gray-600 font-bold text-sm ml-2">{doctor.experienceYears}+</Text>
              <Text className='font-bold'>Years</Text>
            </View>
            <View className="mt-3 space-y-1 items-center">
              <View className="">
                <Icon name="star" size={36} color="yellow" />
              </View>
              <Text className="text-gray-600 font-bold text-sm ml-2">{doctor.rating}</Text>
              <Text className='font-bold'>Rating</Text>
            </View>
            <View className="mt-3 space-y-1 items-center">
              <View className="">
                <Icon name="newspaper" size={36} color="black" />
              </View>
              <Text className="text-gray-600 font-bold text-sm ml-2">90+</Text>
              <Text className='font-bold'>Reviews</Text>
            </View>
          </View>
{/* <View className='w-full bg-black h-[0.5px] mt-4'></View> */}
          {/* Available Times */}
          <View className="mt-4">
            <Text className="text-xl font-bold border-b-2  text-gray-600 ">Available Times:</Text>
            {doctor.availableTimes.map((time, index) => (
              <Text key={index} className="text-gray-800 mt-3">
                {time.day}: {time.slots.map(slot => `${slot.startTime} - ${slot.endTime}`).join(", ")}
              </Text>
            ))}
          </View>

          {/* Contact Information */}
          <View className="mt-4">
            <Text className="text-xl font-bold text-gray-600 border-b-2  ">Phone:</Text>
            <Text className="text-gray-800 mt-3">{doctor.contactInfo.phone}</Text>
          </View>

          {/* About Me Section */}
          <View className="mt-4">
            <Text className="text-xl border-b-2 font-bold text-gray-600">About Me:</Text>
            <Text className="text-gray-800 mt-4">
    {seeMore ? doctor.aboutMe : `${doctor.aboutMe.slice(0, 100)}...`}
  </Text>
            <TouchableOpacity onPress={() => setSeeMore(!seeMore)}>
              <Text className="text-blue-500 font-semibold mt-2">
                {seeMore ? "See Less" : "See More"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Book Appointment Button */}
          <TouchableOpacity
  onPress={() => {
    if (!email) {
      Alert.alert('Please sign in first');
    } else {
      navigation.navigate("Appo", { id: doctor._id, name: doctor.name, specialization: doctor.specialization, image: doctor.image });
    }
  }}
  className="bg-blue-600 rounded-xl mt-9 p-3 w-64 mx-auto my-4"
  style={{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  }}
>
            <Text className="text-white text-center font-semibold text-lg">Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
