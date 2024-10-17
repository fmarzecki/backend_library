const getConnection = require('../config/db');

exports.addWorker = async ({ monthlyPay, userId, employedBy }) => {
    const connection = await getConnection();
    const query = 'INSERT INTO worker (monthlyPay, userId, employedBy) VALUES (:monthlyPay, :userId, :employedBy)';

    try {
        await connection.execute(query, { monthlyPay, userId, employedBy }, { autoCommit: true });
    } catch (error) {
        console.error('Error adding worker:', error);
        throw new Error('Unable to add worker');
    } finally {
        if (connection) await connection.close();
    }
};

// Fetch all workers, including their data from the USERS table
exports.getAllWorkers = async () => {
    const connection = await getConnection();

    try {
        const result = await connection.execute(`
            SELECT W.WORKERID, U.NAME, U.SURNAME, U.PHONENUMBER, W.MONTHLYPAY 
            FROM WORKER W
            JOIN USERS U ON W.USERID = U.ID
        `);

        return result.rows;
    } catch (error) {
        console.error('Error fetching workers:', error);
        throw new Error('Unable to fetch workers');
    } finally {
        if (connection) await connection.close();
    }
};

// Update worker's monthly pay and phone number
exports.updateWorker = async ({ workerId, phoneNumber, monthlyPay }) => {
    const connection = await getConnection();

    try {
        // Update monthly pay in the WORKER table
        await connection.execute(
            `UPDATE WORKER SET MONTHLYPAY = :monthlyPay WHERE WORKERID = :workerId`,
            [monthlyPay, workerId],
            { autoCommit: true }
        );

        // Update phone number in the USERS table
        await connection.execute(
            `UPDATE USERS SET PHONENUMBER = :phoneNumber WHERE ID = (SELECT USERID FROM WORKER WHERE WORKERID = :workerId)`,
            [phoneNumber, workerId],
            { autoCommit: true }
        );
    } catch (error) {
        console.error('Error updating worker:', error);
        throw new Error('Unable to update worker');
    } finally {
        if (connection) await connection.close();
    }
};