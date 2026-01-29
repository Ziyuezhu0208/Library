function Book(title,author,pages,isRead){
    if (!new.target){
        throw Error ("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author
    this.pages = pages
    this.isRead= isRead
    this.info = function(){
        console.log(`The ${this.title} by ${this.author},${this.pages}pages,${this.isRead ? "read" : "not yet"}`)
    }
    
}

const myLibrary = []

function addBookToLibrary(title,author,pages,isRead){
    let newBook = new Book(title,author,pages,isRead);
    myLibrary.push(newBook)
}

const library = document.querySelector("#library") 

function removeFromLibrary(id){
    const index = myLibrary.findIndex(book => book.id === id)
    if(index !== -1){
        myLibrary.splice(index,1)
    }
}

function displayLibrary(){
    library.innerHTML =""
    myLibrary.forEach(book =>{
        const bookCard  = document.createElement("div")
        bookCard.classList.add("book-card")
        bookCard.dataset.id =book.id
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.isRead ? "Read" : "Not yet"}</p>
        <button type="button" class="remove-btn">Remove</button>
        <button type ="button" class= "toggle-btn">Toggle Read</button>
        `
        library.appendChild(bookCard)

    })
}
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);

displayLibrary();

library.addEventListener("click",(event)=>{
    const card = event.target.closest(".book-card")
    if(!card) return;

    const bookId = card.dataset.id
    const book = myLibrary.find(b => b.id === bookId)
    if(!book) return;

    if(event.target.classList.contains("remove-btn")){
        removeFromLibrary(bookId);
        displayLibrary();
        return
    }

    if(event.target.classList.contains("toggle-btn")){
        book.toggleRead();
        displayLibrary();
        return;
    }

})

const addBtn = document.querySelector("#add")
const form = document.querySelector("#book-form")
const dialog = document.querySelector("#book-dialog")
const submitBtn = document.querySelector("#submit-btn")

addBtn.addEventListener("click", ()=>{
    form.reset();
    dialog.showModal();
})

form.addEventListener("submit", (event)=>{
event.preventDefault();

const title = form.elements.title.value.trim();
const author = form.elements.author.value.trim();
const pages = Number(form.elements.pages.value)
const read = form.elements.isRead.checked;

if(!title || !author){
    return 
}

addBookToLibrary(title,author,pages,read);
displayLibrary();
dialog.close()

})

Book.prototype.toggleRead = function(){
    this.isRead = !this.isRead
}