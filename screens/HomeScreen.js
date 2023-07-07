import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../components/header";
import { AntDesign } from "@expo/vector-icons";
import { useUserStore } from "../store";
import ItemReserva from "../components/ItemReserva";
import Api from "../Api";
import { ipv4 } from "../enderecoBack";

function HomeScreen({ navigation }) {
    const { reserva, setReserva } = useUserStore(); //Possui os dados do usuário.
    const [reservaApi, setReservaApi] = React.useState()
    const [estacionamentoApi, setestacionamentoApi] = React.useState()
    const [vagaApi, setVagaApi] = React.useState()

    /*  Buscar info da vaga
        A api de reserva depende de uma vaga. uma vaga é de um estacionamento. Fazer o caminho oposto fica impossível
        pq a reserva retorna a vaga, mas não o estacionamento. para buscar um estacionamento, preciso do id do estacionamento, que tá inacessível.
        por isso, tá fixo em 1 aqui.
    */
    React.useEffect(() => {
        let detalhesReserva

        //Precisei fazer desse modo pois as requisições eram dependentes
        async function requisicoes() {
            try {
                // Buscar reserva do cliente
                const reservas = await Api.get('/vacancy_reservations')
                const dados = await reservas.data

                // Busca informaçoes do estacionamento 'da reserva'
                const resposta2 = await fetch("http://" + ipv4 + ":3001/search/vacancies?parking_id=1")
                const dados2 = await resposta2.json()
                vacancyInfo = dados2.filter((vaga) => vaga.id === dados.id)[0]

                // Busca informaçoes da vaga 'da reserva'
                const resposta3 = await fetch("http://" + ipv4 + ":3001/search/parkings")
                const dados3 = await resposta3.json()
                parkingInfo = dados3.filter((estacionamento) => estacionamento.id === vacancyInfo.parking_id)[0]

                // Popula o objeto que ficará no estado global de reserva.
                detalhesReserva = {
                    reservaDetails: { vacancy_id: dados.id, client_id: dados.client_id, },
                    vacancyDetails: vacancyInfo,
                    parkingDetails: parkingInfo
                }
                // console.log(detalhesReserva);
                setReserva(detalhesReserva)

            } catch (error) {
                if (error.message.indexOf('404') === -1) {
                    alert("Erro ao buscar reservas.")
                    console.log(error.message)
                    return
                }
                console.log('Não existem reservas.');
            }
        }
        requisicoes()
    }, []);

    function SectionReserva() {
        return (
            <View style={{ width: '100%' }}>
                <Text style={styles.text}>Reserva atual:</Text>
                <ItemReserva
                    codigo={reserva.vacancyDetails.code}
                    porte={reserva.vacancyDetails.kind}
                    nome={reserva.parkingDetails.name}
                    endereco={reserva.parkingDetails.address}
                    id={reserva.vacancy_id}
                />
            </View>
        )
    }

    //Só pode haver uma reserva ativa
    function handleClick() {
        if (JSON.stringify(reserva) === '{}') {
            navigation.navigate("BookVacancy")
        }
        else {
            alert("Você já possui uma reserva.")
            return
        }
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <View style={styles.textContainer}>
                <Text style={styles.text}>Escolha um estacionamento:</Text>
            </View>
            <TouchableOpacity style={styles.parkingButtom} onPress={handleClick}>
                <Text style={styles.buttomText}>Veja a lista de estacionamentos </Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                {JSON.stringify(reserva) !== '{}' ? <SectionReserva /> : <></>}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
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
});
export default HomeScreen;
