import {fetchHeader} from './utils.js'; 

const wait = (ms) => new Promise(resolve => setTimeout(resolve,ms))

const questionTextDiv = "question"; 
const questionText = document.getElementById(questionTextDiv); 

const resetQuestion = () => {
    questionText.innerHTML = ""; 
}

const changeQuestion = (text,add) => {
    add ? "wink wink ;)" : resetQuestion();  
    questionText.innerHTML += text; 
}

const mysteryLoop = () => {
    changeQuestion("On va commencer doucement, pensez à un nombre entre 0 et 104",true); 

    setTimeout( () => { 
        changeQuestion("je suis impressioné, personellement je n'ai jamais réussi à dépasser 12",false); 
    }, 7500);

    changeQuestion("Niquel, maintenant divisez le par 4",false); 
    setTimeout( () => { 
        changeQuestion("merde j'ai oublié d'effacer",false); 
    }, 2000);

}

const start = async () => {
    await fetchHeader();
    mysteryLoop();
}

document.addEventListener("DOMContentLoaded",start); 