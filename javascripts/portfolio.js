import {fetchHeader} from "./utils.js";  



const setup = async () => {
    await fetchHeader();
    setupEventListeners();
}

const linkProjects = () => {   
    const projects = document.querySelectorAll(".project"); 
    projects.forEach(project => {
        project.addEventListener("click", () => {
            const link = project.getAttribute("data-link"); 
            if (link) window.open(link); 
            else alert("Nothing is linked");
        })
    });
}


const setupEventListeners = () => {
    linkProjects();
}

document.addEventListener("DOMContentLoaded", setup); 