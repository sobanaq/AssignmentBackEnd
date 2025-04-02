# Backend for Book Management System

## Overview
This project provides a backend API for managing books. It allows you to perform CRUD (Create, Read, Update, Delete) operations on books. The backend is built using Node.js, Express, and Supabase for database management.

---

## Features
### 1. Create
Add new books to the database.

### 2. Read
Fetch a list of all books.

### 3. Update 
Modify the details of an existing book.

### 4. Delete 
Remove a book from the database.

---

## Requirements

- Node.js (v14 or higher)
- Supabase (for database)


---

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <project_directory>
   ```
2. Install dependencies:
Run the following to install the necessary dependencies:

   ```sh
   npm install
   ```
3. Confirgure the environemtn variables:
   ```sh
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_supabase_anon_key>
PORT=5000
   ```
3. Start the server:
   ```sh
   npm start
   ```

---

## API Endpoints
1. POST /api/new_book
Create a new book. The request body should contain:
```
{
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "ISBN Number"
}
```
2. GET /api/get_books
Fetch all books from the database.

3. PUT /api/update_book
Update an existing book. The request body should contain:

```
{
  "id": "book_id",
  "title": "Updated Book Title",
  "author": "Updated Author Name",
  "isbn": "Updated ISBN Number"
}
```

4. DELETE /api/delete_book
Delete a book. The request body should contain:

```
{
  "id": "book_id"
}
```

---

## Author
Developed by Sobana Qadus

---
