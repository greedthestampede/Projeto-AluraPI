const mySQL = require('mysql2');

const conexao = mySQL.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '&PTTWOW',
    database: 'agenda-petshop'
});

module.exports = conexao;