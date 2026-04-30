const API_URL = "http://localhost:8080/books";

function loadBooks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("bookList");
            list.innerHTML = "";

            data.forEach(book => {
                const li = document.createElement("li");
                li.innerText = book.title + " by " + book.author;
                list.appendChild(li);
            });
        });
}

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author })
    })
    .then(() => {
        loadBooks();
    });
}

window.onload = loadBooks;

function loadBooks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("bookList");
            list.innerHTML = "";

            data.forEach(book => {
                const li = document.createElement("li");

                li.innerHTML = `
                    ${book.title} by ${book.author}
                    <button onclick="deleteBook(${book.id})">❌</button>
                `;

                list.appendChild(li);
li.innerHTML = `
    ${book.title} by ${book.author}
    <button onclick="deleteBook(${book.id})">❌</button>
    <button onclick="editBook(${book.id}, '${book.title}', '${book.author}')">✏️</button>
`;

            });
        });
}

function deleteBook(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(() => loadBooks());



}
function editBook(id, title, author) {
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;

    const btn = document.querySelector("button");
    btn.innerText = "Update Book";

    btn.onclick = function () {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                author: document.getElementById("author").value
            })
        }).then(() => {
            loadBooks();
            btn.innerText = "Add Book";
            btn.onclick = addBook;
        });
    };
}
function searchBooks() {
    const keyword = document.getElementById("search").value;

    fetch(`${API_URL}/search?keyword=${keyword}`)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("bookList");
            list.innerHTML = "";

            data.forEach(book => {
                const li = document.createElement("li");
                li.innerText = book.title + " by " + book.author;
                list.appendChild(li);
            });
        });
}