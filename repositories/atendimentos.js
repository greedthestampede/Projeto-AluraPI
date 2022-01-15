const queries = require('../infra/database/queries');

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?';
        return queries(sql, atendimento);
    }
    lista() {
        const sql = 'select * from Atendimentos';
        return queries(sql);
    }
};

module.exports = new Atendimento;