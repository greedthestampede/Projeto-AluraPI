class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
        this.criaPets();
    }
    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int not null auto_increment, cliente varchar(11) not null, pet varchar(20), servico varchar(20) not null, data datetime not null, dataCriacao datetime not null, status varchar(20) not null, observacoes text, primary key(id))';
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro);
            };
        });
    };

    criaPets(){
        const sql = 'create table if not exists Pets (id int not null auto_increment, nome varchar(50) not null, imagem varchar(200), primary key (id))';
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            };
        });
    };
};

module.exports = new Tabelas;