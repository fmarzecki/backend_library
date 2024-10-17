const getConnection = require('../config/db');
const ReservationDTO = require('../dto/reservationDTO');
const BookDTO = require('../dto/bookDTO');
const moment = require('moment');

exports.addReservation = async (readerId, bookCopy) => {
    const connection = await getConnection();

    let copyId = bookCopy.copyId;
    let reservationDate = moment().format('YYYY-MM-DD');

    await connection.execute(`INSERT INTO Reservation (COPYID, READERID, RESERVATIONDATE) VALUES (:copyId , :readerId , :reservationDate )`,
        [copyId, readerId, reservationDate],
        { autoCommit: true });
};

exports.deleteReservation = async (bookCopy) => {
    const connection = await getConnection();

    let copyId = bookCopy.copyId;

    await connection.execute(`DELETE FROM Reservation WHERE copyId = ${copyId}`, [], { autoCommit: true });
};

exports.getReservationsByReaderIdExtra = async (readerId) => {
    const connection = await getConnection();
    let result = await connection.execute(`SELECT 
            r.id,
            r.copyId,
            r.readerId, 
            r.reservationDate,
            b.bookId, 
            b.title,
            b.bookAuthor,
            b.bookCategory,
            b.imageUrl,
            b.description
        FROM Reservation r
        JOIN BookCopy bc ON r.copyId = bc.copyId
        JOIN Book b ON bc.bookId = b.bookId
        WHERE r.readerId = ${readerId}`);
    let reservations = null;
    if (result.rows.length) {
        reservations = result.rows.map(row => {
            const bookDTO = new BookDTO({
                bookId: row[4],
                title: row[5],
                bookAuthor: row[6],
                bookCategory: row[7],
                imageUrl: row[8],
                description: row[9]
            });

            const reservationDTO = ReservationDTO.fromEntity(row);
            reservationDTO.book = bookDTO;
            return reservationDTO;
        });
    }

    return reservations;
};