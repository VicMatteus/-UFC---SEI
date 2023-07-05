import axios from 'axios';

//Não sei bem o pq, mas precisei fazer isso pra funcionar.
//Lembrar de trocar endereço da url base!!!
const ipv4 = '4.228.110.182'
const Api = axios.create({
    baseURL: "http://"+ipv4+":3001/"
});

export default Api;