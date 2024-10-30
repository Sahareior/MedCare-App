import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useGetAppointmentQuery } from '../Redux/slices/apiSlice';
import { useSelector } from 'react-redux';

const Historyscreen = () => {

  const currentUser = useSelector((state) => state.taskStore.currentUser);
  const email = currentUser?.email

  const { data: appointmentData, error, isLoading } = useGetAppointmentQuery(email, {
    skip: !email,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }


  const currentDateTime = new Date();

  const futureAppointments = appointmentData?.appointments?.filter((appointment) => {
    const date = appointment.selectedDate;
    const time = appointment.selectedTime;
  
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
    const appointmentDateTime = new Date(`${formattedDate}T${formattedTime}`);
  
    return appointmentDateTime > currentDateTime;
  }).map(appointment => ({
    ...appointment,
    status: 'upcoming'
  })) || [];
  
  console.log(futureAppointments);

  const pastAppoinments = appointmentData?.appointments?.filter((appointment) => {
    const date = appointment.selectedDate;
    const time = appointment.selectedTime;
  
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
    const appointmentDateTime = new Date(`${formattedDate}T${formattedTime}`);
  
    return appointmentDateTime < currentDateTime;
  }).map(appointment => ({
    ...appointment,
    status: 'Completed'
  })) || [];
  
console.log(pastAppoinments)
  return (
    <ScrollView style={styles.container}>

<View>
  {futureAppointments?.map((appointment, index) => (
        <View key={index} style={styles.card}>
         <Image  resizeMode='cover' source={{uri: appointment?.image}} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialty}>{appointment.doctorSpeciality}</Text>
            <View >
              <Text style={styles.date}>{appointment.selectedDate}</Text>
              <Text className='mt-1' style={styles.time}>{appointment.selectedTime}</Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, styles[appointment.status.toLowerCase()]]}>
              {appointment.status}
            </Text>
          </View>
        </View>
      ))}
  </View>
  <View>
  {pastAppoinments?.map((appointment, index) => (
        <View key={index} style={styles.card}>
          <Image  resizeMode='cover' source={{uri: appointment?.image}} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialty}>{appointment.doctorSpeciality}</Text>
            <View  className=''>
              <Text style={styles.date}>{appointment.selectedDate}</Text>
              <Text className='mt-1' style={styles.time}>{appointment.selectedTime}</Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, styles[appointment.status.toLowerCase()]]}>
              {appointment.status}
            </Text>
          </View>
        </View>
      ))}
  </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  
    backgroundColor: '#f0f4f8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    height:130,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  doctorName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },

  date: {
    fontSize: 13,
    color: '#555',
  },
  time: {
    fontSize: 13,
    color: '#555',
  },
  statusContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom:40
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  upcoming: {
    backgroundColor: '#f39c12',
  },
  completed: {
    backgroundColor: '#2ecc71',
  },
  cancelled: {
    backgroundColor: '#e74c3c',
  },
});

export default Historyscreen;
