import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from "../../store";
import Api from '../../Api';

export default function ItemPagamento({ number, status, name, vencimento, id }) {
    const {user, ChangeUser, payments, setPayments} = useUserStore();

    function verificarStatus() {
        let statusStyles = [styles.info]
        status === true ? statusStyles.push(styles.statusAtivo) : statusStyles.push(styles.statusInativo)
        return statusStyles
    }

    async function removerPagamentos(idCartao) {
        const response = await Api.delete('/payment_methods/'+idCartao)
            .then(function (response) {
                console.log(response.status);
                alert("Método removido com sucesso!")
                // let cartoes = response.data
                cartoes = payments.filter(cartao => cartao.id !== idCartao)
                console.log(cartoes)
                setPayments(cartoes) //Defino como usuário ativo no momento.

                // navigation.navigate('Router')
            })
            .catch(function (error) {
                console.log("Erro ao excluir método de pagamento: ")
                // console.log(error.response.status);
                alert("Erro ao excluir método de pagamento: ")
            });
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
                        alvo = cartoes.filter(cartao => cartao.id === id)
                        if(alvo.length === 1)
                        {
                            indice = cartoes.indexOf(alvo[0])
                            console.log(cartoes[indice].id);
                            removerPagamentos(cartoes[indice].id)
                            // setPayments(cartoes)
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