var numbers = [0,1,2,3,4,5,6,7,8,9];
var lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z'];
var uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'];
var special = ['!','@','#','$','%','&','*','_'];

/*==== Range ====================*/

document.getElementById('range').oninput = function () {
	document.getElementById('password-length').innerHTML = this.value;
}

/*==== Button ===================*/

generatePass();

document.getElementById('generator').onclick = generatePass;

function generatePass() {
	var result = [];
	if (document.getElementById('numbers').checked) {
		result = result.concat(numbers);
	}
	if (document.getElementById('lower-letters').checked) {
		result = result.concat(lowercase);
	}
	if (document.getElementById('upper-letters').checked) {
		result = result.concat(uppercase);
	}
	if (document.getElementById('symbols').checked) {
		result = result.concat(special);
	}
	result.sort(compareRandom);

	document.getElementById('result-password').innerHTML = '';

	for (var k = 0; k < 5; k++) { 
		var pass = '';
		var passLength = parseInt(document.getElementById('range').value);
		for (var i = 0; i < passLength; i++) {
			pass += result[randomInteger(0, result.length - 1)];
		}
		document.getElementById('result-password').innerHTML += '<li class="password">' + pass + '</li>';
	}

	copyPass();
}

function compareRandom(a,b) {
	return Math.random() - 0.5;
}

function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

/*==== Copy ===================*/

function copyPass() {
	var passwords = document.querySelectorAll('.password');

	for (let i=0; i<passwords.length; i++) {
		passwords[i].onclick = function() {
			document.execCommand("copy");
		}

		passwords[i].addEventListener("copy", function(event) {
			event.preventDefault();
			if (event.clipboardData) {
				event.clipboardData.setData("text/plain", passwords[i].textContent);
			}
		})
	}
}


