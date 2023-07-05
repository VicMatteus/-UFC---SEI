import axios from 'axios';
import { ipv4 } from './enderecoBack';
//Não sei bem o pq, mas precisei fazer isso pra funcionar.
const Api = axios.create({
    baseURL: "http://"+ipv4+":3001/"
});

export default Api;