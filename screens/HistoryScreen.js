import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/header";
import ItemHistorico from "../components/ItemHistorico";
import { useUserStore } from "../store";
import Api from "../Api";

export default function HistoryScreen({ navigation }) {
    const { history, setHistory } = useUserStore();

    React.useEffect(() => {
        Api.get("/search/movements")
            .then((response) => {
                console.log(response.data[0])
                setHistory(response.data)
            })
    }, []);

    function formatarTimestamp(dataParam) {
        let timestamp = new Date(dataParam)
        let dataGrega = timestamp.getDay() + "/" + timestamp.getMonth() + "/" + timestamp.getFullYear()
        let horario = timestamp.getUTCHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds()
        let dataEHora = dataGrega + " - " + horario
        // console.log(dataEHora)
        return dataEHora
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <View style={styles.textContainer}>
                <Text style={styles.text}>Histórico de movimentações:</Text>
            </View>

            <View style={styles.ScrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    {
                        history.map((item, index) => <ItemHistorico key={index} data={formatarTimestamp(item.created_at)}
                            saida={formatarTimestamp(item.exit)}
                            veiculo={item.vehicle_id}
                            entrada={formatarTimestamp(item.entry)}
                            valor={item.cost.toString()}
                        />)
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
        height: '80%',
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: '100%',
        height: '100%',
    },
});
