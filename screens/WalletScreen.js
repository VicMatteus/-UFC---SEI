import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/header";
import ItemPagamento from "../components/ItemPagamento";
import { useUserStore } from "../store";

export default function WalletScreen({ navigation }) {
    const {user, ChangeUser, payments, setPayments} = useUserStore();

    function handleClick() {
        navigation.navigate('AddPaymentMethod')
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Gerencie seus métodos de pagamento:</Text>
            </View>
            <TouchableOpacity style={styles.parkingButtom} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>Adicionar método de pagamento</Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                {payments.length > 0 ? <Text style={styles.text}>Métodos disponíveis:</Text> : <></>}
            </View>
            
            <View style={styles.ScrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    {
                        payments.map((cartao, index)=><ItemPagamento key={index} number={cartao.cardNumber} status={cartao.status} name={cartao.name} vencimento={cartao.vencimento} />)
                    }
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
