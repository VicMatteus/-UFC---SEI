// WalletScreen.js
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/header";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ItemVeiculo from "../components/ItemVeículo";
import { useUserStore } from "../store";
import Api from "../Api";

export default function VehiclesScreen({ navigation }) {
    const { vehicles, setVehicles } = useUserStore();

    function handleClick() {
        navigation.navigate('AddVehicle')
    }

    React.useEffect(() => {
        recuperarVeiculos();
    }, [])

    async function recuperarVeiculos() {
        const response = await Api.get('/vehicles')
            .then(function (response) {
                console.log(response.status);
                console.log(response.data)
                let veiculos = response.data
                setVehicles(veiculos) //Defino como usuário ativo no momento.

                //Se API retornar token, prossigo, senão, alerta de erro.
                // navigation.navigate('Router')
            })
            .catch(function (error) {
                console.log("Erro ao recuperar veículos cadastrados: ")
                // console.log(error.response.status);
                alert("Credenciais ou senha inválidas.")
            });
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Cadastre um veículo</Text>
            </View>
            <TouchableOpacity style={styles.newVehicleButtom} onPress={() => handleClick()}>
                <Text style={styles.buttomText}>Cadastre um veículo </Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                {vehicles.length > 0 ? <Text style={styles.text}>Veículos disponíveis:</Text> : <></>}
            </View>

            <View style={styles.ScrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    {
                        vehicles.map((veiculo, index) => <ItemVeiculo key={index} id={veiculo.id} name={veiculo.nickname} plate={veiculo.plate} />)
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
    ScrollViewContainer: {
        width: '85%',
        height:'65%',
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: '100%',
        height:'100%',
    },
});