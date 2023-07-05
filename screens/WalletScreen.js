import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/header";
import ItemPagamento from "../components/ItemPagamento";
import { useUserStore } from "../store";
import Api from "../Api";

export default function WalletScreen({ navigation }) {
    // const {user, ChangeUser} = useUserStore();
    const {payments, setPayments} = useUserStore();
    const [pagamentos, SetPagamentos] = React.useState([]);

    function handleClick() {
        navigation.navigate('AddPaymentMethod')
    }

    React.useEffect(() => {
        recuperarPagamentos();
    }, [])
    
    async function recuperarPagamentos() {
        const response = await Api.get('/payment_methods')
            .then(function (response) {
                console.log(response.status);
                console.log(response.data)
                let cartoes = response.data
                setPayments(cartoes) //Defino como usuário ativo no momento.

                //Se API retornar token, prossigo, senão, alerta de erro.
                // navigation.navigate('Router')
            })
            .catch(function (error) {
                console.log("Erro ao recuperar métodos de pagamento: ")
                // console.log(error.response.status);
                alert("Credenciais ou senha inválidas.")
            });
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Gerencie seus métodos de pagamento:</Text>
            </View>
            <TouchableOpacity style={styles.parkingButtom} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>Adicionar método de pagamento</Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                {payments.length > 0 ? <Text style={styles.text}>Métodos disponíveis:</Text> : <></>}
            </View>
            
            <View style={styles.ScrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    {
                        payments.map((cartao)=><ItemPagamento id={cartao.id} key={cartao.id} number={cartao.card_number} status={true/*cartao.status*/} name={cartao.cardholder_name} vencimento={cartao.validity} />)
                    }
                </ScrollView>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 5, //evita ficar em cima da barra de notificações
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
    },
    textContainer: {
        alignItems: 'flex-start',
        margin: 10,
        width: '85%',
    },
    text: {
        fontSize: 17,
        color: "white",
    },
    parkingButtom: {
        flexDirection: "row",
        backgroundColor: "#bb86fc",
        margin: 10,
        height: 60,
        width: "85%",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 10,
    },
    buttonText: {
        margin: 10,
        fontSize: 17,
        color: "white",
    },
    ScrollViewContainer: {
        width: '85%',
        height:'65%',
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: '100%',
        height:'100%',
    },
});
