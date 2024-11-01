import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pantallas/platos';
import BusquedaPlato from '../pantallas/buscadordeplatos';
import DetallePlato from '../pantallas/detalleplato';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Busqueda" component={BusquedaPlato} />
                <Stack.Screen name="Detalle" component={DetallePlato} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;