import '../css/index.css';

import {fetchHeader} from "./initPage.js";  
 

const setup = () => {
    fetchHeader();
}

document.addEventListener("DOMContentLoaded", setup); 