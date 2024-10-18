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

exports.getUsersPaginated = async (filter, filterBy, page = 0, size = 8) => {
    const connection = await getConnection();

    let offset = page * size;
    let query = `SELECT * FROM USERS WHERE 1=1`;

    if (filter && filterBy) {
        query += ` AND ${filterBy} LIKE '%${filter}%'`;
    }

    query += ` OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

    const result = await connection.execute(query);

    const users = UserDTO.fromEntities(result.rows);

    const totalQuery = `SELECT COUNT(*) FROM USERS WHERE 1=1`;
    const totalResult = await connection.execute(totalQuery);


    return {
        users,
        totalPages: Math.ceil(totalResult.rows[0] / size),
    };
};

exports.getUserByEmail = async (userEmail) => {
    const connection = await getConnection();
    let result = await connection.execute(`SELECT * FROM USERS WHERE email = :userEmail`, [userEmail]);

    let user = null;
    if (result.rows.length) {
        user = UserDTO.fromEntity(result.rows[0]);
    }
    return user;
}
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
