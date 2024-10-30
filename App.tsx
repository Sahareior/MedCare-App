import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/Navigation/TabNavigation';
import Categoryscreen from './src/Screens/Categoryscreen';
import Appoinmentscreen from './src/Screens/Appoinmentscreen';
import Detailsscreen from './src/Screens/Detailsscreen';
import RegScreen from './src/Screens/Components/RegScreen';
import { store } from './src/Redux/Store';
import Signscreen from './src/Screens/Components/Auth/Signscreen';
import AdminScreen from './src/Screens/Components/Admin/AdminScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: '677292315076-v1oftoudn3kosak94utqf30jnjd231un.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabNavigation} />
            <Stack.Screen name="Category" component={Categoryscreen} />
            <Stack.Screen name="Appo" component={Appoinmentscreen} />
            <Stack.Screen name="Details" component={Detailsscreen} />
            <Stack.Screen name="Reg" component={RegScreen} />
            <Stack.Screen name="signIn" component={Signscreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
