module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation//importanto métodos para validações dos campos

    const save = (req, res) => {//método de salvar ou atualizar
        const avisos = {...req.body}//carregando corpo das requisições na const avisos
        if(req.params.id) avisos.id = req.params.id//verificando se a requisição contém paramentros

        try {
            existsOrError(avisos.assunto, 'Assunto não informado')//verificando se o campo foi preenchido
            existsOrError(avisos.descricao, 'Descrição não informada')//verificando se o campo foi preenchido
        }catch(msg) {
            return res.status(400).send(msg)//retorna mensagem em caso de erro no try
        }

        if(avisos.id){//verifica se id foi passado como parametro se sim faz um update no bd
            app.db('avisos')//acessa a tabela avisos no bd
                .update(avisos)//atuliza tabela
                .where({id: avisos.id})//condição de id informado como parametro
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//reposta de erro
        }else{//caso não tenha parametros é um inserte no bd
            app.db('avisos')//acessa a tabela avisos no bd
                .insert(avisos)//insere dados no bd
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//reposta de erro
        }
    }
    const remove = async (req, res) => {//método para remover
        try {
            existsOrError(req.params.id, 'Código do aviso não informado')//verificando se o campo foi preenchido
            const usuarios = await app.db('usuarios')//acessando tabela usuarios
                .where({id: req.params.id})//condição de acordo com o id passado como parametro da requisição
                notExistsOrError(usuarios, 'Este aviso possui usuários')//verificando se existe usuários vinculado na tabela avisos
            
            const rowsDeleted = await app.db('avisos')//acessando a tabela avisos
                .where({id: req.params.id}).del()//condição de acordo com o id passado como parametro da requisição e deletando
            existsOrError(rowsDeleted, 'Aviso não encontrado')//caso aviso não exista na tabela avisos

            res.status(204).send()//sucesso
        }catch(msg) {
            res.status(400).send(msg)//erro
        }

    }
    const get = (req, res) => {//método para buscar todos os avisos
        app.db('avisos')//acessando a tabela avisos
            .select('id', 'assunto', 'descricao', 'remetente')//select na tabela
            .then(avisos => res.json(avisos))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    const getById = (req, res) => {//método para buscas avisos pelo id
        app.db('avisos')//acessando a tabela avisos
            .select('id', 'assunto', 'descricao','remetente')//select na tabela
            .where({id: req.params.id}).first()//condição de acordo com o parametro passado na requisição
            .then(aviso => res.json(aviso))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    return { save, remove, get, getById }//retornando todas os métodos para usar em outras classes
}