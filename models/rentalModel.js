const getConnection = require('../config/db');
const RentalDTO = require('../dto/rentalDTO');
const moment = require('moment');

exports.addRental = async (bookCopy) => {
    const connection = await getConnection();

    const rentalDate = moment().format('YYYY-MM-DD');
    const returnDate = 'null';
    const status = 'active';
    const readerId = req.userId;
    const bookCopyId = bookCopy.copyId;
    const returnDateExpected = rentalDate.add(4, 'weeks');

    await connection.execute(`INSERT INTO Rental (RENTALDATE, RETURNDATE, STATUS, READERID, BOOKCOPYID, RETURNDATEEXPECTED)
    VALUES (${rentalDate}, ${returnDate}, ${status}, ${readerId}, ${bookCopyId}, ${returnDateExpected})`);
};