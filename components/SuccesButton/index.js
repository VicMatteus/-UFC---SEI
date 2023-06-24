import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SuccessButton({ label, navegarPara }) {
    return (
        <TouchableOpacity style={styles.container} onPress={navegarPara}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1FD1A4',
        height: 40,
        width: '90%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonLabel: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
