import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SideBar(){
  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerItem}>Item 1</Text>
      <Text style={styles.drawerItem}>Item 2</Text>
      <Text style={styles.drawerItem}>Item 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  drawerItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});