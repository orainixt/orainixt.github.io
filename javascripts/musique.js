import '../css/musique.css';

const actualizeMetronomeDisplay = () => {

    const slider = document.getElementById("metronome-slider");

    slider.addEventListener('input' , () => {

        document.getElementById("metronome-number-display").textContent = document.getElementById("metronome-slider").value;
        bpm = slider.value;
    }) 
};


const context = new AudioContext(); 
let cntr = 0; 
let bpm = 120;
let angle = 45; 
let isMetronomeActive = false; 

const wait = seconds => new Promise(r => setTimeout (r, seconds * 1e3)); 

const makeSound = () => {

    const sound = context.createOscillator(); 
    const fourthBeat = cntr++ % 4 === 0; 

    sound.frequency.value = fourthBeat ? 400 : 440; 
    sound.connect(context.destination); 
    sound.start(context.currentTime); 
    sound.stop(context.currentTime + .1); 
};

const startMetronome = async () => {

    const needle = document.querySelector(".needle"); 
    let currentAngle = -angle; 
    const seconds = 60 / bpm; 
    const interval = seconds / 2; 

    isMetronomeActive = true;

    setInterval( () => {
        currentAngle = currentAngle === -angle ? angle : -angle; 
        needle.style.transform = `rotate(${currentAngle}deg)`; 
    }, interval); 

    while (isMetronomeActive) {
        makeSound();
        await wait(seconds);
    }; 
}

const stopMetronome = () => { 
    isMetronomeActive = false; 
    cntr = 0; 
}


const setupEventListeners = () => {
    document.getElementById("start-metronome").addEventListener("click", () => {
        startMetronome(); 
    }); 
    document.getElementById("stop-metronome").addEventListener("click", () => {
        stopMetronome();
    })
}

const setup = () => {
    setupEventListeners();
}

document.addEventListener("DOMContentLoaded", function (event) {
    setup();
    actualizeMetronomeDisplay();
});