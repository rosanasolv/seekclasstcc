module.exports = app => {

    const get = (req, res) => {//método para buscar todos os usuarios
        app.db('tsiv5')//acessando a tabela usuarios
            .select('id', 'horario', 'segunda', 'terca', 'quarta', 'quinta', 'sexta')//select na tabela
            .then(tsi => res.json(tsi))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//erro
    }
    return {get}
}