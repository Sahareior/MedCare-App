import React, { useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useGetAppointmentQuery } from '../Redux/slices/apiSlice';
import { useSelector } from 'react-redux';

const PendingScreen = () => {

  const [time, setTime] = useState(null)
  
  const currentUser = useSelector((state) => state.taskStore.currentUser);
  const email = currentUser?.email

  const { data: appointmentData, error, isLoading } = useGetAppointmentQuery(email, {
    skip: !email,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const currentDateTime = new Date();
  // console.log("S",currentDateTime)
  const remainingTime =(time1,time2) =>{
    const sub = time2 - time1 
    const hours = Math.floor(sub / (1000 * 60 * 60));
    const minutes = Math.floor((sub % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((sub % (1000 * 60)) / 1000);
    // console.log(hours,minutes,seconds)
    return {hours,minutes}
  }

// Helper function to format date and time
const formatAppointmentDateTime = (date, time) => {
  const [month, day, year] = date.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  const [timePart, modifier] = time.split(' ');
  let [hours, minutes, seconds] = timePart.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = (parseInt(hours) + 12).toString();
  } else if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return new Date(`${formattedDate}T${formattedTime}`);
};

// Filter and map appointments
const futureAppointments = appointmentData?.appointments
  ?.filter((appointment) => {
    const appointmentDateTime = formatAppointmentDateTime(appointment.selectedDate, appointment.selectedTime);
    return appointmentDateTime > currentDateTime;
  })
  ?.map((appointment) => {
    const appointmentDateTime = formatAppointmentDateTime(appointment.selectedDate, appointment.selectedTime);
    const remTime = remainingTime(currentDateTime, appointmentDateTime);
    return { ...appointment, remTime };
  }) || [];

console.log(futureAppointments)
  const renderAppointment = ({ item: appointment }) => (
    <View
      key={appointment._id}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#00b4d8',
        overflow: 'hidden',
      }}
    >
      <View style={{ flex: 1, marginRight: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#333' }}>{appointment.doctorName}</Text>
        <Text style={{ fontSize: 16, color: '#00b4d8', fontWeight: '600', marginTop: 4 }}>
          {appointment.doctorSpeciality}
        </Text>
        <Text style={{ marginTop: 8, color: '#555' }}>
          Date: <Text style={{ fontWeight: 'bold' }}>{appointment.selectedDate}</Text>
        </Text>
        <Text style={{ color: '#555' }}>
          Time: <Text style={{ fontWeight: 'bold' }}>{appointment.selectedTime}</Text>
        </Text>
        <Text className='text-red-500 font-semibold mt-2'>Remaining Time: {appointment.remTime.hours} hours {appointment.remTime.minutes} min</Text>
      </View>
      <Image 
        source={{ uri: 'https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid' }}
        style={{ width: 120, height: 100, borderRadius: 12 }}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <LinearGradient colors={['#53565A', '#0077b6']} style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}>
      <FlatList
        data={futureAppointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 16 }}>Pending Appointments</Text>}
        ListEmptyComponent={<Text style={{ fontSize: 18, color: '#ffffff', textAlign: 'center', marginTop: 20 }}>No pending appointments</Text>}
        contentContainerStyle={{ flexGrow: 1, justifyContent: futureAppointments.length === 1 ? 'center' : 'flex-start' }}
      />
    </LinearGradient>
  );
};

export default PendingScreen;
