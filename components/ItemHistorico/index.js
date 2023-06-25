import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from "../../store";

export default function ItemHistorico({ data, entrada, saida, veiculo, valor }) {
    const {user, ChangeUser, payments, setPayments} = useUserStore();

    return (
        <TouchableOpacity style={styles.container} onPress={() => console.log('Item pressionado')}>
            <View style={styles.linha1}>
                <Text style={styles.info}>Data: {data}</Text>
                <Text style={styles.info}>Entrada: {entrada}</Text>
            </View>
            <View style={styles.linha1}>
                <Text style={styles.info}>Saída: {saida}</Text>
                <Text style={styles.info}>Valor: {valor}</Text>
            </View>
            <Text style={styles.info}>Veículo: {veiculo}</Text>
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