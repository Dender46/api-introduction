var url = `https://api.github.com/users/paulogr/events/public`;
var email;
var username;

const nickInput = document.querySelector('#nick');
const result  = document.querySelector('.result');
const warning = document.querySelector('.warning');

var request = new XMLHttpRequest();
request.responseType = 'json';
request.onload = loadData;

nickInput.addEventListener('change', function(e) {
	e.defaultPrevented = true;
	request.open('GET', getUrl(nickInput.value));
	request.send();
});

function getUrl(nick) {
	return `https://api.github.com/users/${nick}/events/public`;
}


function loadData(data) {
	if (request.status != 200) {
		console.log('lolololol')
	  warning.classList.add('show'); 
		result.classList.remove('show');
		return;
	}

	data = request.response;
	name = 0;
	email = 0;
	console.log(data);
	for (let i = 0; i < data.length; i++) {
		if (data[i].payload.commits) {
			if (data[i].payload.commits.length != 0) {
				email 	 = data[i].payload.commits[0].author.email;
				username = data[i].payload.commits[0].author.name;
				break;
			}
		}
	}

	if (username || email) {
		document.getElementById('username').textContent = username;
		document.getElementById('email').textContent = email;
		result.classList.add('show');
		result.classList.add('show');
		warning.classList.remove('show');
	}
}