import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/header";
import SideBar from "../components/Sidebar";
import ItemHistorico from "../components/ItemHistorico";
import { useUserStore } from "../store";


export default function HistoryScreen() {
    const {history} = useUserStore(); //Possui os dados do usuário.

    return (
        <View style={styles.container}>
            <Header />
            {/* <Text style={{color:'white'}}>
                {user.name}
            </Text> */}
            <View style={styles.textContainer}>
                <Text style={styles.text}>Histórico de movimentações:</Text>
            </View>

            <View style={styles.ScrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    {
                        history.map((item, index)=><ItemHistorico key={index} data={item.data} saida={item.saida} veiculo={item.veiculo} entrada={item.entrada} valor={item.valor}/>)
                    }
                    <ItemHistorico data={'item.data'} saida={'item.saida'} veiculo={'item.veiculo'} entrada={'item.entrada'} valor={'item.valor'}/>
                    <ItemHistorico data={'item.data'} saida={'item.saida'} veiculo={'item.veiculo'} entrada={'item.entrada'} valor={'item.valor'}/>
                    <ItemHistorico data={'item.data'} saida={'item.saida'} veiculo={'item.veiculo'} entrada={'item.entrada'} valor={'item.valor'}/>
                    <ItemHistorico data={'item.data'} saida={'item.saida'} veiculo={'item.veiculo'} entrada={'item.entrada'} valor={'item.valor'}/>
                    <ItemHistorico data={'item.data'} saida={'item.saida'} veiculo={'item.veiculo'} entrada={'item.entrada'} valor={'item.valor'}/>
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
