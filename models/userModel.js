const getConnection = require('../config/db');
const UserDTO = require('../dto/userDTO');

exports.getCurrentUser = async (userId) => {
    const connection = await getConnection();
    let result = await connection.execute(`SELECT * FROM USERS WHERE ID = :userId`, [userId]);

    let user = null;
    if (result.rows.length) {
        user = UserDTO.fromEntity(result.rows[0]);
    }
    return user;
};

exports.updateUserPassword = async (userId, newPassword) => {
    const connection = await getConnection();
    await connection.execute(`UPDATE Users SET password = :newPassword WHERE Id = :userId`, [newPassword, userId], { autoCommit: true });
};

exports.addUser = async ({ name, surname, phoneNumber, email, password, role }) => {
    const connection = await getConnection();
    const query = 'INSERT INTO users (name, surname, phoneNumber, email, password, role) VALUES (:name, :surname, :phoneNumber, :email, :password, :role)';

    try {
        await connection.execute(query, { name, surname, phoneNumber, email, password, role }, { autoCommit: true });
    
        const result = await connection.execute('SELECT MAX(ID) AS lastId FROM users');
        const lastId = result.rows[0];
        return { id: lastId };
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Unable to add user');
    } finally {
        if (connection) await connection.close();
    }
};

exports.getUserByEmail = async (email) => {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM users WHERE email = :email', { email });
    return result.rows[0] ? UserDTO.fromEntity(result.rows[0]) : null;
};