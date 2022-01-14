const Pet = require('../models/pets');

module.exports = app => {
    app.post('/pets', (req, res) => {
        const pet = req.body;
        Pet.adiciona(pet, res);
    });
    app.get('/pets', (req, res) => {
        Pet.lista(res);
    });
    app.get('/pets/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Pet.buscaPorId(id, res);
    });
    app.delete('/pets/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Pet.deleta(id, res);
    });
};