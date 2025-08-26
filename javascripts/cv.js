import {fetchHeader} from "./utils.js";  



// Setup async
const setup = async () => {
    await fetchHeader();
}

document.addEventListener("DOMContentLoaded", setup);

