import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Redux/slices/taskSlice';

const Header = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        // Extract only serializable properties
        const serializedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          // Add more properties as needed
        };
        dispatch(setUser(serializedUser));
      } else {
        // Set to null if no user is logged in
        dispatch(setUser(null));
      }
    });


    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleImageClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleClick = () => {
    navigation.navigate("Reg");
    setModalVisible(false);
  };
  const handleAdmin = () => {
    navigation.navigate("Admin")
    setModalVisible(false);
  };

  const onGoogleButtonPress = async () => {
    if (currentUser) {
      
      console.log('User ID:', currentUser.uid);
      console.log('User Name:', currentUser.displayName);
      console.log('User Email:', currentUser.email);
      console.log('User Photo URL:', currentUser.photoURL);
    }
  };

  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      await auth().signOut();

      // Sign out from Google (only if Google Sign-In was used)
      await GoogleSignin.signOut();
      setCurrentUser(null); // Clear user state
      console.log('User signed out from Firebase and Google');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View className="flex-row justify-between px-4 py-4 items-center bg-zinc-200 rounded-b-2xl shadow-md">
      {currentUser ? (
        <View className="flex-row gap-3 items-center">
          <TouchableOpacity onPress={handleImageClick}>
            <Image
              className="w-14 h-14 rounded-full border-2 border-blue-500"
              source={{ uri: currentUser?.photoURL || "https://via.placeholder.com/150" }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View>
            <Text className="text-blue-600 text-xl font-bold">Hello</Text>
            <Text className="text-lg text-gray-800">{currentUser?.displayName}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
          <Text className='p-2 rounded-3xl bg-amber-400'>SignIn</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onGoogleButtonPress}>
        <Icon name="bell-o" size={30} color="blue" />
      </TouchableOpacity>

      {/* Modal for displaying content */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 p-6 rounded-lg shadow-lg">
            <Text className="text-lg font-semibold mb-4 text-gray-800">Profile Options</Text>

            <View className="flex-row justify-between items-center mb-4">
              <View className='flex-row items-center justify-center'>
                <Image
                  className="w-12 h-12 rounded-full mr-3"
                  source={{ uri: currentUser?.photoURL || "https://via.placeholder.com/150" }}
                  resizeMode="cover"
                />
                <Text className="text-gray-700 font-medium">Edit Profile</Text>
              </View>
              <TouchableOpacity onPress={()=>handleSignOut()}>
                <Text className='bg-red-500 text-white p-2 rounded-3xl'>Signout</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={()=>handleClick()}
              className="mb-4 bg-blue-500 py-2 px-4 rounded-full"
            >
              <Text className="text-white text-center">Register As a Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAdmin()}
              className="mb-4 bg-blue-500 py-2 px-4 rounded-full"
            >
              <Text className="text-white text-center">Admin Panel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal}>
              <Text className="text-center text-blue-500 font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
