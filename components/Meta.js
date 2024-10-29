// components/Meta.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Meta = ({ children }) => {
  return (
    <View style={styles.metaContainer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  metaContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', 
  },
});

export default Meta;
