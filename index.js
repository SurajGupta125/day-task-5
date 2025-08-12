let books = JSON.parse(localStorage.getItem("books")) || []; // Load from localStorage
let bookList = document.getElementById("book-list");
let bookForm = document.getElementById("book-form");
let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let errorMsg = document.getElementById("error-msg");
let editingBookId = null;

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Render books
function displayBooks() {
  bookList.innerHTML = "";
  books.forEach((book) => {
    const li = document.createElement("li");
    li.className = "book-item";

    li.innerHTML = `
      <div class="book-details">
        <strong>${book.title}</strong> by ${book.author}
      </div>
      <div class="book-actions">
        <button class="edit" onclick="editBook(${book.id})">Edit</button>
        <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
      </div>
    `;
    bookList.appendChild(li);
  });
}

// Add or update book
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    errorMsg.textContent = "Please fill in both fields.";
    return;
  }

  if (editingBookId !== null) {
    const book = books.find((b) => b.id === editingBookId);
    book.title = title;
    book.author = author;
    editingBookId = null;
  } else {
    const newBook = {
      id: Date.now(),
      title,
      author,
    };
    books.push(newBook);
  }

  titleInput.value = "";
  authorInput.value = "";
  errorMsg.textContent = "";

  saveToLocalStorage(); // Save
  displayBooks();
});

// Edit book
function editBook(id) {
  const book = books.find((b) => b.id === id);
  titleInput.value = book.title;
  authorInput.value = book.author;
  editingBookId = id;
}

// Delete book
function deleteBook(id) {
  books = books.filter((b) => b.id !== id);
  saveToLocalStorage(); // Save
  displayBooks();
}

// On page load
displayBooks();
