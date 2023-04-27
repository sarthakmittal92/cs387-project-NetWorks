var axios = require('axios');
var data = {
	"username": "bob_baker",
	"secret": "secret-123-jBj02",
	"email": "b_baker@mail.com",
};

var config = {
	method: 'post',
	url: 'https://api.chatengine.io/users/',
	headers: {
		'PRIVATE-KEY': '{af9a2350-4099-4dea-8ed1-f034693292e2}'
	},
	data : data
};

axios(config)
.then(function (response) {
	console.log(JSON.stringify(response.data));
})
.catch(function (error) {
	console.log(error);
});

// fetch('https://api.chatengine.io/users/', {
//               method: 'POST',   
//               headers: {
//                 'Content-type': 'application/json',
//                 'PRIVATE-KEY': '{af9a2350-4099-4dea-8ed1-f034693292e2}'
//               },
//               data : data,
//             })
//             .then(function (response) {
//                 console.log(JSON.stringify(response.data));
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });