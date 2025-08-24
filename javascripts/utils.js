const parseJson = async (path) => {
    try {
        const response = await fetch(path); 
        if(!response.ok) throw new Error(`HTTPS error ${response.status} : ${response.statusText} `); 

        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error(`error while parsing : ${error}`); 
        return null; //maybe return [] is better 
    }
}

export {parseJson}; 