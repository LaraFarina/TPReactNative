import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ComponentePlato = ({ dish, onViewDetails, onRemove }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.name}>{dish.title}</Text>
      <Button title="Ver Detalle" onPress={onViewDetails} />
      {onRemove && <Button title="Eliminar" onPress={() => onRemove(dish.id)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, borderBottomWidth: 1 },
  image: { width: 100, height: 100 },
  name: { fontSize: 18, fontWeight: 'bold' },
});

export default ComponentePlato;
