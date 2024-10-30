import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';


const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View className="px-4 mt-3 py-2">
      <View className="flex-row items-center bg-gray-200 rounded-full shadow-md">
        {/* Search Icon */}
        {/* <Ionicons name="ios-search" size={24} color="gray" className="px-3" /> */}

        {/* Text Input */}
        
        <TextInput
          className="flex-1 text-base px-3 py-2"
          placeholder="Search doctors..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{
            flex: 1,
            fontSize: 16,
            backgroundColor: 'transparent',
          }}
        />

        {/* Clear Button */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} className="pr-3">
            {/* <Ionicons name="ios-close-circle" size={24} color="gray" /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Searchbar;
