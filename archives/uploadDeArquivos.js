const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'jpeg', 'png'];
    const tipo = path.extname(caminho);
    const tipoValidado = tiposValidos.indexOf(tipo.substring(1)) !== -1;
    if (!tipoValidado) {
        const erro = 'Tipo é inválido!'
        console.log('Erro! Tipo inválido!');
        callbackImagemCriada(erro);
    } else {
        const novoCaminho = `./assets/images/${nomeDoArquivo}${tipo}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho));
    };
};


