import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePostNewDocMutation } from '../../Redux/slices/apiSlice';
import auth from '@react-native-firebase/auth';

const RegScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    image:'',
    specialization: '',
    experienceYears: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    day: '',
    startTime: null,
    endTime: null,
    aboutMe: '',
  });
  const [availability, setAvailability] = useState({});
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [postNewDoc,{ isLoading, isSuccess, isError }] = usePostNewDocMutation()
  const currentUser = auth().currentUser;

  const specializations = [
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Orthopedic',
    'Psychiatrist',
    'General Physician',
    'Endocrinologist',
    'Gastroenterologist',
    'Oncologist',
    'Pulmonologist',
    'Radiologist',
    'Urologist',
    'Allergist',
    'Ophthalmologist',
    'Nephrologist',
    'Rheumatologist',
    'Hematologist',
    'Gynecologist',
    'ENT Specialist',
    'Plastic Surgeon',
    'Anesthesiologist',
    'Infectious Disease Specialist',
  ];
  

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onTimeChange = (event, selected, type) => {
    if (type === 'start') {
      setShowStartTimePicker(false);
      handleInputChange('startTime', selected);
    } else if (type === 'end') {
      setShowEndTimePicker(false);
      handleInputChange('endTime', selected);
    }
  };

  const handleAddTimeSlot = () => {
    if (formData.day && formData.startTime && formData.endTime) {
      setAvailability((prev) => ({
        ...prev,
        [formData.day]: [{ startTime: formData.startTime, endTime: formData.endTime }],
      }));
      handleInputChange('startTime', null);
      handleInputChange('endTime', null);
    } else {
      Alert.alert('Error', 'Please select a day, start time, and end time.');
    }
  };

  const handleRegister = () => {
    const doctorData = {
      name: formData.name,
      image:formData.image,
      specialization: formData.specialization,
      experienceYears: parseInt(formData.experienceYears, 10),
      contactInfo: {
        phone: formData.phone,
        email: currentUser?.email,
        address: { street: formData.street, city: formData.city, state: formData.state, zipCode: formData.zipCode },
      },
      aboutMe: formData.aboutMe,
      availableTimes: Object.keys(availability).map((day) => ({
        day,
        slots: availability[day].map((slot) => ({
          startTime: slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          endTime: slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })),
      })),
    };
    postNewDoc(doctorData)
    Alert.alert("Registration Successful", "Doctor has been registered successfully!");
 
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Doctor Registration</Text>
        <TextInput placeholder="Name" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} style={styles.input} />
        <TextInput placeholder="Image Url" value={formData.image} onChangeText={(text) => handleInputChange('image', text)} style={styles.input} />
        
        <Text style={styles.subHeader}>Specialization</Text>
    <View className='border border-fuchsia-500 my-2 bg-slate-200'>
    <Picker
          selectedValue={formData.specialization}
          onValueChange={(value) => handleInputChange('specialization', value)}
          // style={styles.picker}
          
        >
          <Picker.Item label="Select Specialization" value="" />
          {specializations.map((spec, index) => (
            <Picker.Item key={index} label={spec} value={spec} />
          ))}
        </Picker>
    </View>

        <TextInput placeholder="Years of Experience" value={formData.experienceYears} onChangeText={(text) => handleInputChange('experienceYears', text)} style={styles.input} keyboardType="numeric" />
        
        <Text style={styles.subHeader}>About Me</Text>
        <TextInput placeholder="About Me" value={formData.aboutMe} onChangeText={(text) => handleInputChange('aboutMe', text)} style={styles.inputMe} multiline />
        
        <Text style={styles.subHeader}>Contact Information</Text>
        <TextInput placeholder="Phone Number" value={formData.phone} onChangeText={(text) => handleInputChange('phone', text)} style={styles.input} keyboardType="phone-pad" />
        <TextInput placeholder="Email" value={currentUser?.email}  style={styles.input}  keyboardType="email-address" />

        <Text style={styles.subHeader}>Clinic Address</Text>
        <TextInput placeholder="Street" value={formData.street} onChangeText={(text) => handleInputChange('street', text)} style={styles.input} />
        <TextInput placeholder="City" value={formData.city} onChangeText={(text) => handleInputChange('city', text)} style={styles.input} />
        <TextInput placeholder="State" value={formData.state} onChangeText={(text) => handleInputChange('state', text)} style={styles.input} />
        <TextInput placeholder="Zip Code" value={formData.zipCode} onChangeText={(text) => handleInputChange('zipCode', text)} style={styles.input} keyboardType="numeric" />

        <Text style={styles.subHeader}>Available Times</Text>
        <Picker selectedValue={formData.day} onValueChange={(value) => handleInputChange('day', value)} style={styles.picker}>
          <Picker.Item label="Select Day" value="" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>

        <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>
            {formData.startTime ? `Start Time: ${formData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Pick Start Time'}
          </Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker value={new Date()} mode="time" display="default" onChange={(event, selected) => onTimeChange(event, selected, 'start')} />
        )}

        <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>
            {formData.endTime ? `End Time: ${formData.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Pick End Time'}
          </Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker value={new Date()} mode="time" display="default" onChange={(event, selected) => onTimeChange(event, selected, 'end')} />
        )}

        <TouchableOpacity onPress={handleAddTimeSlot} style={styles.timeButton}>
          <Text style={styles.buttonText}>Add Time Slot</Text>
        </TouchableOpacity>

        {Object.keys(availability).map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            {availability[day].map((slot, index) => (
              <Text key={index} style={styles.slotText}>
                {`Start: ${slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, End: ${slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </Text>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 14 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 15, color: '#666' },
  input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginVertical: 10, backgroundColor: '#fff' },
  inputMe: { height: 140, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginVertical: 10, backgroundColor: '#fff', textAlignVertical: 'top' },
  picker: { height: 50, color: '#333' },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, marginVertical: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  timeButton: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  dayContainer: { marginVertical: 10 },
  dayText: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  slotText: { fontSize: 14, color: '#555' },
});

export default RegScreen;
