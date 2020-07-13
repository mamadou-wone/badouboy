let formulaire = document.getElementById('formulaire');
let inputNumber = document.querySelector('input');
let selectParite = document.getElementById('parite');
let selectRandNumber = document.getElementById('randNumber');
let error = document.querySelector('small');
let button = document.querySelector('button');
let h1 = document.querySelector('h1');

let userMoney = 100;


error.style.display = 'none';

// On crée les options de 1 à 36
for (let i = 1; i < 37; i++) {
    let selectOption = document.createElement('option');
    selectOption.textContent = i;
    selectRandNumber.append(selectOption);
}

// JE crée la fonction Rand qui va générer un nombre aléatoire entre 0 et 36
function getRand(rand) {
    return Math.floor(Math.random() * Math.floor(rand));
}

let casinoNumber;

let randValue = () => {
    // On stock le nbre aléatoire dans une valeur
    let randNumber = getRand(37);
    document.querySelector('h1').textContent = randNumber;
}
setInterval(randValue, 5000);




// Je vérifie que l'utilisateur entre un nombre compris entre 1 et 36
// Je créé un fontion chargé de vérifié les saisie du joueur
function verifyUserNumber(number) {
    if (number <= 0 || number > 36) {
        error.style.display = 'contents';
        button.disabled = true;
    } else {
        error.style.display = 'none';
        button.disabled = false;
    }
}

//  j'ajoute un evenement sur le input number
inputNumber.addEventListener('keyup', () => {
    let userNumber = inputNumber.value;
    verifyUserNumber(userNumber);
});


// Je crée une fonction qui retourne le résultat du joueur
function getUserResult(userNumber, userSelect) {
    if (h1.textContent == userNumber) {
        console.log('Vous avez gagné');
        userMoney = userMoney + userMoney * 35;
        console.log(userMoney);
    } else if (h1.textContent = !userNumber && userSelect == 'pair') {
        userMoney = userMoney * 2;
        console.log(userMoney);
    } else if (h1.textContent = !userNumber && userSelect == 'impair') {
        userMoney = userMoney * 2;
        console.log(userMoney);
    } else {
        console.log('Vous avez perdu');
        userMoney = userMoney - userNumber;
        console.log(userMoney);
    }
}



// Je désactive le comportement par défaut du formulaire
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    randNumber = getRand(37);
    let userNumber = inputNumber.value;
    let userSelect = selectParite.value;
    getUserResult(userNumber, userSelect);
    inputNumber.value = '';
    selectParite.value = '';


});