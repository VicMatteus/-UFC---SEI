import axios from 'axios';

//Não sei bem o pq, mas precisei fazer isso pra funcionar.
//Lembrar de trocar endereço da url base!!!

const Api = axios.create({
    baseURL: 'http://192.168.1.229:3001/'
});

export default Api;