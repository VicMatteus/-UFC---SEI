import React from 'react';7

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe seus componentes de tela para as tabs
import TabRouter from './screens/TabRouter';
import CreateAccountScreen from './screens/CreateAccountScreen';
import RecoverScreen from './screens/RecoverScreen';
import LoginScreen from './screens/LoginScreen';
import AddPaymentMethod from './screens/AddPaymentMethod';
import AddVehicle from './screens/AddVehicle';
const Stack = createNativeStackNavigator();

function App() {
    //Depois substituir pelo zustand
    // const [isLoggedIn, setLoggedIn] = React.useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: '#121212'},
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {fontWeight: 'bold'}
            }}>
                <Stack.Screen name="Login"            component={LoginScreen}         options={{ headerShown: false }} />
                <Stack.Screen name="CriarConta"       component={CreateAccountScreen} options={{ title: "Criar conta" }} />
                <Stack.Screen name="RecuperarConta"   component={RecoverScreen}       options={{ title: "Recuperar conta" }} />
                <Stack.Screen name="Router"           component={TabRouter}           options={{ headerShown: false }} />
                <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod}    options={{ title: "Adicionar método de pagamento" }} />
                <Stack.Screen name="AddVehicle" component={AddVehicle}    options={{ title: "Adicionar veículo" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;