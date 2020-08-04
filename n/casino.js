let formulaire = document.getElementById('formulaire');
let inputNumber = document.querySelector('input');
let selectParite = document.getElementById('parite');
let selectRandNumber = document.getElementById('randNumber');
let error = document.querySelector('small');
let button = document.querySelector('button');
let h1 = document.querySelector('h1');
let h6 = document.querySelector('h6');
let h3 = document.querySelector('h3');

let selectNumber = document.querySelector('#randNumber');

h3.style.display = 'none';
h6.style.display = 'none';
error.style.display = 'none';

let ordiGain = 0;
let userMoney = 100;
let userGain = 0;
let UserRestCash = 0;
let userCagnote = [];

let mise = 0;


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


// Je vérifie que l'utilisateur entre un nombre compris entre 1 et 36
// Je créé un fontion chargé de vérifié les saisie du joueur
function verifyUserNumber(number) {
    number = parseInt(number);
    if (number <= 0 || number > userMoney) {
        error.style.display = 'contents';
        button.disabled = true;
    } else {
        error.style.display = 'none';
        button.disabled = false;
    }
}

//  j'ajoute un evenement sur le input number
function inputVerify() {
    inputNumber.addEventListener('keyup', () => {
        let userNumber = inputNumber.value;
        mise = inputNumber.value;
        console.log('Votre mise est de ' + mise);
        verifyUserNumber(userNumber);
    });

    inputNumber.addEventListener('click', (e) => {
        error.style.display = 'none';
        e.stopPropagation();
        mise = inputNumber.value;
        let userNumber = inputNumber.value;
        verifyUserNumber(mise);
    });

}

setInterval(inputVerify, 1000);

// Je crée une fonction qui retourne le résultat du joueur
function getUserResult(mise, userNumber, randNumber, userSelect) {

    mise = parseInt(mise);
    UserRestCash = userMoney - mise;
    if (randNumber == 0) {
        // console.log('Vous avez votre mise');
        userGain = 0;
        userMoney = parseInt(UserRestCash);
        h1.textContent = 'Votre Cagnotte est ' + userMoney;
        h6.style.display = 'contents';
        console.log('Vous avez perdu et votre cagnotte est de ' + userMoney);
    } else if (randNumber == userNumber) {
        console.log('Vous avez gagné');
        userGain = [(mise * 35) + mise];
        console.log('Votre gain ' + userGain);
        userMoney = parseInt(UserRestCash) + parseInt(userGain);
        h1.textContent = 'Votre Cagnotte est ' + userMoney;
        h6.style.display = 'contents';
        console.log('Vous avez gagné ' + userGain + ' et votre cagnotte est de ' + userMoney);
    } else if (randNumber != mise && userSelect == 'pair' && randNumber % 2 == 0) {
        userGain = mise * 2;
        console.log('Votre gain ' + userGain);
        userMoney = parseInt(UserRestCash) + parseInt(userGain);
        console.log('Vous avez gagné ' + userGain + ' et votre cagnotte est de ' + userMoney);
        h1.textContent = 'Votre Cagnotte est ' + userMoney;
        h6.style.display = 'contents';
    } else if (randNumber != mise && userSelect == 'impair' && randNumber % 2 != 0) {
        userGain = mise * 2;
        console.log('Votre gain ' + userGain);
        userMoney = parseInt(UserRestCash) + parseInt(userGain);
        console.log('Vous avez gagné ' + userGain + ' et votre cagnotte est de ' + userMoney);
        h1.textContent = 'Votre Cagnotte est ' + userMoney;
        h6.style.display = 'contents';
    } else {
        userGain = 0;
        ordiGain += parseInt(userNumber) + parseInt(userGain);
        console.log('Votre gain ' + userGain);
        userMoney = parseInt(userMoney) - parseInt(userNumber);
        console.log('Vous avez perdu et votre cagnotte est de ' + userMoney);
        h1.textContent = 'Votre Cagnotte est ' + userMoney;
        h6.style.display = 'contents';
        h3.textContent = 'Gain de l\'ordinateur ' + ordiGain;
        h3.style.display = 'contents';
    }

    h6.addEventListener('click', () => {
        h1.textContent = 'Merci d\'avoir joué vous repartez avec ' + `${userGain === 0 ? 0 + '' : new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'CFA' }).format(userGain *1000) }` + ' Votre Cagnotte est de ' + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'CFA' }).format(userMoney * 1000);
        h1.style.color = 'yellow';
        h3.textContent = 'Gain de l\'ordinateur ' + `${ordiGain === 0 ? 0 + '' + ' CFA' : new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'CFA' }).format(ordiGain *1000)}`;
        h3.style.display = 'contents';
        h3.style.color = 'red';
        button.disabled = true;
        inputNumber.disabled = true;
        selectParite.disabled = true;
        selectRandNumber.disabled = true;
        h6.style.display = 'none';
    })

    // Je vérifie si l'utilisateur à toujours de l'argent à miser
    if (userMoney == 0) {
        h1.textContent = 'Vous êtes ruiné vous ne pouvez plus rien miser';
        button.disabled = true;
    }

    // je Vérifie si l'utilisateur fait bien une mise inférieur à sa cagnotte
    // Par exemple s'il joue jusqu'à avoir 11 (11 000) de cagnotte il ne peut pas miser plus de 11
    // par exemple une mise de 20
    inputNumber.addEventListener('keyup', (e) => {
        e.stopPropagation();
        if (parseInt(inputNumber.value) > userMoney) {
            error.textContent = 'Votre ne pouvez pas faire cette mise';
            error.style.display = 'contents';
            button.disabled = true;
        } else {
            error.style.display = 'none';
            button.disabled = false;
        }
    });


    inputNumber.addEventListener('click', (e) => {
        e.stopPropagation();
        if (inputNumber.value > userMoney) {
            error.textContent = 'Votre cagnotte ne vous permet pas de faire cette mise';
            error.style.display = 'contents';
            button.disabled = true;
        } else {
            error.style.display = 'none';
            button.disabled = false;
        }
    });





}



// Je désactive le comportement par défaut du formulaire
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    let randNumber = getRand(37);
    let userNumber = inputNumber.value;
    let userSelect = selectParite.value;
    let userSelectNumber = selectNumber.value;
    console.log(userSelectNumber);
    // console.log(ordiNumber.value);
    // console.log('User Number ' + userNumber);
    // console.log('Rand Number ' + randNumber);
    // console.log('Rand Select ' + userSelect);
    getUserResult(userNumber, userSelectNumber, randNumber, userSelect);
    // getUserResult(userNumber, randNumber, userSelect);
    inputNumber.value = '';
    selectParite.value = '';
    userSelectNumber.value = '';


});