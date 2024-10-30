import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePostAppointmentMutation } from '../Redux/slices/apiSlice';
import { useSelector } from 'react-redux';

const AppointmentScreen = ({route}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calender,setCalender] = useState({})
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const id = route?.params.id
  const specialization = route?.params.specialization;
  const docName = route?.params.name;
  const image = route?.params.image

  const currentUser = useSelector((state) => state.taskStore.currentUser);
  // console.log(currentUser.email)
  const navigation = useNavigation(); 
   const [postAppointment, { isLoading, isSuccess, isError }] = usePostAppointmentMutation();

  const onDateChange = (event, selected) => {
    const currentDate = selected ;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const onTimeChange = (event, selected) => {
    const currentTime = selected;
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };
const email = currentUser?.email
console.log(email)

  const handleConfirm = () => {

 
    const data = {
      doctorId:id,
      doctorName: docName,
      doctorSpeciality: specialization,
      name,
      phone,
      image,
      address,
      email,
      selectedDate: selectedDate?.toLocaleDateString(),
      selectedTime: selectedTime?.toLocaleTimeString(),
      rating: 4.8
    };
setCalender(data)
postAppointment(data)
if(!isLoading){
  navigation.navigate('Tabs')
}
  };

  return (
    <ScrollView className='bg-neutral-200' contentContainerStyle={{ padding: 20 }}>
      <Text className="text-2xl font-bold mb-4">Book an Appointment</Text>

      {/* Date Picker */}
      <Text className="text-lg mb-2">Select Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} className="bg-fuchsia-400 rounded-md p-2 mb-4">
        <Text className="text-white text-center">
         {
          selectedDate?moment(selectedDate).format('Do MMM YYYY'):"Pick a date"
         }
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Time Picker */}
      <Text className="text-lg mb-2">Select Time:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} className="bg-blue-500 rounded-md p-2 mb-4">
      <Text className="text-white text-center">
         {
          selectedTime?moment(selectedTime).format('HH:mm'):"Pick a time"
         }
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      {/* Name Input */}
      <Text className="text-lg mb-2">Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        className="border border-gray-300 rounded-md p-2 mb-4"
      />

      {/* Phone Input */}
      <Text className="text-lg mb-2">Phone:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone"
        keyboardType="phone-pad"
        className="border border-gray-300 rounded-md p-2 mb-4"
      />

      {/* Address Input */}
      <Text className="text-lg mb-2">Address:</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
        className="border border-gray-300 rounded-md p-2 mb-4"
      />

      {/* Submit Button */}
      <TouchableOpacity onPress={handleConfirm} className="bg-green-500 rounded-md p-3">
        <Text className="text-white text-center">Confirm Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AppointmentScreen;
