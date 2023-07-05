import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from "../../store";
import Api from '../../Api';

export default function ItemVeiculo({ plate, name, id }) {
    const { user, ChangeUser, vehicles, setVehicles, removeVehicle } = useUserStore();

    async function removerVeiculo(idVeiculo) {
        const response = await Api.delete('/vehicles/' + idVeiculo)
            .then(function (response) {
                console.log(response.status);
                alert("Veículo removido com sucesso!")
                veiculos = vehicles.filter(veiculo => veiculo.id !== idVeiculo)
                console.log(veiculos)
                setVehicles(veiculos) //Defino como usuário ativo no momento.
            })
            .catch(function (error) {
                console.log(error.message)
                alert("Erro ao excluir método de pagamento: ")
            });
    }

    const showAlert = () =>
        Alert.alert(
            'Remover Veículo',
            'Deseja remover este veículo?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Remover',
                    onPress: () => {
                        console.log(vehicles)
                        indice = vehicles.indexOf(vehicles.filter(vehicle => vehicle.id === id)[0])
                        removerVeiculo(vehicles[indice].id)
                        console.log("Operação realizada")
                    },
                    style: 'destructive',
                }
            ],
            { cancelable: false }
        );

    return (
        <TouchableOpacity style={styles.container} onPress={() => showAlert()}>
            <View style={styles.linha1}>
                <Text style={styles.info}>Apelido:{name}</Text>
            </View>
            <Text style={styles.info}>Placa: {plate}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: 300,
        height: 55,
        alignItems: 'flex-start',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        padding: 6,
    },
    linha1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    info: {
        color: '#FFFFFF',
        // backgroundColor: 'gray',
        fontSize: 16,
        alignItems: 'flex-start'
    },
    statusAtivo: {
        color: 'green',
    },
    statusInativo: {
        color: 'red',
    }
})