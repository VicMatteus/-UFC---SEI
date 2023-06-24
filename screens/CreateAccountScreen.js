import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'
import { useUserStore } from '../store';

export default function CreateAccountScreen({navigation}) {
    const [email       , ChangeEmail]       = React.useState('');
    const [password    , Changepassword]    = React.useState('');
    const [name        , ChangeName]        = React.useState('');
    const [lastName    , ChangeLastName]    = React.useState('');
    const [phoneNumber , ChangePhoneNumber] = React.useState('');
    const [cpf         , ChangeCPF]         = React.useState('');

    //Será usado na manutenção do token da API
    const [isTermsAndServices, setTermsAndServices] = React.useState(false);
    const toggleSwitch = () => setTermsAndServices(previousState => !previousState);

    const {user, ChangeUser} = useUserStore();

    function enviarDados(){
        //Realizar validações: email válido, senha > 8 char, nenhum campo vazio
        if (!(email && password && name && lastName && phoneNumber && cpf)){
            alert("Preencha todos os campos!")
            return
        }
        if (password.length<8){
            alert("Senha deve ser conter mais de 8 caracteres.")
            return
        }

        userDetails = {
            username: email,
            password: password,
            name: name,
            lastName: lastName,
            phoneNumber: phoneNumber,
            cpf: cpf,
            TermsAndServices: isTermsAndServices,
            RememberMe:false
        }
        // userDetails = JSON.stringify(userDetails)
        console.log(userDetails)
        ChangeUser(userDetails)
        console.log(user)
        //Se API retornar token, prossigo, senão, alerta de erro.

        navigation.navigate('Login')
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Faça seu cadastro e tenha acesso aos nosso serviços</Text>
            </View>

            <TextInput style={styles.input}
                onChangeText={ChangeName}
                value={name}
                placeholder='Nome' />

            <TextInput style={styles.input}
                onChangeText={ChangeLastName}
                value={lastName}
                placeholder='Sobrenome' />

            <TextInput style={styles.input}
                onChangeText={ChangeEmail}
                value={email}
                keyboardType='email-address'
                placeholder='Email' />

            <TextInput style={styles.input}
                onChangeText={ChangePhoneNumber}
                value={phoneNumber}
                keyboardType='numeric'
                maxLength={11}
                placeholder='Telefone' />

            <TextInput style={styles.input}
                onChangeText={ChangeCPF}
                value={cpf}
                keyboardType='numeric'
                maxLength={11}
                placeholder='CPF' />

            <TextInput style={styles.input}
                onChangeText={Changepassword}
                value={password}
                secureTextEntry={true}
                placeholder='Senha' />

            <View style={styles.switchContainer}>
                <Switch
                    trackColor={{ false: '#767577', true: '#b7d1ff' }}
                    thumbColor={isTermsAndServices ? '#f6fff5' : 'gray'}
                    onValueChange={toggleSwitch}
                    value={isTermsAndServices}
                />
                <Text style={styles.switchText}>Ao se inscrever significa que você leu e concorda com os Termos e Condições de Uso e nossa Política de Privacidade.</Text>
            </View>

            {/*Faltando realizar validações e bater na api para logar e avançar para*/}
            <SuccessButton label={"Criar conta"} navegarPara={()=>enviarDados()}/>

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
    switchContainer: {
        width: '90%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
})
