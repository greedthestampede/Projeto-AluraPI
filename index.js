const customExpress = require('./config/customExpress');
const conexao = require('./infra/database/conexao');
const Tabelas = require('./infra/database/tabelas');



conexao.connect(erro => {
    if (erro) {
        console.log(erro);
    } else {
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor rodando na porta 3000!'));
        console.log('Banco de dados conectado!');
        Tabelas.init(conexao);
    }
})


