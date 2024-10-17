const getConnection = require('../config/db');
const RentalDTO = require('../dto/rentalDTO');
const BookDTO = require('../dto/bookDTO');
const moment = require('moment');

exports.addRental = async (readerId, copyId, rentalInWeeks) => {
    const connection = await getConnection();

    let rentalDate = moment();
    let status = 'ACTIVE';
    let bookCopyId = copyId;
    let returnDateExpected = rentalDate.clone().add(rentalInWeeks, 'weeks').format('YYYY-MM-DD');
    rentalDate = rentalDate.format('YYYY-MM-DD');

    await connection.execute(`INSERT INTO Rental (RENTALDATE, STATUS, READERID, BOOKCOPYID, RETURNDATEEXPECTED)
    VALUES ('${rentalDate}', '${status}', ${readerId}, ${bookCopyId}, '${returnDateExpected}')`, [], { autoCommit: true });
};

exports.getActiveRentalsByReaderIdExtra = async (readerId) => {
    const connection = await getConnection();
    let result = await connection.execute(`SELECT 
            r.rentalId,
            r.rentalDate,
            r.ReturnDate, 
            r.status,
            r.readerId,
            r.bookCopyId,
            r.returnDateExpected,
            b.bookId, 
            b.title,
            b.bookAuthor,
            b.bookCategory,
            b.imageUrl,
            b.description
        FROM Rental r
        JOIN BookCopy bc ON r.bookCopyId = bc.copyId
        JOIN Book b ON bc.bookId = b.bookId
        WHERE r.readerId = ${readerId} AND
        r.status = 'ACTIVE'`);
    let rentals = null;
    if (result.rows.length) {
        rentals = result.rows.map(row => {
            const bookDTO = new BookDTO({
                bookId: row[7],
                title: row[8],
                bookAuthor: row[9],
                bookCategory: row[10],
                imageUrl: row[11],
                description: row[12]
            });

            const rentalDTO = RentalDTO.fromEntity(row);
            rentalDTO.book = bookDTO;
            return rentalDTO;
        });
    }

    return rentals;
};

exports.getReturnedRentalsByReaderIdPaginatedExtra = async (filter, filterBy, page, size, readerId) => {
    const connection = await getConnection();

    let offset = page * size;
    let query = `
        SELECT 
            r.rentalId,
            r.rentalDate,
            r.ReturnDate, 
            r.status,
            r.readerId,
            r.bookCopyId,
            r.returnDateExpected,
            b.bookId, 
            b.title,
            b.bookAuthor,
            b.bookCategory,
            b.imageUrl,
            b.description
        FROM Rental r
        JOIN BookCopy bc ON r.bookCopyId = bc.copyId
        JOIN Book b ON bc.bookId = b.bookId
        WHERE r.readerId = ${readerId} AND
        r.status = 'RETURNED'
    `;

    if (filter && filterBy) {
        query += ` AND ${filterBy} LIKE '%${filter}%'`;
    }

    query += ` OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

    const result = await connection.execute(query);

    const totalQuery = `SELECT COUNT(*) FROM RENTAL WHERE 1=1`;
    const totalResult = await connection.execute(totalQuery);

    rentals = result.rows.map(row => {
        const bookDTO = new BookDTO({
            bookId: row[7],
            title: row[8],
            bookAuthor: row[9],
            bookCategory: row[10],
            imageUrl: row[11],
            description: row[12]
        });

        const rentalDTO = RentalDTO.fromEntity(row);
        rentalDTO.book = bookDTO;
        return rentalDTO;
    });

    return {
        rentals,
        totalPages: Math.ceil(totalResult.rows[0] / size)
    };
};

exports.getActiveRentalsByReaderIdPaginatedExtra = async (filter, filterBy, page, size, readerId) => {
    const connection = await getConnection();

    let offset = page * size;
    let query = `
        SELECT 
            r.rentalId,
            r.rentalDate,
            r.ReturnDate, 
            r.status,
            r.readerId,
            r.bookCopyId,
            r.returnDateExpected,
            b.bookId, 
            b.title,
            b.bookAuthor,
            b.bookCategory,
            b.imageUrl,
            b.description
        FROM Rental r
        JOIN BookCopy bc ON r.bookCopyId = bc.copyId
        JOIN Book b ON bc.bookId = b.bookId
        WHERE r.readerId = ${readerId} AND
        r.status = 'ACTIVE'
    `;

    if (filter && filterBy) {
        query += ` AND ${filterBy} LIKE '%${filter}%'`;
    }

    query += ` OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

    const result = await connection.execute(query);

    const totalQuery = `SELECT COUNT(*) FROM RENTAL WHERE 1=1`;
    const totalResult = await connection.execute(totalQuery);

    rentals = result.rows.map(row => {
        const bookDTO = new BookDTO({
            bookId: row[7],
            title: row[8],
            bookAuthor: row[9],
            bookCategory: row[10],
            imageUrl: row[11],
            description: row[12]
        });

        const rentalDTO = RentalDTO.fromEntity(row);
        rentalDTO.book = bookDTO;
        return rentalDTO;
    });

    return {
        rentals,
        totalPages: Math.ceil(totalResult.rows[0] / size)
    };
};

exports.returnRental = async (rentalId) => {
    const connection = await getConnection();
    const status = 'RETURNED';
    const returnDate = moment().format('YYYY-MM-DD');
    await connection.execute(`UPDATE Rental SET status = '${status}', returnDate = '${returnDate}' WHERE rentalId = ${rentalId}`, [], { autoCommit: true });
};