class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    login(inputUsername, inputPassword) {
        return this.username === inputUsername && this.password === inputPassword;
    }
}

class Book {
    constructor(title, author, category) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.status = "Available";
    }

    issueBook() {
        this.status = "Issued";
    }

    returnBook() {
        this.status = "Available";
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.displayBooks();
    }

    deleteBook(index) {
        this.books.splice(index, 1);
        this.displayBooks();
    }

    toggleStatus(index) {
        if (this.books[index].status === "Available") {
            this.books[index].issueBook();
        } else {
            this.books[index].returnBook();
        }
        this.displayBooks();
    }

    searchBooks(searchText) {
        const lowerSearch = searchText.toLowerCase();
        return this.books.filter(book => {
            return book.title.toLowerCase().includes(lowerSearch) || 
                   book.author.toLowerCase().includes(lowerSearch);
        });
    }

    updateCounter() {
        const counter = document.getElementById("counter");
        if (counter) {
            counter.innerText = "Total Books: " + this.books.length;
        }
    }

    displayBooks(filteredBooks = this.books) {
        let bookList = document.getElementById("bookList");
        if (!bookList) return;

        bookList.innerHTML = "";

        filteredBooks.forEach((book, index) => {
            let li = document.createElement("li");

            li.innerHTML = `
                <strong>${book.title}</strong><br>
                Author: ${book.author}<br>
                Category: ${book.category}<br>
                Status: ${book.status}<br><br>
            `;

            // FIXED: Creating buttons programmatically via DOM methods to satisfy SonarQube
            let toggleBtn = document.createElement("button");
            toggleBtn.innerText = book.status === "Available" ? "Issue" : "Return";
            toggleBtn.addEventListener("click", () => this.toggleStatus(index));

            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.addEventListener("click", () => this.deleteBook(index));

            li.appendChild(toggleBtn);
            li.appendChild(deleteBtn);
            bookList.appendChild(li);
        });

        this.updateCounter();
    }
}

// Initialization and Event Setup
const admin = new User("admin@gmail.com", "admin123");
const library = new Library();

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (admin.login(username, password)) {
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Login Credentials");
        }
    });
}

const addBookBtn = document.getElementById("addBookBtn");
if (addBookBtn) {
    addBookBtn.addEventListener("click", () => {
        let title = document.getElementById("titleInput").value;
        let author = document.getElementById("authorInput").value;
        let category = document.getElementById("categoryInput").value;

        if (title === "" || author === "" || category === "") {
            alert("Please Fill All Fields");
            return;
        }

        let newBook = new Book(title, author, category);
        library.addBook(newBook);

        document.getElementById("titleInput").value = "";
        document.getElementById("authorInput").value = "";
        document.getElementById("categoryInput").value = "";
    });
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("keyup", () => {
        // FIXED: Call the correct method name and re-paint the screen dynamically
        let filtered = library.searchBooks(searchInput.value);
        library.displayBooks(filtered);
    });
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
