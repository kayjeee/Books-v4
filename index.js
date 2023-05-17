/* eslint-disable no-use-before-define */

class Book {
  constructor() {
    // Retrieve books from localStorage or initialize an empty array
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  // Function to display books in the collection
  displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('bookItem');
      bookItem.innerHTML = `
      <div class="bookInfo">
        <div class="title">${book.title}</div><strong>by:</strong>
        <div class="author"> ${book.author}</div>
      </div>
    `;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
      });

      bookItem.appendChild(removeBtn);
      bookList.appendChild(bookItem);
    });
  }

  // Function to add a new book to the collection
  addBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const title = titleInput.value;
    const author = authorInput.value;

    if (title && author) {
      const newBook = {
        title,
        author,
      };

      this.books.push(newBook);

      localStorage.setItem('books', JSON.stringify(this.books));

      this.displayBooks();

      titleInput.value = '';
      authorInput.value = '';
    }
  }

  // Function to remove a book from the collection
  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }
}

// Create a new instance of the Book class
const myLib = new Book();

// Event listener for the Add button
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
  myLib.addBook();
});

// Display the books initially
myLib.displayBooks();
