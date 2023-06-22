import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe seus componentes de tela para as tabs
import HomeScreen from './screens/HomeScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import RecoverScreen from './screens/RecoverScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="CriarConta" component={CreateAccountScreen} />
                <Stack.Screen name="RecuperarConta" component={RecoverScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />{/**A home terá o sistema de tabs */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;