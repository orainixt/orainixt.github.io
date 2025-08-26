import {fetchHeader} from "./utils.js";  

// this function's bad cause it can't handle spaces
const initRotateText = (selector) => {

    const words = document.querySelectorAll(selector); 

    words.forEach(word => {

        const text = word.textContent;
        word.textContent = "";  

        for (const char of text) {
            const span = document.createElement("span"); 
            span.textContent = char;    
            span.className = "letter"; 
            word.append(span); 
        }
    }); 

    let currentWordIndex = 0; 
    let maxWordIndex = words.length - 1; 

    words[currentWordIndex].style.opacity = "1"; 

    const rotateText = () => {
        const currentWord = words[currentWordIndex]; 
        const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];  

        Array.from(currentWord.children).forEach( (letter,i) => {
            setTimeout(() => {
                letter.className = "letter-out"; 
            }, i*80); 
        }); 

        nextWord.style.opacity = "1";
        
        Array.from(nextWord.children).forEach( (letter,i) => {
            letter.className = "letter-behind"; 
            setTimeout(() => {
                letter.className = "letter-in"; 
            }, 340 + i * 80);  
        }); 

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1; 
    }

    rotateText(); 
    setInterval(rotateText, 4000); 
}

const initDot = document.getElementById("loading");

const loading = setInterval(() => {
    initDot.innerHTML.length === 5 ? "" : initDot.innerHTML += "."; 
}, 350 /**dot speed */); 

const $loadingMessage = $('#loadingH1');

setTimeout(() => {
    clearInterval(loading); 
    $loadingMessage.hide(); /**jQuery useful tool instead of document.getElementById */
}, 1500);


const loadingResume = () => {
    $("#loadingMessage2").show(); 
    const dotAlpha =  document.getElementById("alpha-loading"); 
    const loadingAlpha = setInterval(() => {
        dotAlpha.innerHTML = dotAlpha.innerHTML.length === 6 ? "" : ".";
        setTimeout(() => {
            clearInterval(loadingAlpha); 
            $("#loadingMessage2").hide(); 
        }, 2000); 
    }, 350);
} 

const initIdentityResults = () => {
    const elements = [
        {css:"#message", text:"RUNNING CODEPEN RESUME PROTOCAL (CRP) FOR @ORAINIXT"}, 
        {css:"#name", text:"Lucas Sauvage"},
        {css:'#studies', text:'Master 1 Internet des Objets & Cyber-Sécurité'}, //to replace with studies
        {css:"#university",text:"Parcours Universitaire"},
        {css:"#info-degree", text:"Licence Informatique : 2022 => 2025"},  
        {css:"#miashs-degree", text:"Licence MIASHS : 2021 => 2022"}, 
        {css:"#prepa-degree", text:"EPITA Cycle Préparatoire : 2020 => 2021 || MPSI : 2019 => 2020"}, 
        {css:"#bac-degree", text:"Baccalauréat Scientifique AB || Cambridge Assessments B2"}, 
        {css:"#academic", text:"Projet Académiques (ajouter hyperlienn vers portfolio"}
    ];
    
    return elements; 
}

const typeWriter = (element,text,speed=35,callback=null) => {

    let i = 0; 

    const typer = () => {
        element.addClass("sign cursor").text(text.substring(0,i)); 
        if (i < text.length) {
            setTimeout(() => {
                i++; 
                typer(); 
            }, speed); 
        } else {
            element.removeClass("cursor"); 
            if (callback) callback(); 
        }
    }

    typer();

}; 

const typeWriterPromise = async (element,text,speed=35) => {
    return new Promise(resolve => typeWriter(element,text,speed=35,resolve)); // use of async cuz resolve can be passed as callback (useful!)
}



const displayResume = async (i=0) => {

    const greetings = "UNIDENTIFIED ORGANIC LIFEFORM DETECTED"

    const elements = initIdentityResults(); 

    await typeWriterPromise($("greetings"), greetings); 
    loadingResume(); 

    for (const {css, text} of elements) {
        await typeWriterPromise($(css),text); 
    }
     

    // for (i ; i < elements.length; i++){
    //     const {css,text} = elements[i];
    //     typeWriter($(css), text, 35, () => {
    //         if (i===0) loadingResume(); 
    //         displayResume(i +1); 
    //     }) 
    // } NOT TODO => for loop's executing all i without even trigger displayResume (la boucle for s'éxecute avant que la récursion ne soit appelée)
};


const setup =  async () => {
    await fetchHeader();
    initRotateText(".word"); 
    setTimeout(() => displayResume(),1500); 
}

document.addEventListener("DOMContentLoaded", setup); 