import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe seus componentes de tela para as tabs
import HomeScreen from './screens/HomeScreen';
// import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;