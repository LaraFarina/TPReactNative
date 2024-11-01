import React, { useEffect, useState } from 'react';
import { SPOONACULAR_API_KEY } from '@env';
import { View, Text } from 'react-native';

const BuscadorDePlatos = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=pasta`;
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.results); // Ajusta según la estructura de la respuesta
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <View>
      {recipes.map((recipe) => (
        <Text key={recipe.id}>{recipe.title}</Text>
      ))}
    </View>
  );
};

export default BuscadorDePlatos;
