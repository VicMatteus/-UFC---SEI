import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../components/header";
import { AntDesign } from "@expo/vector-icons";
import { useUserStore } from "../store";

function HomeScreen() {
    const {user, ChangeUser} = useUserStore(); //Possui os dados do usuário.

    return (
        <View style={styles.container}>
            <Header />
            <Text style={{color:'white'}}>
                {user.name}
            </Text>
            <Text style={styles.text}>Escolha um estacionamento:</Text>
            <TouchableOpacity style={styles.parkingButtom}>
                <Text style={styles.buttomText}>Veja a lista de estacionamentos </Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
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
    text: {
        margin: 10,
        fontSize: 17,
        color: "white",
        left: -55,
    },
    parkingButtom: {
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
export default HomeScreen;
