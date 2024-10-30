import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../Redux/slices/taskSlice';



const SignScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Handle email/password sign-in
  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Signed in successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Handle Google sign-in
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;  // Corrected here
  
      if (!idToken) {
        Alert.alert('Error', 'Failed to retrieve ID token');
        return;
      }
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      

      Alert.alert('Success', 'Google sign-in successful!');
      navigation.navigate("Tabs")
    } catch (error) {
      console.error("Google Sign-In error:", error);
      Alert.alert('Error', error.message);
    }
  };
  

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1556742400-b5b7c5129fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGhvczR8fHwwfHx8fDE2NTc1Nzc2Mjc&ixlib=rb-1.2.1&q=80&w=1080' }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Welcome to HealthConnect</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
          <Icon name="google" size={24} color="#fff" />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light overlay for better readability
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: '#004aad', // Hospital-blue color
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#cfd8dc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    width: '90%',
    backgroundColor: '#007bb5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#004aad',
    marginVertical: 10,
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#db4437',
    paddingVertical: 10,
    borderRadius: 12,
    width: '90%',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default SignScreen;
