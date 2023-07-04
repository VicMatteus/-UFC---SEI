//Exemplos das requisições para tela de login.


const axios = require('axios');
var token = ''

    // cliente = {
    //     name: "Username",
    //     last_name: "Lastname",
    //     telephone: "99 99999-9999",
    //     cpf: "999.999.999-99",
    //     email: "user@sei.co",
    //     password: "user123"
    // }
/*================================================*/

//Requisição para criar conta. - útil.
// clienteLogin = {
//     name: "UsernameTESTE2",
//     last_name: "LastnameTESTE2",
//     telephone: "99 99999-9999",
//     cpf: "999.999.999-99",
//     email: "testeCreateAccountTESTE2@sei.co",
//     password: "user123"
// }
// axios.post('http://localhost:3001/sign_up', {
//     client: clienteLogin
// })
// .then(function (response) {
//     token = response.headers.authorization
//     console.log(response.status);
//     console.log(response.data.message);
// })
// .catch(function (error) {
//     console.error(error);
// });

/*================================================*/

//Requisição para logar. - útil.
// cliente = {
//     "email": "user@sei.co",
//     "password": "user123"
// }
// axios.post('http://localhost:3001/login', {
//     client: cliente
// })
// .then(function (response) {
//     token = response.headers.authorization
//     console.log(response.status);
//     console.log('Token: ' + token); //Recupera o Token após logar.
//     console.log(response.data.message);
// })
// .catch(function (error) {
//     console.error(error);
// });

/*================================================*/


//Requisição para deslogar. - não 100%
// axios({
//     method: 'delete',
//     baseURL: 'http://localhost:3001',
//     url: '/logout',
//     headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MzEyMjIxZC05ZGY5LTQ5NTEtYjhkZC01MTA0ZGU4ZjZjYjEiLCJzdWIiOiIyIiwic2NwIjoiY2xpZW50IiwiYXVkIjpudWxsLCJpYXQiOjE2ODg0MjU2NTIsImV4cCI6MTY4OTcyMTY1Mn0.QvXilzcvAIdBxJ_U-1gwhFP58zwQFLRX5MgjBtSS800'}
// })
// .then(function (response) {
//     console.log(response.status);
//     console.log(response.data.message);
// })
// .catch(function (error) {
//     console.error(error);
// });

/*================================================*/

//Requisição para buscar user. - útil. trocar trocar token
// axios({
//     method: 'get',
//     baseURL: 'http://localhost:3001',
//     url: '/payment_methods',
//     // headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkMjRkZTIwNS02NTM5LTQxZTgtYjM3Ny1jM2Y3ZjQ2NDQ1MGMiLCJzdWIiOiIyIiwic2NwIjoiY2xpZW50IiwiYXVkIjpudWxsLCJpYXQiOjE2ODg0MjYzOTUsImV4cCI6MTY4OTcyMjM5NX0.JKw3sskUerJF5fIM0DaSzN8JFz4lH4HJiStvSumi6iA'}
// })
// .then(function (response) {
//     console.log(response.status);
//     console.log(response.data);
// })
// .catch(function (error) {
//     console.error(error);
// });


// async function fetchApi() {
//     userDetails = {
//         'email': 'email@example.com',
//         'password': '12345678'
//     }
//     const response = await axios.post('http://localhost:3001/login', {
//         client: userDetails
//     })
//         .then(function (response) {
//             // if (response.status === 200) {
//                 console.log(response.status);
//                 // token = response.headers.authorization;
//                 // console.log('Token: ' + token); //Recupera o Token após logar.
//                 // console.log(response.data.message);
//                 // storeData({ email: email, password: password, token: token })
//                 // ChangeUser({ email: email, password: password, token: token }) //Defino como usuário ativo no momento.

//                 // if (!isRememberMe) {
//                 //     ChangeEmail('')
//                 //     Changepassword('')
//                 //     removeData('user')
//                 // }

//                 //Se API retornar token, prossigo, senão, alerta de erro.
//                 // navigation.navigate('Router')
//             // }
//             // else {
//             //     alert("Usuário ou senha inválidos.")
//             //     return;
//             // }
//         })
//         .catch(function (error) {
//             console.error(error.response.status);
//             console.log("Erro ao logar com usuario: ")
//         });
// }

// response = fetchApi()

