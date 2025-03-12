import React, { useState } from 'react';
import { 
  SafeAreaView, StyleSheet, View, Alert, KeyboardAvoidingView, 
  ScrollView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { addLocation } from '../firebase/FirestoreController'; 
import { TextInput, Button, Title } from 'react-native-paper';
import { PaperProvider } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';

const AddLocationScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  async function handleAddLocation() {
    if (!name || !description) {
      Alert.alert('Please enter all fields.');
      return;
    }

    try {
      await addLocation(name, description, rating);
      setName('');
      setDescription('');
      setRating(0);
      Alert.alert('Location added successfully!');
    } catch (error) {
      Alert.alert('Error adding location', error.message);
    }
  }

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.container}
          >
            <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
              
              <Title style={styles.title}>Add a New Location</Title>
              
              <TextInput
                label="Location Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              
              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />

              {/* Tähtiarviointi keskelle */}
              <View style={styles.starContainer}>
                <StarRating
                  rating={rating}
                  onChange={setRating}
                  starSize={30}
                  color="gold"
                />
              </View>

              <Button mode="contained" onPress={handleAddLocation} style={styles.button}>
                Add Location
              </Button>

            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flex: 1, padding: 20 },
  scrollView: { flexGrow: 1, justifyContent: 'center' },
  title: { 
    fontSize: 22, 
    textAlign: 'center', 
    marginBottom: 20, 
    fontWeight: 'bold' 
  },
  input: { 
    marginBottom: 15, 
    backgroundColor: 'white', 
    paddingHorizontal: 10, 
    borderRadius: 8 
  },
  starContainer: { 
    alignItems: 'center', 
    marginVertical: 20 
  },
  button: { 
    marginTop: 10, 
    paddingVertical: 5, 
    borderRadius: 8,  
  }
});

export default AddLocationScreen;
