const mysql = require('mysql');

const config = {
    app: {
        port: process.env.PORT || 8080,
        origins: [
            "http://localhost:8081",
        ]
    },
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'qlcv',
    },
    jwt: {
        secret: "qlcv-secret-key"
    }
};

const connection = mysql.createPool(config.database);

module.exports = { config, connection };