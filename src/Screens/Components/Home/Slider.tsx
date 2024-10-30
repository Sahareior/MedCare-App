import React from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const Slider = () => {
  const entries = [
    {
      title: 'Item 1',
      imageUrl: 'https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-goggles_23-2149611193.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid',
    },
    {
      title: 'Item 2',
      imageUrl: 'https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid',
    },
    {
      title: 'Item 3',
      imageUrl: 'https://img.freepik.com/premium-photo/healthcare-professional-holding-red-heart-with-medical-network_886588-15254.jpg?ga=GA1.1.10786356.1696485729&semt=ais_hybrid',
    },
  ];

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={true}
        autoplay={true}
        autoplayTimeout={7}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {entries.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            {/* <Text style={styles.text}>{item.title}</Text> */}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250, // Adjust height as per design
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'gray',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: 'blue',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});

export default Slider;
