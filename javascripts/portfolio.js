import {fetchHeader} from "./utils.js";  

const setup = async () => {
    await fetchHeader();
}

document.addEventListener("DOMContentLoaded", setup); 