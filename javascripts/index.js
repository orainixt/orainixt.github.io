import {fetchIndexHeader} from "./initPage.js";  
 

const setup = () => {
    fetchIndexHeader();
}

document.addEventListener("DOMContentLoaded", setup); 