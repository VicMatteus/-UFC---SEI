import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/header";
import { AntDesign } from "@expo/vector-icons";
import {useBearStore} from "../store";


export default function WalletScreen({navigation}) {
    const {bears, increasePopulation, removeAllBears} = useBearStore() //apenas para testes

    function handleClick(){
        navigation.navigate('AddPaymentMethod')
        increasePopulation()
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Gerencie seus métodos de pagamento:</Text>
            </View>
            <TouchableOpacity style={styles.parkingButtom} onPress={()=>handleClick()}>
                <Text style={styles.buttomText}>Adicionar método de pagamento</Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{color:'white'}}>{bears}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 5, //evita ficar em cima da barra de notificações
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
    },
    textContainer:{
        alignItems: 'flex-start',
        margin: 10,
        width: '85%',
    },
    text: {
        fontSize: 17,
        color: "white",
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
