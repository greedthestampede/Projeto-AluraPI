const conexao = require('../infra/database/conexao');
const uploadDeArquivo = require('../infra/archives/uploadDeArquivos')

class Pet {
    adiciona(pet, res){
        const sql = 'insert into Pets set ?';
        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho };
                conexao.query(sql, novoPet, erro => {
                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        res.status(200).json(novoPet);
                    };
                });
            }
        });
    };
    lista(res) {
        const sql = 'select * from Pets';
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            };
        });
    };
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Pets WHERE id=${id}`;
        conexao.query(sql, async (erro, resultados) => {
            const pet = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(pet);
            };
        });
    };
    deleta(id, res) {
        const sql = `delete from Pets where id=?`;
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    };
};

module.exports = new Pet();