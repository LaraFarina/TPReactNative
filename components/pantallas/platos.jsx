import React, { useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import ComponentePlato from '../components/ComponentePlato';

const Platos = ({ navigation }) => {
  const [menu, setMenu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);

  const updateTotals = (updatedMenu) => {
    const price = updatedMenu.reduce((acc, dish) => acc + dish.price, 0);
    const healthScore = updatedMenu.reduce((acc, dish) => acc + dish.healthScore, 0) / updatedMenu.length;
    setTotalPrice(price);
    setAverageHealthScore(healthScore);
  };

  const handleAddDish = (dish) => {
    const veganDishes = menu.filter((dish) => dish.vegan).length;
    const nonVeganDishes = menu.filter((dish) => !dish.vegan).length;

    if (menu.length >= 4) {
      Alert.alert("El menú solo puede tener 4 platos.");
      return;
    }

    if ((dish.vegan && veganDishes >= 2) || (!dish.vegan && nonVeganDishes >= 2)) {
      Alert.alert("Debe haber 2 platos veganos y 2 no veganos.");
      return;
    }

    const updatedMenu = [...menu, dish];
    setMenu(updatedMenu);
    updateTotals(updatedMenu);
  };

  const handleRemoveDish = (dishId) => {
    const updatedMenu = menu.filter((dish) => dish.id !== dishId);
    setMenu(updatedMenu);
    updateTotals(updatedMenu);
  };

  return (
    <View>
      <Text>Total Precio: {totalPrice}</Text>
      <Text>Promedio HealthScore: {averageHealthScore.toFixed(2)}</Text>
      <Button title="Buscar Platos" onPress={() => navigation.navigate('BuscadorDePlatos', { onAddToMenu: handleAddDish })} />
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ComponentePlato
            dish={item}
            onViewDetails={() => navigation.navigate('DetallePlato', { dishId: item.id, onAddToMenu: handleAddDish })}
            onRemove={handleRemoveDish}
          />
        )}
      />
    </View>
  );
};

export default Platos;
