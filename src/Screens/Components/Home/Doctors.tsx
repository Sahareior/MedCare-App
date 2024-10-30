import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Doctors = ({ data }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", { docData: data })} style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: data?.image }}
          resizeMode='cover'
        />
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.specialization}>{data.specialization}</Text>
          <Text style={styles.rating}>{data.rating}★</Text>
        </View>
        <Text style={styles.experience}>Experience: {data.experienceYears} years</Text>
        <Text style={styles.address}>
          {data.contactInfo.address.street}, {data.contactInfo.address.city}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 8,
    width: (Dimensions.get('window').width / 2) - 20,
  },
  card: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialization: {
    fontSize: 13,
    color: '#3498db',
  },
  rating: {
    fontSize: 13,
    color: '#f39c12',
    fontWeight: '500',
  },
  experience: {
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 6,
  },
  address: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
});

export default Doctors;
