import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'
export default function LoginScreen() {
    const [text, onChangeText] = React.useState('');
    const [password, onChangepassword] = React.useState('');

    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Seja bem-vindo(a) de volta!</Text>
            </View>

            <TextInput style={styles.input}
                onChangeText={onChangeText}
                value={text}
                keyboardType='email-address'
                placeholder='Email' />

            <TextInput style={styles.input}
                onChangeText={onChangepassword}
                value={password}
                secureTextEntry={true}
                placeholder='Senha' />

            <View style={styles.switchContainer}>
                <Switch
                    trackColor={{ false: '#767577', true: '#b7d1ff' }}
                    thumbColor={isEnabled ? '#f6fff5' : 'gray'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={styles.switchText}>Mantenha-me conectado</Text>
            </View>

            <SuccessButton label={"Entrar"} />

            <TouchableOpacity style={styles.bottomLineContainer}>
                <Text style={styles.bottomLineLabel}>Esqueceu sua senha?</Text>
                <Text style={[styles.bottomLineLabel, styles.bottomLineBold]}>Recupere aqui.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomLineContainer}>
                <Text style={styles.bottomLineLabel}>Não possui conta?</Text>
                <Text style={[styles.bottomLineLabel, styles.bottomLineBold]}>Crie sua conta.</Text>
            </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchText: {
        color: '#FFFFFF',
        fontSize: 18,
    },

    bottomLineContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:3,
    },
    bottomLineLabel:
    {
        color: '#FFFFFF',
        fontSize: 14,
    },
    bottomLineBold:{
        fontWeight: 'bold',
    },
})
