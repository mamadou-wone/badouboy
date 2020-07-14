let formulaire = document.getElementById('formulaire');
let inputNumber = document.querySelector('input');
let selectParite = document.getElementById('parite');
let selectRandNumber = document.getElementById('randNumber');
let error = document.querySelector('small');
let button = document.querySelector('button');
let h1 = document.querySelector('h1');
let h6 = document.querySelector('h6');
let h3 = document.querySelector('h3');

h3.style.display = 'none';
h6.style.display = 'none';
error.style.display = 'none';

let ordiGain = 0;
let userMoney = 100;
let userGain = 0;
let userMise = 0;
let userCagnote = [];




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
    if (number <= 0 || number > 36) {
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
        error.style.display = 'none';
        let userNumber = inputNumber.value;
        console.log(userNumber);
        verifyUserNumber(userNumber);
    });

    inputNumber.addEventListener('click', (e) => {
        error.style.display = 'none';
        e.stopPropagation();
        let userNumber = inputNumber.value;
        verifyUserNumber(userNumber);
    });

}

setInterval(inputVerify, 1000);

// Je crée une fonction qui retourne le résultat du joueur
function getUserResult(userNumber, randNumber, userSelect) {

    userNumber = parseInt(userNumber);
    userMise = userMoney - userNumber;
    if (randNumber == userNumber) {
        console.log('Vous avez gagné');
        userGain = [(userNumber * 35) + userNumber];
        console.log('Votre gain ' + userGain);
        userMoney = parseInt(userMise) + parseInt(userGain);
        h1.textContent = 'Votre Cagnotte est ' + userMoney;
        h6.style.display = 'contents';
        console.log('Vous avez gagné ' + userGain + ' et votre cagnotte est de ' + userMoney);
    } else if (randNumber != userNumber && userSelect == 'pair' && randNumber % 2 == 0) {
        userGain = userNumber * 2;
        console.log('Votre gain ' + userGain);
        userMoney = parseInt(userMise) + parseInt(userGain);
        console.log('Vous avez gagné ' + userGain + ' et votre cagnotte est de ' + userMoney);
        h1.textContent = 'Votre Cagnotte est ' + userMoney;
        h6.style.display = 'contents';
    } else if (randNumber != userNumber && userSelect == 'impair' && randNumber % 2 != 0) {
        userGain = userNumber * 2;
        console.log('Votre gain ' + userGain);
        userMoney = parseInt(userMise) + parseInt(userGain);
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
        if (inputNumber.value > userMoney) {
            error.textContent = 'Votre cagnotte ne vous permet pas de faire cette mise';
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
    console.log('User Number ' + userNumber);
    console.log('Rand Number ' + randNumber);
    console.log('Rand Select ' + userSelect);
    getUserResult(userNumber, randNumber, userSelect);
    inputNumber.value = '';
    selectParite.value = '';


});