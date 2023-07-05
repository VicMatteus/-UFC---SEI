// WalletScreen.js
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/header";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegisterVehicleButton = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("RegisterVehicleScreen");
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text>Navegar para outra tela</Text>
        </TouchableOpacity>
    );
};

function VehiclesScreen() {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Cadastre um veículo:</Text>
            </View>
            <View style={styles.newVehicleButtom}>
                <Text style={styles.buttomText}>Cadastre um veículo </Text>
                <AntDesign name="right" size={24} color="white" />
            </View>
            <View>
                <RegisterVehicleButton />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 5, //evita ficar em cima da barra de notificações
        flex: 1,
        backgroundColor: "#121212",
        alignContent: "center",
        alignItems: "center",
    },
    textContainer: {
        alignItems: 'flex-start',
        margin: 10,
        width: '85%',
    },
    text: {
        fontSize: 17,
        color: "white",
    },
    newVehicleButtom: {
        flexDirection: "row",
        backgroundColor: "#bb86fc",
        margin: 10,
        height: 60,
        width: "85%",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 10,
    },
    buttomText: {
        margin: 10,
        fontSize: 17,
        color: "white",
    },
});
export default VehiclesScreen;
