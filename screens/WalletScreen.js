import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useBearStore } from "../store";
import Header from "../components/header";
import ItemPagamento from "../components/ItemPagamento";


export default function WalletScreen({ navigation }) {
    const { bears, increasePopulation, removeAllBears } = useBearStore() //apenas para testes

    function handleClick() {
        navigation.navigate('AddPaymentMethod')
        increasePopulation()
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Gerencie seus métodos de pagamento:</Text>
            </View>
            <TouchableOpacity style={styles.parkingButtom} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>Adicionar método de pagamento</Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.ScrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    <ItemPagamento lastNumbers='1234' status={true} name="Jonh Doe" vencimento='01/2024' />
                    <ItemPagamento lastNumbers='1234' status={true} name="Jonh Doe" vencimento='01/2024' />
                    <ItemPagamento lastNumbers='1234' status={true} name="Jonh Doe" vencimento='01/2024' />
                    <ItemPagamento lastNumbers='1234' status={true} name="Jonh Doe" vencimento='01/2024' />
                    <ItemPagamento lastNumbers='4321' status={false} name="Maria Kelly" vencimento='01/2024' />
                </ScrollView>
            </View>
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
    textContainer: {
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
    buttonText: {
        margin: 10,
        fontSize: 17,
        color: "white",
    },
    ScrollViewContainer: {
        width: '85%',
        height:'70%',
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: '100%',
        height:'100%',
    },
});
