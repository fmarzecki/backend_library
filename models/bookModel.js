const getConnection = require('../config/db');

exports.getBooksPaginated = async (filter, filterBy, page = 0, size = 8) => {
    const connection = await getConnection();

    let offset = page * size;
    let query = `SELECT * FROM Book WHERE 1=1`;

    if (filter && filterBy) {
        query += ` AND ${filterBy} LIKE '%${filter}%'`;
    }

    query += ` OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;
    const result = await connection.execute(query);

    const totalQuery = `SELECT COUNT(*) FROM Book WHERE 1=1`;
    const totalResult = await connection.execute(totalQuery);

    return {
        books: result.rows,
        totalPages: Math.ceil(totalResult.rows[0] / size)
    };
};
