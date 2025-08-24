const fetchIndexHeader = async () => {
    try {
        const response = await fetch('html/header.html'); 
        if (!response.ok) throw new Error("can't load index header"); 
        const html = await response.text(); 
        document.getElementById("header-placeholder").innerHTML = html; 
    } catch (error) {
        console.error(`error while loading header : ${error}`); 
    }
}; 

const fetchHeader = async () => {
    try {
        const response = await fetch('header.html'); 
        if (!response.ok) throw new Error("can't load header"); 
        const html = await response.text(); 
        document.getElementById("header-placeholder").innerHTML = html; 
    } catch (error) {
        console.error(`error while loading header : ${error}`); 
    }
}

export {fetchIndexHeader, fetchHeader}; 