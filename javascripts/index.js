import '../css/index.css';

import {fetchHeader} from "./initPage.js";  
 

const setup = () => {
    console.log("setup");
    fetchHeader();
}

document.addEventListener("DOMContentLoaded", setup); 