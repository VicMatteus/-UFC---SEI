import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import SuccessButton from '../components/SuccesButton'
import { useUserStore } from '../store';
import Api from "../Api";
import { ipv4 } from '../enderecoBack.js';
import DropDownPicker from 'react-native-dropdown-picker';


export default function BookVacancy({ navigation }) {
    const [vagas, ChangeVagas] = React.useState([]);
    const [parking, ChangeParking] = React.useState('');
    const [clienteAtual, SetClienteAtual] = React.useState({});
    const [estacionamentos, SetEstacionamentos] = React.useState([])

    //Estados para o dropdown
    const [open, setOpen] = React.useState(false);
    const [valueParking, setValueParking] = React.useState(null);
    const [items, setItems] = React.useState([
        { label: 'label', value: 'valor' },
    ]);

    const [openVacancy, setOpenVacancy] = React.useState(false);
    const [valueVacancy, setValueVacancy] = React.useState(null);
    const [itemsVacancy, setItemsVacancy] = React.useState([
        { label: 'label', value: 'valor' },
    ]);

    const { reservas, setReservas } = useUserStore();

    React.useEffect(() => {
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
                itensDropdown = data.map(estacionamento => { return { label: estacionamento.name, value: estacionamento.id } })
                console.log(itensDropdown)
                setItems(itensDropdown)

            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    React.useEffect(() => {
        //Busca a lista de vagas para o estacionamento selecionado
        fetch("http://" + ipv4 + ":3001/search/vacancies?parking_id="+valueParking)
            .then(response => response.json())
            .then(data => {
                ChangeVagas(data)
                itensDropdown = data.map(vaga => { return { label: vaga.code, value: vaga.id } })
                console.log(itensDropdown)
                setItemsVacancy(itensDropdown)

            })
            .catch(error => {
                console.log(error)
            })
    }, [valueParking]);

    function enviarDados() {
        if (!(vaga && parking)) {
            alert("Preencha todos os campos!")
            return
        }

        const bookingDetails = {
            vacancy_id: vaga,
            client_id: clienteAtual.id
            //Acho quer está faltando o id do estacionamento
        }
        console.log("booking details: ")
        console.log(bookingDetails)
        // salvarReserva(bookingDetails); //Enquanto ainda não bato na api
        setReservas([...reservas, bookingDetails])
        console.log(reservas)
        ChangeVaga("")
        ChangeParking("")
        navigation.navigate('Home')
    }

    async function salvarReserva(bookingDetails) {
        const response = await Api.post('/vehicles', {
            vacancy_reservation: bookingDetails
        })
            .then(function (response) {
                console.log(response.status);
                console.log(response.data);
                let novaReserva = response.data
                setReservas([...reservas, novaReserva])
                console.log(reservas)
                ChangeVaga("")
                ChangeParking("")
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
                    open={open}
                    value={valueParking}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValueParking}
                    setItems={setItems}
                    placeholder='Estacionamentos'
                    dropDownDirection="bottom"
                    maxHeight={300}
                    style={styles.dropdown}
                />
            </View>

            <View style={{ width: '90%', zIndex: 2 }}>
                <DropDownPicker
                    open={openVacancy}
                    value={valueVacancy}
                    items={itemsVacancy}
                    setOpen={setOpenVacancy}
                    setValue={setValueVacancy}
                    setItems={setItemsVacancy}
                    placeholder='Vagas'
                    dropDownDirection="bottom"
                    maxHeight={300}
                    style={styles.dropdown}
                />
            </View>

            {/* <TextInput style={styles.input}
                onChangeText={ChangeVaga}
                value={vaga}
                placeholder='Vaga' /> */}

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
        // top: -100,
    },
    dropdown: {
        alignItems: 'center',
        // width: '100%',
    }
})