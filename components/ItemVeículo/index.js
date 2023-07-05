import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from "../../store";

export default function ItemVeiculo({ plate, name,}) {
    const {user, ChangeUser, vehicles, setVehicles, removeVehicle} = useUserStore();

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
              removeVehicle(plate);
            },
            style: 'destructive',
          },
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