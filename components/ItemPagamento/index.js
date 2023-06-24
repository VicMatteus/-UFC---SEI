import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from "../../store";


export default function ItemPagamento({ number, status, name, vencimento }) {
    const {user, ChangeUser, payments, setPayments} = useUserStore();

    function verificarStatus() {
        let statusStyles = [styles.info]
        status === true ? statusStyles.push(styles.statusAtivo) : statusStyles.push(styles.statusInativo)
        return statusStyles
    }

    const showAlert = () =>
        Alert.alert(
            'Deseja ativar/desativar o cartão de final "'+number.substr(-4)+'"?',
            '',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        // Alert.alert('Sim pressionado')
                        cartoes = payments
                        alvo = cartoes.filter(cartao => cartao.cardNumber === number)
                        if(alvo.length === 1)
                        {
                            indice = cartoes.indexOf(alvo[0])
                            cartoes[indice].status = !cartoes[indice].status; //deveria ser um patch no back
                            setPayments(cartoes)
                            console.log("Operação realizada")
                        }
                        else if(alvo.length>1)
                        {
                            console.log("Cartão já inativo.")
                        }

                    },
                },
                {
                    text: 'Não',
                },
            ],
            {
                cancelable: true,
            },
        );

    return (
        <TouchableOpacity style={styles.container} onPress={() => showAlert()}>
            <View style={styles.linha1}>
                <Text style={styles.info}>Final: {number.substr(-4)}</Text>
                <Text style={verificarStatus()}>{status ? 'Ativo' : 'Inativo'}</Text>
            </View>
            <Text style={styles.info}>Nome: {name}</Text>
            <Text style={styles.info}>Vencimento: {vencimento}</Text>
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
    },
    linha1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    info: {
        color: '#FFFFFF',
        // backgroundColor: 'gray',
        fontSize: 20
    },
    statusAtivo: {
        color: 'green',
    },
    statusInativo: {
        color: 'red',
    }
})