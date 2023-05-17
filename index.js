/* eslint-disable no-use-before-define */
// Retrieve books from localStorage or initialize an empty array
const books = JSON.parse(localStorage.getItem('books')) || [];

// Function to display books in the collection
function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('bookItem');
    bookItem.innerHTML = `<strong>Title:</strong> ${book.title}, <strong>Author:</strong> ${book.author}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBook(index);
    });

    bookItem.appendChild(removeBtn);
    bookList.appendChild(bookItem);
  });
}

// Function to add a new book to the collection
function addBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;

  if (title && author) {
    const newBook = {
      title,
      author,
    };

    books.push(newBook);

    localStorage.setItem('books', JSON.stringify(books));

    displayBooks();

    titleInput.value = '';
    authorInput.value = '';
  }
}

// Function to remove a book from the collection
function removeBook(index) {
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

// Event listener for the Add button
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addBook);

// Display the books initially
displayBooks();
