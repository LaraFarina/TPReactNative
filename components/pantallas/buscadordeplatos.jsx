import React, { useState } from 'react';
import axios from 'axios';
import { SPOONACULAR_API_KEY } from '@env';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import ComponentePlato from '../components/ComponentePlato';

const BuscadorDePlatos = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    if (searchText.length < 3) return;

    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${searchText}`;
      const response = await axios.get(url);
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar platos"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Buscar" onPress={fetchRecipes} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ComponentePlato
            dish={item}
            onViewDetails={() => navigation.navigate('DetallePlato', { dishId: item.id })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
});

export default BuscadorDePlatos;
