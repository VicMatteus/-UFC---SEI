import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'
import { useUserStore } from '../store';
import Api from "../Api";
import { ipv4 } from '../enderecoBack.js';
import DropDownPicker from 'react-native-dropdown-picker';

export default function BookVacancy({ navigation }) {
    const { reserva, setReserva } = useUserStore();

    const [clienteAtual, SetClienteAtual] = React.useState({});
    const [estacionamentos, SetEstacionamentos] = React.useState([])
    const [vagas, ChangeVagas] = React.useState([])

    //Estados para o dropdown de estacionamentos
    const [open, setOpen] = React.useState(false);
    const [valueParking, setValueParking] = React.useState(null);
    const [items, setItems] = React.useState([
        { label: 'label', value: 'valor' },
    ]);

    //Estados para o dropdown de vagas
    const [openVacancy, setOpenVacancy] = React.useState(false);
    const [valueVacancy, setValueVacancy] = React.useState(null);
    const [itemsVacancy, setItemsVacancy] = React.useState([
        { label: 'label', value: 'valor' },
    ]);


    React.useEffect(() => {
        console.log(reserva)
        //Busca o cliente atual
        fetch("http://" + ipv4 + ":3001/current_client")
            .then(response => response.json())
            .then(data => {
                console.log(data.id)
                SetClienteAtual(data)
            })
            .catch(error => {
                console.log(error)
            })

        //Busca a lista de estacionamentos
        fetch("http://" + ipv4 + ":3001/search/parkings")
            .then(response => response.json())
            .then(data => {
                SetEstacionamentos(data)
                itensDropdown = data.map(estacionamento => {
                    return {
                        label: "Nome: "+estacionamento.name + "\nEndereço: " + estacionamento.address + "\nValor: " + estacionamento.cost_per_hour,
                        value: estacionamento.id
                    }
                })
                // console.log(itensDropdown)
                setItems(itensDropdown)

            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    //Busca a lista de vagas para o estacionamento selecionado
    React.useEffect(() => {
        fetch("http://" + ipv4 + ":3001/search/vacancies?parking_id=" + valueParking)
            .then(response => response.json())
            .then(data => {
                ChangeVagas(data)
                itensDropdown = data.map(vaga => { return { label: vaga.code, value: vaga.id } })
                // console.log(itensDropdown)
                setItemsVacancy(itensDropdown)
            })
            .catch(error => {
                console.log(error)
            })
    }, [valueParking]);

    function enviarDados() {
        if (!(valueVacancy && valueParking)) {
            alert("Selecione todos os campos!")
            return
        }

        let bookingDetails = {
            vacancy_id: valueVacancy,
            client_id: clienteAtual.id
        }
        console.log("booking details: ")
        console.log(bookingDetails) //Para a requisição de criar reserva
        salvarReserva(bookingDetails); //Enquanto ainda não bato na api

        //Para salvar mais informações da vaga reservada localmente
        // detalhesReserva = {
        //     reservaDetails: {vacancy_id: valueVacancy, client_id: clienteAtual.id,},
        //     vacancyDetails: vagas.filter((vaga) => vaga.id === valueVacancy)[0],
        //     parkingDetails: estacionamentos.filter((estacionamento) => estacionamento.id === valueParking)[0]
        // }
        // console.log(detalhesReserva);
        // setReserva(detalhesReserva)
        // console.log("reserva: ");
        // console.log(reserva)
        // ChangeVagas("")
        // navigation.navigate('Home')
    }

    async function salvarReserva(bookingDetails) {
        const response = await Api.post('/vacancy_reservations', {
            vacancy_reservation: bookingDetails
        })
            .then(function (response) {
                console.log(response.status);
                console.log(response.data);
                let novaReserva = response.data
                detalhesReserva = {
                    reservaDetails: novaReserva,
                    vacancyDetails: vagas.filter((vaga) => vaga.id === valueVacancy)[0],
                    parkingDetails: estacionamentos.filter((estacionamento) => estacionamento.id === valueParking)[0]
                }
                setReserva(detalhesReserva)
                console.log(detalhesReserva)
                setValueVacancy("")
                setValueParking("")
                navigation.navigate('Router')
            })
            .catch(function (error) {
                console.log("Erro ao salvar reserva.")
                console.log(error);
                alert("Erro ao salvar reserva.")
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Reserve sua vaga</Text>
                <Text style={styles.label}>Ao reservar uma vaga no estacionamento, você paga uma taxa adicionar de X reais. O cancelamento da reserva será efetuado se o cliente não chegar no estacionamento em até uma hora.</Text>
            </View>

            <View style={{ width: '90%', zIndex: 3 }}>
                <DropDownPicker
                    listMode={items.length > 4 ? 'MODAL' : 'FLATLIST'}
                    modalAnimationType="slide"
                    open={open}
                    value={valueParking}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValueParking}
                    setItems={setItems}
                    placeholder='Estacionamentos'
                    dropDownDirection="bottom"
                    maxHeight={300}
                    labelProps={{
                        // numberOfLines: 3,
                    }}
                    style={styles.dropdown}
                />
            </View>

            <View style={{ width: '90%', zIndex: 2 }}>
                <DropDownPicker
                    listMode={itemsVacancy.length > 4 ? 'MODAL' : 'FLATLIST'}
                    modalAnimationType="slide"
                    open={openVacancy}
                    value={valueVacancy}
                    items={itemsVacancy}
                    setOpen={setOpenVacancy}
                    setValue={setValueVacancy}
                    setItems={setItemsVacancy}
                    placeholder='Vagas'
                    dropDownDirection="bottom"
                    minHeight={200}
                    style={styles.dropdown}
                />
            </View>

            <SuccessButton label={"Reservar Vaga"} navegarPara={() => enviarDados()} />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        gap: 10,
        top: 0,
    },

    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // top: -100,
    },
    text: {
        fontSize: 48,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10
    },
    label:
    {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 15,
        marginVertical: 10
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

})