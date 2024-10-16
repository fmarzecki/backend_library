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

exports.getBookById = async (bookId) => {
    const result = await db.query(`SELECT * FROM Book WHERE bookId = ${bookId}`);
    return result.rows.length ? result.rows[0] : null;
};

exports.getFreeBookCopyByBookId = async (bookId) => {
    const result = await db.query('SELECT * FROM BookCopy WHERE bookId = :bookId AND rentalStatus = :rentalStatus', [bookId, 'FREE']);
    return result.rows.length ? result.rows[0] : null;
};

exports.reserveBookCopy = async (bookCopy) => {
    await db.query('UPDATE BookCopy SET rentalStatus = :rentalStatus, readerId = :readerId WHERE copyId = :copyId',
        [bookCopy.rentalStatus, bookCopy.readerId, bookCopy.copyId]);
};
