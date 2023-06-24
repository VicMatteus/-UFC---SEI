import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'
import { useUserStore } from '../store';

export default function AddPaymentMethod({ navigation }) {
    const [name, ChangeName] = React.useState('');
    const [cardNumber, ChangeCardNumber] = React.useState('');
    const [vencimento, ChangeVencimento] = React.useState('');
    const [cvv, ChangeCVV] = React.useState('');
    
    const {user, ChangeUser, payments, setPayments} = useUserStore();

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

        paymentDetails = {
            name: name,
            cardNumber: cardNumber,
            cvv: cvv,
            vencimento: vencimento,
            status: true
        }
        // userDetails = JSON.stringify(userDetails)
        console.log(paymentDetails)
        setPayments([...payments, paymentDetails])
        console.log(payments)
        //Se API retornar token, prossigo, senão, alerta de erro.
        navigation.navigate('Wallet')
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
                maxLength={11}
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
        marginVertical:10
    },
    label:
    {
        color: '#FFFFFF',
        textAlign:'center',
        fontSize: 14,
        marginVertical:10
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
    linhaCVVeDate:{
        flexDirection: 'row',
        width: '90%',
        gap: 10
    },
    dateInput:{
        width: '77%',
    },
    cvvInput:{
        width: '20%',
    },
})
