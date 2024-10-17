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