import * as React from "react";
import { View, Text, StyleSheet, Alert, useState, TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useUserStore } from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from "../Api";

// Para remover um valor
const removeData = async (chave) => {
    try {
        await AsyncStorage.removeItem(chave);
        console.log('Dados removidos com sucesso!');
    } catch (error) {
        console.log('Erro ao remover os dados: ', error);
    }
};

//Lembrar de trocar endereço da url base
async function fetchApi(token) {
    const response = await Api({
        method: 'delete',
        url: '/logout',
        headers: { 'Authorization': token }
    })
        .then(function (response) {
            console.log(response.status);
            console.log(response.data.message);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function Header({ navigation }) {
    const { user, ChangeUser, setPayments, setHistory, setVehicles } = useUserStore()

    const showAlert = () =>
        Alert.alert(
            'Deseja se deslogar do sistema?',
            '',
            [
                {
                    text: 'Não',
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        //Chamar api de deslogar, remover user da local storage, navegar para tela de login
                        fetchApi(user.token)
                        removeData('user');
                        ChangeUser({});
                        setPayments([])
                        setHistory([])
                        setVehicles([])

                        navigation.navigate('Login');
                    },
                }
            ],
            {
                cancelable: true,
            },
        );

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View style={[{ transform: [{ rotate: '180deg' }], justifyContent: 'flex-start' }]}>
                    <Entypo name="log-out" size={30} color="white" onPress={() => showAlert()} />
                </View>
                <Text style={styles.headerText}> SEI </Text>
            </View>
            <View style={styles.headerRight}>
                <Text style={{ marginEnd: 10, color: "white" }}> Reservar Vaga</Text>
                <TouchableOpacity style={styles.bookButtom} onPress={()=>navigation.navigate("BookVacancy")}>
                    <AntDesign name="plus" size={18} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        top: 0,
        height: 90,
        backgroundColor: "#121212",
        alignContent: "space-between",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        width: '100%',
    },
    headerText: {
        fontFamily: "monospace",
        fontSize: 32,
        color: "white",
    },
    headerLeft: {
        flexDirection: "row",
        marginHorizontal: 10,
        alignItems: "center",
    },
    headerRight: {
        marginHorizontal: 15,
        flexDirection: "row",
        alignContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
    },
    bookButtom: {
        backgroundColor: "#1fd1a4",
        height: 40,
        width: 40,
        borderRadius: 7,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    drawerContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    drawerItem: {
        fontSize: 16,
        marginBottom: 10,
    },
});
export default Header;
