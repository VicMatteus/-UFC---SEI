import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import WalletScreen from "./WalletScreen";
import VehiclesScreen from "./VehiclesScreen";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

function CustomTabItem({ color, icon, label }) {
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            {icon}
            <Text style={{ color: color, fontWeight: "400" }}>{label}</Text>
        </View>
    );
}
function TabNavigation() {
    return (
        // <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: 80,
                        width: "100%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#1c1c1c",
                        borderTopWidth: 0,
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => {
                            if (focused) {
                                return (
                                    <CustomTabItem
                                        label="Início"
                                        color={color}
                                        icon={<Ionicons name="home" color={color} size={size} />}
                                    />
                                );
                            }
                            return (
                                <CustomTabItem
                                    label="Início"
                                    color={color}
                                    icon={
                                        <Ionicons name="home-outline" color={color} size={size} />
                                    }
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => {
                            if (focused) {
                                return (
                                    <CustomTabItem
                                        label="Histórico"
                                        color={color}
                                        icon={<FontAwesome5 name="history" size={24} color={color} />}
                                    />
                                );
                            }
                            return (
                                <CustomTabItem
                                    label="Histórico"
                                    color={color}
                                    icon={<FontAwesome5 name="history" size={24} color={color} />}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Wallet"
                    component={WalletScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => {
                            if (focused) {
                                return (
                                    <CustomTabItem
                                        label="Carteira"
                                        color={color}
                                        icon={<Ionicons name="wallet" color={color} size={size} />}
                                    />
                                );
                            }
                            return (
                                <CustomTabItem
                                    label="Carteira"
                                    color={color}
                                    icon={
                                        <Ionicons name="wallet-outline" color={color} size={size} />
                                    }
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Vehicles"
                    component={VehiclesScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => {
                            if (focused) {
                                return (
                                    <CustomTabItem
                                        label="Veículos"
                                        color={color}
                                        icon={<Ionicons name="car-sport" color={color} size={size} />}
                                    />
                                );
                            }
                            return (
                                <CustomTabItem
                                    label="Veículos"
                                    color={color}
                                    icon={
                                        <Ionicons
                                            name="car-sport-outline"
                                            color={color}
                                            size={size}
                                        />
                                    }
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        // </NavigationContainer>
    );
}
export default TabNavigation;
