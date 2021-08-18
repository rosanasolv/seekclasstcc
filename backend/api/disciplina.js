module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation//importanto métodos para validações dos campos

    const save = (req, res) => {//método de salvar ou atualizar
        const disciplinas = {...req.body}//carregando corpo das requisições na const disciplinas
        if(req.params.id) disciplinas.id = req.params.id//verificando se a requisição contém paramentros

        try {
            existsOrError(disciplinas.nome, 'Nome não informado')//verificando se o campo foi preenchido
            existsOrError(disciplinas.turma, 'Turma não informada')//verificando se o campo foi preenchido
            existsOrError(disciplinas.turno, 'Turno não informado')//verificando se o campo foi preenchido
        }catch(msg) {
            return res.status(400).send(msg)//caso haja erro
        }

        if(disciplinas.id){//verifica se id foi passado como parametro se sim faz um update no bd
            app.db('disciplinas')//acessa a tabela disciplinas no bd
                .update(disciplinas)//atuliza tabela
                .where({id: disciplinas.id})//condição de id informado como parametro
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        }else{//caso não tenha parametros é um inserte no bd
            app.db('disciplinas')//acessa a tabela disciplinas no bd
                .insert(disciplinas)//insere dados no bd
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        }
    }
    const remove = async (req, res) => {//método para remover
        try {
            existsOrError(req.params.id, 'Código do aviso não informado')//verificando se o campo foi preenchido
            const usuarios = await app.db('usuarios')//acessando tabela usuarios
                .where({id: req.params.id})//condição de acordo com o id passado como parametro da requisição
                notExistsOrError(usuarios, 'Esta matéria possui usuários')//verificando se existe usuários vinculado na tabela usuarios
            const turmas = await app.db('turmas')//acessando tabela turmas
                .where({id: req.params.id})//condição de acordo com o id passado como parametro da requisição
                notExistsOrError(turmas, 'Esta matéria possui turmas')//verificando se existe usuários vinculado na tabela turmas
            
            const rowsDeleted = await app.db('disciplinas')//acessando a tabela disciplinas
                .where({id: req.params.id}).del()//condição de acordo com o id passado como parametro da requisição e deletando
            existsOrError(rowsDeleted, 'Matéria não encontrada')//caso aviso não exista na tabela disciplinas

            res.status(204).send()//sucesso
        }catch(msg) {
            res.status(400).send(msg)//erro
        }

    }
    const get = (req, res) => {//método para buscar todos os disciplinas
        app.db('disciplinas')//acessando a tabela disciplinas
            .select('disciplinas.id', 'disciplinas.nome', 'disciplinas.turno', 'link', {Professor: 'usuarios.nome'}, {Turma: 'turmas.nome'})//select na tabela
            .join('usuarios', 'usuarios.id', '=', 'disciplinas.professor')//fazendo join na tabela usuarios
            .join('turmas', 'turmas.id', '=', 'disciplinas.turma')//fazendo join na tabela turmas
            .then(materias => res.json(materias))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    const getById = (req, res) => {//método para buscas avisos pelo id
        app.db('disciplinas')//acessando a tabela disciplinas
            .select('disciplinas.id', 'disciplinas.nome', 'disciplinas.turno', 'link', 
                {Professor: 'usuarios.nome'}, {Turma: 'turmas.nome'})//select na tabela
            .join('usuarios', 'usuarios.id', '=', 'disciplinas.professor')//fazendo join na tabela usuarios
            .join('turmas', 'turmas.id', '=', 'disciplinas.turma')//fazendo join na tabela turmas
            .where({'disciplinas.id': req.params.id}).first()//condição de acordo com o parametro passado na requisição
            .then(materia => res.json(materia))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    const getByIdnome = (req, res) =>{//método para buscas de disciplinas com o id do professor
        app.db('disciplinas')//acessando a tabela disciplinas
        .select( 'disciplinas.nome', 'professor', 'turma', 'turno', 'link', {Professor: 'usuarios.nome'})//select na tabela
        .join('usuarios', 'usuarios.id', '=', 'disciplinas.professor')
        .where({'professor': req.params.id})//condição de acordo com o parametro passado na requisição
        .then(materia => res.json(materia))//armazenando em um json o resultado da busca
        .catch(err => res.status(500).send(err))//caso haja erro
    }
    const getByTurma = (req, res) => {//método para busca de disciplinas vinculadas a turmas
        app.db('disciplinas')//acessando a tabela disciplinas
            .select('disciplinas.id', 'disciplinas.nome', 'professor', 'disciplinas.turma', 'disciplinas.turno', 'link', {Professor: 'usuarios.nome'}, {Turma: 'turmas.nome'})//select na tabela
            .join('usuarios', 'usuarios.id', '=', 'disciplinas.professor')//join na tabela usuarios
            .join('turmas', 'turmas.id', '=', 'disciplinas.turma')//join na tabela turmas
            .where({turma: req.params.turma})//condição de acordo com o parametro passado na requisição
            .then(materia => res.json(materia))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }

    return { save, remove, get, getById, getByTurma, getByIdnome }//retornando todas os métodos para usar em outras classes
}