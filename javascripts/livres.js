import {fetchHeader} from "./initPage.js";  
import { parseJson } from "./utils.js";

const bookDataPath = "../data/books.json";


const createHtmlTableBook = async () => {

    const bookData = await parseJson(bookDataPath);

    if (!bookData || bookData.length === 0) {
        bookTab.innerHTML = "<p>Aucun livre renseigné</p>";
        return; 
    }

    const bookTab = document.getElementById("book-tab");
    bookTab.innerHTML = ""; 

    const bookTable = document.createElement("table");

    bookTable.appendChild(buildTitleRow()); 

    bookData.forEach( book => {
        bookTable.appendChild(buildRow(book)); 
    })

    bookTab.appendChild(bookTable); 

}
/*Used in createHtmlTableBook */
const buildTitleRow = () => {

    const row = document.createElement('tr'); 


    const title = document.createElement('td');
    title.textContent = 'Titre';

    const author = document.createElement('td');
    author.textContent = 'Aut.eur.rice';
    
    const grade = document.createElement('td');
    grade.textContent = 'Note';

    const category = document.createElement('td');
    category.textContent = 'Catégorie';

    const summary = document.createElement('td');
    summary.textContent = 'Résumé';

    const readingYear = document.createElement('td');
    readingYear.textContent = 'Année de lecture';

    const year = document.createElement('td'); 
    year.textContent = 'Année de sortie'; 

    row.append(title, author, grade, category, summary, readingYear, year); 

    return row; 
}

const buildRow = (bookData) => {
    const row = document.createElement('tr'); 


    const title = document.createElement('td');
    title.textContent = bookData.title;

    const author = document.createElement('td');
    author.textContent = bookData.author;
    
    const grade = document.createElement('td');
    grade.textContent = bookData.grade;

    const category = document.createElement('td');
    category.textContent = bookData.category;

    const summary = document.createElement('td');
    summary.textContent = bookData.description;

    const readingYear = document.createElement('td'); 
    readingYear.textContent = bookData.reading_year

    const year = document.createElement('td');
    year.textContent = bookData.year;

    const deleteButton = document.createElement('button'); 
    deleteButton.textContent = "❌";

    const editButton = document.createElement('button'); 
    editButton.textContent = "📝"; 

    deleteButton.addEventListener("click", () => {deleteBook(bookData.id)}); 
    editButton.addEventListener("click", () => {editBook(bookData.id)}); 
  
    row.append(title, author, grade, category, summary, readingYear, year, deleteButton, editButton);
    return row;     
}


// function below is building a different object (with same items tho) than JSON data
const sendForm = async (event, form) => {
    event.preventDefault(); // block user inputs during the function 
    
    const bookData = {
        title: form.title.value,
        description: form.description.value,
        year: parseInt(form.year.value) || 0,
        reading_year: parseInt(form["reading-year"].value) || 0, 
        grade: parseInt(form.grade.value) || 0,
        author: form.author.value,  
        category: form.category.value
    };

    try { 
        const response = await fetch("/api/books", {
            method:"POST", 
            headers:{"Content-Type": "application/json"}, 
            body:JSON.stringify(bookData)
        }) 

        if(!response.ok) {
            const text = await response.text(); 
            console.error(`response not ok\nresponse received : ${text}`); 
            return; 
        } 

        const data = await response.json(); 
        console.log("book added"); 

        createHtmlTableBook(await fetchList());

    } catch (error) {
        console.error(`error while sending form for new book : ${error}`); 
    }


}

const deleteBook = async (id) => {
    try {
        const response = await fetch(`/api/books/${id}`, {method:"DELETE"}); 
        if (!response.ok) {
            const text = await response.text(); 
            console.error(`error while deleting book with id ${id}\nresponse received : ${text}`); 
            return; 
        } 
        const data = await response.json(); 
        console.log(`book with id ${id} deleted`); 

        createHtmlTableBook(await fetchList()); 

    } catch (error) {
        console.error(`fatal error while deleting book with id ${id}\nerror received : ${error}`); 
    }
}

const editBook = async (id, updatedBook) => {

    document.getElementById("add-book").hidden = true; 
    document.getElementById("edit-book").hidden = false; 

    prefillEditForm(updatedBook);

    try {
        const response = await fetch(`/api/books/${id}`, {
            method: "PATH", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(updatedBook)
        }); 
        if (!response.ok){
            const text = await response.text(); 
            console.error(`error while editing book with id ${id}\nresponse received : ${text}`); 
            return; 
        }
        const data = await response.json(); 
        createHtmlTableBook(await fetchList()); 
    } catch (error){
        console.error(`fatal error while editing book with id ${id}\nerror received : ${error}`); 
    }
}

const prefillEditForm = (bookData) => {
    document.getElementById("edit-title").value = bookData.title; 
    document.getElementById("edit-author").value = bookData.author; 
    document.getElementById("edit-grade").value = bookData.grade;
    document.getElementById("edit-category").value = bookData.category; 
    document.getElementById("edit-description").value = bookData.description;  
    document.getElementById("edit-reading-year").value = bookData.reading_year; 
    document.getElementById("edit-year").value = bookData.year; 
}

const setup = 
    async () => {
        fetchHeader();
        createHtmlTableBook(await fetchList()); 
}

document.addEventListener("DOMContentLoaded", async (event) => {
    await setup();
    const addForm = document.getElementById("add-book-form"); 
    const editForm = document.getElementById("edit-book-form");
    addForm.addEventListener("submit", (event) => {sendForm(event,addForm)})
    editForm.addEventListener("submit", (event) => {sendForm(event,editForm)})
});