import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'

export default function RecoverScreen({navigation}) {
    const [email, ChangeEmail] = React.useState('');

    function enviarDados(){
        if(!email || email.length < 11){
            alert("Preencha o email corretamente.")
            return
        }
        userDetails = {
            username: email,
        }
        userDetails = JSON.stringify(userDetails)
        alert(userDetails)
        //Se API retornar token, prossigo, senão, alerta de erro.
        navigation.navigate('Login')
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Recuperar Senha</Text>
            </View>

            <Text style={styles.label}>Você deverá receber um email contendo instruções de como desbloquear sua conta.</Text>

            <TextInput style={styles.input}
                onChangeText={ChangeEmail}
                value={email}
                keyboardType='email-address'
                placeholder='Email' />

            {/*Faltando realizar validações e bater na api para logar e avançar para*/}
            <SuccessButton label={"Entrar"} navegarPara={()=>enviarDados()}/>

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
        width: '90%',
    },
    text: {
        // fontFamily: 'Cochin', //Depois ver se é realmente necessário usar fontes diferentes, pq tem q importar.
        fontSize: 48,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
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
    label:
    {
        color: '#FFFFFF',
        textAlign:'center',
        fontSize: 14,
    },
})
