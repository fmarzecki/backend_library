const getConnection = require('../config/db');
const BookCopyDTO = require('../dto/bookCopyDTO');

exports.getFreeBookCopyByBookId = async (bookId) => {
    const connection = await getConnection();
    let result = await connection.execute(`SELECT * FROM BookCopy WHERE bookId = ${bookId} AND rentalStatus = 'FREE'`);
    let bookCopies = null;
    if (result.rows.length) {
        bookCopies = BookCopyDTO.fromEntity(result.rows[0]);
    }
    return bookCopies;
};

exports.reserveBookCopy = async (bookCopy) => {
    const connection = await getConnection();
    const reservationStatus = 'RESERVED';
    await connection.execute(`UPDATE BookCopy SET rentalStatus = '${reservationStatus}' WHERE copyId = ${bookCopy.copyId}`, [], { autoCommit: true });
};