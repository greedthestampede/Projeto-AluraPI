const moment = require('moment');
const conexao = require('../infra/conexao');

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataValidada = moment(data).isSameOrAfter(dataCriacao);
        const clienteValidado = atendimento.cliente.length >= 3;
        const validacoes = [
            {
                nome: 'data',
                valido: dataValidada,
                mensagem: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteValidado,
                mensagem: 'Cliente deve ter pelo menos três caracteres.'
            }
        ];
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;
        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?';
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(atendimento);
                };
            });
        }
    };
    lista(res) {
        const sql = 'select * from Atendimentos';
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            };
        });
    };
    buscaPorId(id, res) {
        const sql = `select * from Atendimentos where id=${id}`;
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            };
        });
    };
    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = `update Atendimentos set ? where id=?`;
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        });
    };
    deleta(id, res) {
        const sql = `delete from Atendimentos where id=?`;
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
};

module.exports = new Atendimento;