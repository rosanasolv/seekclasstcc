module.exports = app =>{
    const { existsOrError, notExistsOrError } = app.api.validation//importanto métodos para validações dos campos

    const save = (req, res) => {//método de salvar ou atualizar
        const turmas = {
            id: req.body.id,
            nome: req.body.nome,
            turno: req.body.turno,
            sala: req.body.sala,
            representante: req.body.representante
        }//carregando corpo das requisições na const turmas
        if(req.params.id) {//verificando se a requisição contém paramentros
            turmas.id = req.params.id
            
        }

        try {
            existsOrError(turmas.nome, 'Nome não informado')//verificando se o campo foi preenchido
        }catch(msg) {
            return res.status(400).send(msg)//erro
        }

        if(turmas.id){//verifica se id foi passado como parametro se sim faz um update no bd
            app.db('turmas')//acessa a tabela disciplinas no bd
                .update(turmas)//atuliza tabela
                .where({id: turmas.id})//condição de id informado como parametro
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        }else{//caso não tenha parametros é um inserte no bd
            app.db('turmas')//acessa a tabela disciplinas no bd
                .insert(turmas)//insere dados no bd
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        }
    }

    const remove = async (req, res) => {//método para remover
        try {
            existsOrError(req.params.id, 'Código da categoria não informado')//verificando se o campo foi preenchido
            const usuarios = await app.db('usuarios')//acessando tabela usuarios
                .where({id: req.params.id})//condição de acordo com o id passado como parametro da requisição
                notExistsOrError(usuarios, 'Esta turma possui usuários')//verificando se existe usuários vinculado na tabela turmas
            
            const rowsDeleted = await app.db('turmas')//acessando tabela turmas
                .where({id: req.params.id}).del()//condição de acordo com o id passado como parametro da requisição e deletando
            existsOrError(rowsDeleted, 'Turma não encontrada')//caso aviso não exista na tabela disciplinas

            res.status(204).send()//sucesso
        }catch(msg) {
            res.status(400).send(msg)//erro
        }

    }
    const get = (req, res) => {//método para buscar todas as turmas
        app.db('turmas')//acessando a tabela turmas
            .select('turmas.id', 'turmas.nome', 'turno', 'sala', {Representante: 'usuarios.nome'})//select na tabela
            .join('usuarios', 'usuarios.id', '=', 'turmas.representante')//fazendo join na tabela usuarios
            .then(turmas => res.json(turmas))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    const getById = (req, res) => {//método para buscas avisos pelo id
        app.db('turmas')//acessando a tabela turmas
            .select('turmas.id', 'turmas.nome', 'turno', 'sala', {Representante: 'usuarios.nome'})//select na tabela
            .join('usuarios', 'usuarios.id', '=', 'turmas.representante')//fazendo join na tabela usuarios
            .where({'turmas.id': req.params.id}).first()//condição de acordo com o parametro passado na requisição
            .then(turma => res.json(turma))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }

    return { save, remove, get, getById }//retornando todas os métodos para usar em outras classes
}