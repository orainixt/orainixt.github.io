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


const setup =  async () => {
    await fetchHeader();
    initRotateText(".word"); 
}

document.addEventListener("DOMContentLoaded", setup); 