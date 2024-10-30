import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from '../Screens/Homescreen';
import Pendingscreen from '../Screens/Pendingscreen';
import Historyscreen from '../Screens/Historyscreen';
import Doctorsscreen from '../Screens/Doctorsscreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your icon library
import Chatscreen from '../Screens/Chatscreen';

const Tabs = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { padding: 8 }, // Optional: style the tab bar
      }}
    >
      <Tabs.Screen
        name='Home'
        component={Homescreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='Pending'
        component={Pendingscreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="hourglass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='Chat'
        component={Chatscreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='Doctors'
        component={Doctorsscreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="medkit-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default TabNavigation;
