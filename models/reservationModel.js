const getConnection = require('../config/db');
const ReservationDTO = require('../dto/reservationDTO');
const moment = require('moment');

exports.addReservation = async (userId, bookCopy) => {
    const connection = await getConnection();

    let copyId = bookCopy.copyId;
    let reservationDate = moment().format('YYYY-MM-DD');

    await connection.execute(`INSERT INTO Reservation (COPYID, USERID, RESERVATIONDATE) VALUES (:copyId , :userId , :reservationDate )`,
        [copyId, userId, reservationDate],
        { autoCommit: true });
};