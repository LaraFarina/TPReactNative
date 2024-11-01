import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SPOONACULAR_API_KEY } from '@env';
import { View, Text, FlatList } from 'react-native';

const BuscadorDePlatos = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=pasta`;
        const response = await axios.get(url);
        setRecipes(response.data.results);
      } catch (error) {-
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <View>
      <FlatList
        data={recipes}
        keyExtractor={(recipe) => recipe.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default BuscadorDePlatos;
