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

exports.getBookCopyByCopyId = async (copyId) => {
    const connection = await getConnection();

    let result = await connection.execute(`SELECT * FROM BookCopy WHERE copyId = ${copyId}`);

    let bookCopy = null;
    if (result.rows.length) {
        bookCopy = BookCopyDTO.fromEntity(result.rows[0]);
    }
    return bookCopy;
};

exports.updateRentalStatus = async (bookCopy, rentalStatus) => {
    const connection = await getConnection();
    await connection.execute(`UPDATE BookCopy SET rentalStatus = '${rentalStatus}' WHERE copyId = ${bookCopy.copyId}`, [], { autoCommit: true });
};