const getConnection = require('../config/db');
const NewsDTO = require('../dto/newsDTO');

exports.getAllNewsPosts = async () => {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM NewsPost');
    return NewsDTO.fromEntities(result.rows);
};

exports.addNewsPost = async ({ name, contents}) => {
    const connection = await getConnection();
    const query = 'INSERT INTO NewsPost (name, contents) VALUES (:name, :contents)';
    await connection.execute(query, { name, contents }, { autoCommit: true });
};

exports.updateNewsPost = async ({ postId, name, contents}) => {
    const connection = await getConnection();
    console.log(postId);
    const query = 'UPDATE NewsPost SET name = :name, contents = :contents  WHERE postId = :postId';
    await connection.execute(query, { postId, name, contents }, { autoCommit: true });
};

exports.deleteNewsPost = async (postId) => {
    const connection = await getConnection();
    console.log(postId);
    const query = 'DELETE FROM NewsPost WHERE postId = :postId';
    await connection.execute(query, { postId }, { autoCommit: true });
};