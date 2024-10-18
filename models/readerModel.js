const getConnection = require('../config/db');
const ReaderDTO = require('../dto/readerDTO');
const UserDTO = require('../dto/userDTO');

exports.getReaderByUserId = async (userId) => {
    const connection = await getConnection();

    let result = await connection.execute(`SELECT * FROM READER WHERE userId = ${userId}`);
    let reader = null;
    if (result.rows.length) {
        reader = ReaderDTO.fromEntity(result.rows[0]);
    }

    return reader;
};

exports.getReadersPaginated = async (filter, filterBy, page = 0, size = 8) => {
    const connection = await getConnection();

    let offset = page * size;
    let query = `
        SELECT r.*, u.name, u.surname, u.email, u.phoneNumber , u.password, u.imageUrl, u.role
        FROM READER r 
        JOIN USERS u ON r.UserId = u.Id 
        WHERE 1=1
    `;

    if (filter && filterBy) {
        query += ` AND ${filterBy} LIKE '%${filter}%'`;
    }

    query += ` OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

    const result = await connection.execute(query);

    const totalQuery = `SELECT COUNT(*) FROM READER WHERE 1=1`;
    const totalResult = await connection.execute(totalQuery);

    readers = result.rows.map(row => {
        const userDTO = new UserDTO({
            id: row[1],
            name: row[2],
            surname: row[3],
            email: row[4],
            phoneNumber: row[5],
            password: row[6],
            imageUrl: row[7],
            role: row[8],
            isBlocked: row[9]
        });

        const readerDTO = ReaderDTO.fromEntity(row);
        readerDTO.user = userDTO;
        return readerDTO;
    });

    return {
        readers,
        totalPages: Math.ceil(totalResult.rows[0] / size)
    };
};