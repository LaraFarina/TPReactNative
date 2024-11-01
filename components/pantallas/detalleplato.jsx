import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SPOONACULAR_API_KEY } from '@env';
import { View, Text, Button, ActivityIndicator } from 'react-native';

const DetallePlato = ({ route, navigation }) => {
  const { dishId, onAddToMenu } = route.params;
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const url = `https://api.spoonacular.com/recipes/${dishId}/information?apiKey=${SPOONACULAR_API_KEY}`;
        const response = await axios.get(url);
        setDish(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dish details:", error);
        setLoading(false);
      }
    };

    fetchDishDetails();
  }, [dishId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>{dish.title}</Text>
      <Text>HealthScore: {dish.healthScore}</Text>
      <Text>Vegano: {dish.vegan ? 'Sí' : 'No'}</Text>
      <Button
        title={onAddToMenu ? "Agregar al Menú" : "Eliminar del Menú"}
        onPress={() => {
          onAddToMenu(dish);
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default DetallePlato;
