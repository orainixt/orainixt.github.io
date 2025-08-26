import {fetchHeader} from "./utils.js";  

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
        {css:'#alias', text:'Master 1 Internet des Objets & Cyber-Sécurité'}, //to replace with studies
        {css:"#occupation",text:"Parcours Universitaire"},
        {css:"#front-end", text:"Licence Informatique : 2022 => 2025"},  
        {css:"#js-frameworks", text:"Licence MIASHS : 2021 => 2022"}, 
        {css:"#js-libs", text:"EPITA Cycle Préparatoire : 2020 => 2021 || MPSI : 2019 => 2020"}, 
        {css:"#css-frameworks", text:"Baccalauréat Scientifique AB || Cambridge Assessments B2"}, 
        {css:"#css-pre", text:"Projet Académiques"}, 
        {css:"#front-end-animation"}, 
        {css:"#CMS-development"}, 
        {css:"#wordpress"}, 
        {css:"#design"}, 
        {css:"#web-design"}, 
        {css:"#branding"}, 
        {css:"#design-animation"}
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

// Setup async
const setup = async () => {
    await fetchHeader();
    setTimeout(() => displayResume(),1500); 
}

document.addEventListener("DOMContentLoaded", setup);

