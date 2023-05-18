const storedForm = localStorage.getItem('form');
const books = storedForm ? JSON.parse(storedForm) : [];

class Books {
  constructor(author, title, books, button) {
    this.author = author;
    this.title = title;
    this.books = books;
    this.button = button;
  }

  addBook() {
    // Create a new book object with the provided
    // title and author and directly push it to the books array
    this.books.push({ title: this.title, author: this.author });
  }

  deleteBook() {
    // Get the parent item and its parent element
    const item = this.button.parentNode;
    const parent = item.parentNode;
    // Remove the parent element from its parent node
    parent.parentNode.removeChild(parent);

    // Get the ID of the button
    const { id } = this.button;

    // Iterate through the books array
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.books.length; i++) {
      // Check if the ID includes the current index
      if (id.includes(i)) {
        // Remove the book at the current index
        this.books.splice(i, 1);
        // Exit the loop after the deletion
        break;
      }
    }
  }
}

// Function to store form data in localStorage
function storeForm(form) {
  // Convert the form object to a JSON string and store it in localStorage
  localStorage.setItem('form', JSON.stringify(form));
}

function displayBooks(book, index) {
  const content = `
      <div class="tableRow">
        <div class="bookInfo">
          <div class="title">${book.title}</div>
          <div class="author">by ${book.author}</div>
        </div>
        <div>
          <button id="delete${index}">Remove</button>
        </div>
      </div>
    `;

  return content;
}

const addButton = document.getElementById('addBook');
const newTitle = document.getElementById('bookTitle');
const newAuthor = document.getElementById('authorName');
const container = document.querySelector('.containerh1');
const navBar = document.querySelector('.nav-bar');

for (let i = 0; i < books.length; i += 1) {
  const book = displayBooks(books[i], i);
  container.innerHTML += book;
}

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  // Prevent the default form submission behavior

  // Check if the author and title values are not empty
  if (newAuthor.value !== '' && newTitle.value !== '') {
    // Create a new instance of the Books class with provided values
    const library = new Books(newAuthor.value, newTitle.value, books);

    library.addBook();

    // Call the addBook method of the Books class
    storeForm(books);

    // Store the updated library in some form of storage
    window.location.reload();
    // Reload the page
  }

  document.getElementById('addNewForm').reset(); // Reset the form
});

const btnDelete = document.querySelectorAll('[id^="delete"]');

// Iterate over each delete button
btnDelete.forEach((button) => {
  button.addEventListener('click', () => {
    // Create a new instance of the Books class with provided values and the clicked button
    const libraryOne = new Books(newAuthor.value, newTitle.value, books, button);

    libraryOne.deleteBook(); // Call the deleteBook method of the Books class
    storeForm(books); // Store the updated library in some form of storage
  });
});

// SPA

const homeNavboet = document.querySelector('.home-boet-nav');
const booksNavBra = document.querySelector('.books-boet-nav');
const navContact = document.querySelector('.contact-boet-nav');

const homeDiv = document.querySelector('.huis');
const bookDiv = document.querySelector('.dibooks');
const contactDiv = document.querySelector('.dicontacts');

function handleClick() {
  homeNavboet.style.color = 'blue';
  booksNavBra.style.color = 'black';
  navContact.style.color = 'black';
  homeDiv.style.display = 'flex';
  bookDiv.style.display = 'none';
  contactDiv.style.display = 'none';
}

homeNavboet.addEventListener('click', handleClick);

function handleBooksNavClick() {
  homeNavboet.style.color = 'black';
  booksNavBra.style.color = 'blue';
  navContact.style.color = 'black';
  homeDiv.style.display = 'none';
  bookDiv.style.display = 'flex';
  contactDiv.style.display = 'none';
}

booksNavBra.addEventListener('click', handleBooksNavClick);

function handleNavContactClick() {
  homeNavboet.style.color = 'black';
  booksNavBra.style.color = 'black';
  navContact.style.color = 'blue';
  homeDiv.style.display = 'none';
  bookDiv.style.display = 'none';
  contactDiv.style.display = 'block';
}

navContact.addEventListener('click', handleNavContactClick);

const handleNavClick = (navItem, navItems, sections) => {
  // Reset all nav items and sections
  navItems.forEach((item) => {
    item.style.color = 'black';
  });
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  // Highlight selected nav item and show corresponding section
  navItem.style.color = 'blue';
  const { sectionId } = navItem.dataset;
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = 'flex';
  }
};

navContact.addEventListener('click', () => {
  const navItems = navBar.querySelectorAll('.nav-item');
  handleNavClick(navContact, navItems, [contactDiv]); // <-- Pass contactDiv as argument
});

const timeSlot = document.getElementById('time');

const today = new Date();
const date = `${today.toLocaleString('default', { month: 'long' })} ${today.getDate()} ${today.getFullYear()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

timeSlot.innerHTML = dateTime;