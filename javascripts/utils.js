const parseJson = async (path) => {
    try {
        const response = await fetch(path); 
        if(!response.ok) throw new Error(`HTTPS error ${response.status} : ${response.statusText} `); 

        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error(`error while parsing : ${error}`); 
        return []; 
    }
}

 
const fetchHeader = async () => {
    try {
        const response = await fetch('header.html'); 
        if (!response.ok) throw new Error("can't load header"); 
        const html = await response.text(); 
        document.getElementById("header-placeholder").innerHTML = html; 
    } catch (error) {
        console.error(`error while loading header : ${error}`); 
    }
    return; 
}

export {parseJson,fetchHeader}; 