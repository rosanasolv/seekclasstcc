module.exports = app => {

    const get = (req, res) => {//método para buscar todos os usuarios
        app.db('tsiv1')//acessando a tabela usuarios
            .select('id', 'horario', 'segunda', 'terca', 'quarta', 'quinta', 'sexta')//select na tabela
            .then(tsiv1 => res.json(tsiv1))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//erro
    }
    return {get}
}