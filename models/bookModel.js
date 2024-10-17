const getConnection = require('../config/db');

exports.getBooksPaginated = async (filter, filterBy, page = 0, size = 8) => {
    const connection = await getConnection();

    let offset = page * size;
    let query = `SELECT * FROM Book WHERE 1=1`;

    if (filter && filterBy) {
        query += ` AND ${filterBy} LIKE '%${filter}%'`;
    }

    query += ` OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;
    const result = await connection.execute(query);

    const totalQuery = `SELECT COUNT(*) FROM Book WHERE 1=1`;
    const totalResult = await connection.execute(totalQuery);

    return {
        books: result.rows,
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
        await connection.execute(query, params);

    } catch (error) {
        console.error("Error adding book:", error); // Wyświetlenie błędu w konsoli
        throw error; // Rzucenie błędu, aby można go było obsłużyć w innym miejscu
    } finally {
        connection.release(); // Upewnij się, że połączenie jest zwolnione po użyciu
    }
};
