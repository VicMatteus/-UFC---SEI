import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'
import { useUserStore } from '../store';
import Api from "../Api";



export default function AddVehicle({navigation}){
    const [vehicleName, ChangeVehicleName] = React.useState('Subaru');
    const [vehiclePlate, ChangeVehiclePlate] = React.useState('LEO-1234');
    const [clienteAtual, SetClienteAtual] = React.useState({});
    React.useEffect(() => {
        fetch("http://192.168.88.91:3001/current_client")
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
        if (!(vehicleName && vehiclePlate )) {
            alert("Preencha todos os campos!")
            return
        }
        if (vehiclePlate.length < 7) {
            alert("Placa inválida")
            return
        }
    
        const vehicleDetails = {
            nickname: vehicleName,
            plate: vehiclePlate,
            client_id: clienteAtual.id
        }
        console.log("vehicle details: "+vehicleDetails)
        salvarVeiculo(vehicleDetails);
        // userDetails = JSON.stringify(userDetails)
        //console.log(vehicleDetails)
       // setVehicles([...vehicles, vehicleDetails])
        //console.log(vehicles)
        //Se API retornar token, prossigo, senão, alerta de erro.
        navigation.navigate('Vehicles')
    }
    async function salvarVeiculo(vehicleDetails) {
        const response = await Api.post('/vehicles', {
            vehicle: vehicleDetails
        })
            .then(function (response) {
                console.log(response.status);
                console.log(response.data);
                let newVehicle = response.data
                setVehicles([...vehicles, newVehicle]) //Defino como usuário ativo no momento.
                console.log(vehicles)
                ChangeVehicleName("")
                ChangeVehiclePlate("")
                //Se API retornar token, prossigo, senão, alerta de erro.
                navigation.navigate('Router')
            })
            .catch(function (error) {
                console.log("Erro ao salvar veículo")
                console.log(error);
                alert("Credenciais ou senha inválidas.")
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Adicione um veículo</Text>
                <Text style={styles.label}>Certifique-se que você inseriu as informações corretas do veículo, elas serão usadas para identificá-lo.</Text>
            </View>
           
            <TextInput style={styles.input}
                onChangeText={ChangeVehicleName}
                value={vehicleName}
                placeholder='Apelido do carro' />

            <TextInput style={styles.input}
                onChangeText={ChangeVehiclePlate}
                value={vehiclePlate}
                maxLength={8}
                placeholder='Placa do carro' />

            {/*Faltando realizar validações e bater na api para logar e avançar para*/}
            <SuccessButton label={"Adicionar veículo"} navegarPara={() => enviarDados()} />

           

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        alignContent: "center",
        gap: 10,
        top: 0,
    },

    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: -100,
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
        fontSize: 15,
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
        top: -100,
    },
})