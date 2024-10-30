import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const PremiumDocCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", { docData: data })}>
      <View style={{
          backgroundColor: '#1a1a2e', // Dark background for elegance
          borderRadius: 16,
          marginHorizontal: 0,
          marginVertical: 2,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 10,
        }}
      >
        {/* Background Gradient */}
        <LinearGradient 
          colors={['#141e30', '#233b55']} // Gradient for modern feel
          style={{
            padding: 22,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Doctor's Profile Image */}
          <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#3a506b',
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: data?.image }}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          {/* Doctor's Info */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#eaf6ff' }}>{data.name}</Text>
            <Text style={{ fontSize: 16, color: '#b0c6df', marginVertical: 4 }}>{data.specialization}</Text>
            <Text style={{ fontSize: 14, color: '#a0a4a8' }}>
              {data.contactInfo?.address?.street}, {data.contactInfo?.address?.city}, {data.contactInfo?.address?.state}
            </Text>
          </View>

          {/* Rating Badge */}
          <View style={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: '#2b2e4a',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#00bfa6', // Aqua border for focus
              shadowColor: '#00bfa6',
              shadowOpacity: 0.6,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#00bfa6' }}>
              {data.rating || "4.8"} <Text style={{ fontSize: 16 }}>★</Text>
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default PremiumDocCard;
