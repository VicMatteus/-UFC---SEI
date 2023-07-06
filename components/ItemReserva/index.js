import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from "../../store";
import Api from '../../Api';

export default function ItemReserva({ codigo, porte, nome, endereco }) {
    const { user, ChangeUser, reserva, setReserva } = useUserStore();

    //arrumar
    async function removerReserva() {
        const response = await Api.delete('/vacancy_reservations')
            .then(function (response) {
                console.log(response.status);
                alert("Reserva desfeita com sucesso!")
                console.log(response.data)
                setReserva({})
                // navigation.navigate('Router')
            })
            .catch(function (error) {
                console.log("Erro ao excluir reserva: ")
                console.log(error)
                alert("Erro ao excluir reserva")
            });
    }

    const showAlert = () =>
        Alert.alert(
            'Deseja cancelar a reserva?',
            '',
            [
                {
                    text: 'Não',
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        removerReserva()
                        console.log("Operação realizada")
                    },
                }
            ],
            {
                cancelable: true,
            },
        );

    return (
        <TouchableOpacity style={styles.container} onPress={() => showAlert()}>
            <View style={styles.linha1}>
                <Text style={styles.info}>Código: {codigo}</Text>
                <Text style={styles.info}>Porte: {porte}</Text>
            </View>
            <Text style={styles.info}>Estacionamento: {nome}</Text>
            <Text style={styles.info}>Endereço: {endereco}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
        height: 100,
        alignItems: 'flex-start',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        padding: 12,
        justifyContent: 'space-between',
    },
    linha1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    info: {
        color: '#FFFFFF',
        // backgroundColor: 'gray',
        fontSize: 15
    },
    statusAtivo: {
        color: 'green',
    },
    statusInativo: {
        color: 'red',
    }
})