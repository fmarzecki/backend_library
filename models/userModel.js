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
        totalPages: Math.ceil(totalResult.rows[0] / size)
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
};