import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useFireLocations } from "../firebase/FirestoreController";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

const LocationsScreen = () => {
  const locations = useFireLocations();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LocationItem location={item} />}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </PaperProvider>
  );
};

const LocationItem = ({ location }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{location.name}</Text>
      <Text style={styles.description}>{location.description}</Text>
      <Text style={styles.rating}>⭐ {location.rating}</Text>

      <TouchableOpacity 
        style={styles.mapButton} 
        onPress={() => navigation.navigate('Map', { location: location.location })}
      >
        <MaterialIcons name="place" size={24} color="white" />
        <Text style={styles.mapButtonText}>View on Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  rating: {
    fontSize: 16,
    color: '#ffb400',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default LocationsScreen;
