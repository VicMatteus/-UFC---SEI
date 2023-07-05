import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'
import { useUserStore } from '../store';
import Api from '../Api';
import {ipv4} from '../enderecoBack.js';

export default function AddPaymentMethod({ navigation }) {
    const [name, ChangeName] = React.useState('vitor');
    const [cardNumber, ChangeCardNumber] = React.useState('3333');
    const [vencimento, ChangeVencimento] = React.useState('23/2026');
    const [cvv, ChangeCVV] = React.useState('333');
    const [clienteAtual, SetClienteAtual] = React.useState({});

    const { user, ChangeUser, payments, setPayments } = useUserStore();

    React.useEffect(() => {
        fetch("http://" + ipv4 + ":3001/current_client")
        .then(response => response.json())
        .then(data => {
            console.log(data.id)
            SetClienteAtual(data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    
    function enviarDados() {
        //Realizar validações: nenhum campo vazio
        if (!(name && cardNumber && vencimento && cvv)) {
            alert("Preencha todos os campos!")
            return
        }
        if (vencimento.length < 7) {
            alert("A data deve ser preenchida no formato:\nDD/AAAA")
            return
        }

        console.log("Cliente"+clienteAtual)
        paymentDetails = {
            cardholder_name: name,
            card_number: cardNumber,
            validity: vencimento,
            security_code: cvv,
            client_id: clienteAtual.id
        }
        console.log("payment details: "+paymentDetails)
        salvarMetodo(paymentDetails);
    }

    async function salvarMetodo(paymentDetails) {
        const response = await Api.post('/payment_methods', {
            payment_method: paymentDetails
        })
            .then(function (response) {
                console.log(response.status);
                console.log(response.data);
                let novoMetodo = response.data
                setPayments([...payments, novoMetodo])
                console.log(payments)
                ChangeName("")
                ChangeCardNumber("")
                ChangeVencimento("")
                ChangeCVV("")
                navigation.navigate('Router')
            })
            .catch(function (error) {
                console.log("Erro ao salvar método")
                console.log(error);
                alert("Erro ao salvar método.")
            });
    }

    //Aplica máscara de data a cada entrada do usuário no campo data
    function formatarData(e) {
        var v = e.replace(/\D/g, "");
        v = v.replace(/(\d{2})(\d)/, "$1/$2")
        ChangeVencimento(v);
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Adicione um método de pagamento</Text>
                <Text style={styles.label}>Você será notificado pelo aplicativo do seu banco, assim que nossa plataforma verificar o método de pagamento.</Text>
            </View>

            <TextInput style={styles.input}
                onChangeText={ChangeName}
                value={name}
                placeholder='Nome do titular' />

            <TextInput style={styles.input}
                onChangeText={ChangeCardNumber}
                value={cardNumber}
                keyboardType='numeric'
                maxLength={16}
                placeholder='Número do cartão' />

            <View style={styles.linhaCVVeDate}>
                <TextInput style={[styles.input, styles.dateInput]}
                    onChangeText={formatarData}
                    value={vencimento}
                    keyboardType='numeric'
                    maxLength={7}
                    placeholder='Data de vencimento(DD/AAAA)' />

                <TextInput style={[styles.input, styles.cvvInput]}
                    onChangeText={ChangeCVV}
                    value={cvv}
                    keyboardType='numeric'
                    maxLength={3}
                    placeholder='CVV' />
            </View>

            {/*Faltando realizar validações e bater na api para logar e avançar para*/}
            <SuccessButton label={"Adicionar método de pagamento"} navegarPara={() => enviarDados()} />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        gap: 10
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '98%',
    },
    text: {
        // fontFamily: 'Cochin', //Depois ver se é realmente necessário usar fontes diferentes, pq tem q importar.
        fontSize: 48,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10
    },
    label:
    {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        height: 40,
        width: '90%',
        fontSize: 18,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
    },
    linhaCVVeDate: {
        flexDirection: 'row',
        width: '90%',
        gap: 10
    },
    dateInput: {
        width: '77%',
    },
    cvvInput: {
        width: '20%',
    },
})
