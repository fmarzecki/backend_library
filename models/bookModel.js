const getConnection = require('../config/db');
const BookDTO = require('../dto/bookDTO');

exports.getBooksPaginated = async (filter, filterBy, page = 0, size = 8) => {
    const connection = await getConnection();

    let offset = page * size;
    let query = `SELECT BookId, Title, BookAuthor, BookCategory, ImageUrl, Description FROM Book WHERE 1=1`;

    if (filter && filterBy) {
        query += ` AND ${filterBy} LIKE '%${filter}%'`;
    }

    query += ` OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

    const result = await connection.execute(query);

    const books = BookDTO.fromEntities(result.rows);

    const totalQuery = `SELECT COUNT(*) FROM Book WHERE 1=1`;
    const totalResult = await connection.execute(totalQuery);

    return {
        books,
        totalPages: Math.ceil(totalResult.rows[0] / size)
    };
};

exports.addBook = async ({ title, bookCategory, imageUrl, bookAuthor, description }) => {
    const connection = await getConnection();

    try {
        // Użyj prepared statement do wstawienia nowej książki z bindowaniem parametrów
        const query = `INSERT INTO book (title, bookCategory, imageUrl, bookAuthor, description) 
                       VALUES (:title, :bookCategory, :imageUrl, :bookAuthor, :description)`;
        const params = { title, bookCategory, imageUrl, bookAuthor, description };
        await connection.execute(query, params, { autoCommit: true });

    } catch (error) {
        console.error("Error adding book:", error); // Wyświetlenie błędu w konsoli
        throw error; // Rzucenie błędu, aby można go było obsłużyć w innym miejscu
    } finally {
        connection.release(); // Upewnij się, że połączenie jest zwolnione po użyciu
    }
}

exports.getBookById = async (bookId) => {
    const connection = await getConnection();
    let result = await connection.execute(`SELECT * FROM Book WHERE bookId = ${bookId}`);
    let books = null;
    if (result.rows.length) {
        books = BookDTO.fromEntities(result.rows);
    }
    return books;
};
