// app.js
const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;

// Oracle DB connection configuration
const dbConfig = {
    user: 'ed90',
    password: 'ed90',
    connectString: '149.156.138.232:1521/orcl'
};

// Async function to connect and query the Oracle database
async function initOracleConnection() {
    let connection;

    try {
        // Create connection to Oracle database
        connection = await oracledb.getConnection(dbConfig);
        console.log('Successfully connected to Oracle Database');

        // Example query
        const result = await connection.execute(`SELECT * FROM BOOK`);
        console.log(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, this is the backend connected to Oracle DB!');
});

// Another route to execute a DB query
app.get('/query', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM BOOK'); // Replace with your query
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error querying the database');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    initOracleConnection(); // Test connection on startup
});
