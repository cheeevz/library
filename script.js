const myLibrary = [];
const addBookDialog = document.querySelector('#bookForm');
const addBookButton = document.querySelector('.add');
const cancelButton = document.querySelector('.cancel');
const okButton = document.querySelector('.ok');
const formTitle = document.querySelector('#name');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('.switch-toggle');
const readYes = document.querySelector('#on');
const readNo = document.querySelector('#off');
const bookForm = document.getElementById('newBook');
const bookList = document.querySelector('#bookList');
const bookName = document.getElementById("name");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");



addBookButton.addEventListener('click', () => {
  readYes.checked = false;
  readNo.checked = false;
  formRead.style.backgroundColor = "white";
  addBookDialog.show();
});

cancelButton.addEventListener('click', () => {
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  readYes.checked = false;
  readNo.checked = false;
  formRead.style.backgroundColor = "white";
  addBookDialog.close();
});

okButton.addEventListener('click', () => {
  if (bookName.validity.valueMissing) {
    bookName.setCustomValidity("The book name must be filled!");
  }
  else if (bookAuthor.validity.valueMissing) {
    bookAuthor.setCustomValidity("The book author must be filled!");
  }
  else if (bookPages.validity.valueMissing) {
    bookPages.setCustomValidity("The number of pages must be filled!");
  }
  else {
    addBook(formTitle.value, formAuthor.value, formPages.value, readYes.checked);
  }
  
});
function addBook(bookTitle, bookAuthor, bookPages, bookRead) {
  let title = bookTitle;
  let author = bookAuthor;
  let pages = parseInt(bookPages);
  let read = bookRead;
  addBookToLibrary(title, author, pages, read);
  displayBooks();
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  readYes.checked = false;
  readNo.checked = false;
  formRead.style.backgroundColor = "white";
  addBookDialog.close();
}

bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const bookDiv = e.target.parentElement.parentElement;
    const index = Array.from(bookList.children).indexOf(bookDiv);
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  } else if (e.target.classList.contains('read')) {
    const bookDiv = e.target.parentElement.parentElement;
    const index = Array.from(bookList.children).indexOf(bookDiv);
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
  }
});


function Book(title, author, pages, read, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (this.read === false) {
      return this.title + " by " + this.author + ", " + this.pages + ", not read yet "
    }
    else {
      return this.title + " by " + this.author + ", " + this.pages + ", has been read"

    }
  };
  this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
  let id = crypto.randomUUID();
  let book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
}

function displayBook() {
  myLibrary.forEach((element) => console.log(element));
}

function displayBooks() {
  bookList.innerHTML = '';
  myLibrary.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book', book.read ? 'read' : 'not-read');
    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <div class=buttonContainer>
      <button class="read">Read</button>
      <button class="remove">Remove</button>
      </div>
    `;
    bookList.appendChild(bookDiv);
  });
}


bookName.addEventListener("input", (event) => {
  if (bookName.validity.valueMissing) {
    bookName.setCustomValidity("The book name must be filled!");
    event.preventDefault();
  } else {
    bookName.setCustomValidity("");
  }
});

bookAuthor.addEventListener("input", (event) => {
  if (bookAuthor.validity.valueMissing) {
    bookAuthor.setCustomValidity("The book author must be filled!");
    event.preventDefault();
  } else {
    bookAuthor.setCustomValidity("");
  }
});

bookPages.addEventListener("input", (event) => {
  if (bookPages.validity.valueMissing) {
    bookPages.setCustomValidity("The number of pages must be filled!");
    event.preventDefault();
  } else {
    bookPages.setCustomValidity("");
  }
});