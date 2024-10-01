import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [dishDetails, setDishDetails] = useState({ name: '', description: '', course: '', price: '' });
  const [dishes, setDishes] = useState<string[]>([]); // Updated for dynamic dish list

  const handleNext = () => {
    setCurrentScreen('CourseSelection');
  };

  const handleSubmit = () => {
    setDishes([...dishes, dishDetails.name]);
    setCurrentScreen('Confirmation');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <ImageBackground source={require('./assets/background.png')} style={styles.backgroundImage}>
            <Text style={styles.title}>Welcome to Dish Dash</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('MenuInput')}>
              <Text style={styles.buttonText}>Add a Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('ViewDishes')}>
              <Text style={styles.buttonText}>View Dishes</Text>
            </TouchableOpacity>
          </ImageBackground>
        );

      case 'MenuInput':
        return (
          <View style={styles.container}>
            <TextInput
              placeholder="Dish Name"
              value={dishDetails.name}
              onChangeText={(text) => setDishDetails({ ...dishDetails, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={dishDetails.description}
              onChangeText={(text) => setDishDetails({ ...dishDetails, description: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              value={dishDetails.price}
              onChangeText={(text) => setDishDetails({ ...dishDetails, price: text })}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );

      case 'CourseSelection':
        return (
          <View style={styles.container}>
            <Text>Select Course</Text>
            <Picker
              selectedValue={dishDetails.course}
              onValueChange={(itemValue) => setDishDetails({ ...dishDetails, course: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Starter" value="Starter" />
              <Picker.Item label="Main" value="Main" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        );

      case 'Confirmation':
        return (
          <View style={styles.container}>
            <Text>Dish Summary</Text>
            <Text>Name: {dishDetails.name}</Text>
            <Text>Description: {dishDetails.description}</Text>
            <Text>Course: {dishDetails.course}</Text>
            <Text>Price: ${dishDetails.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Home')}>
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        );

      case 'ViewDishes':
        return (
          <View style={styles.container}>
            <Text>Dish List</Text>
            {dishes.map((dish, index) => (
              <Text key={index} style={styles.dishItem}>{dish}</Text>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Home')}>
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return <Text>Unknown Screen</Text>;
    }
  };

  return <View style={styles.appContainer}>{renderScreen()}</View>;
};

// Styles
const styles = StyleSheet.create({
  appContainer: { flex: 1 },
  backgroundImage: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingLeft: 8 },
  button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16 },
  picker: { width: '80%', marginTop: 20 },
  dishItem: { fontSize: 18, padding: 10, color: 'blue' },
});

export default App;

