const nodemailer = require('nodemailer')
const SMTP_Config = require('../config/smtp')

module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation//importanto métodos para validações dos campos

    const save = (req, res) => {//método de salvar ou atualizar
        
        const notificacoes = {...req.body}//carregando corpo das requisições na const notificacoes
        if(req.params.id) notificacoes.id = req.params.id//verificando se a requisição contém paramentros
        console.log(notificacoes)
        try {
            //existsOrError(notificacoes.remetente, 'Aviso não informado')//verificando se o campo foi preenchido
            //existsOrError(notificacoes.turmas, 'Turmas não informadas')//verificando se o campo foi preenchido
            existsOrError(notificacoes.assunto, 'Assunto não informado')//verificando se o campo foi preenchido
            existsOrError(notificacoes.conteudo, 'Conteúdo não informado')//verificando se o campo foi preenchido
            //console.log("aqui")
        }catch(msg) {
            return res.status(400).send(msg)//caso haja erro
        }

        if(notificacoes.id){//verifica se id foi passado como parametro se sim faz um update no bd
            app.db('notificacoes')//acessa a tabela notificacoes no bd
                .update(notificacoes)//atuliza tabela
                .where({id: notificacoes.id})//condição de id informado como parametro
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        }else{//caso não tenha parametros é um inserte no bd
            app.db('notificacoes')//acessa a tabela disciplinas no bd
                .insert(notificacoes)//insere dados no bd
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        }

        /*const transporter = nodemailer.createTransport({
            host: SMTP_Config.host,
            port: SMTP_Config.port,
            secure: false,
            auth: {
                user: SMTP_Config.user,
                pass: SMTP_Config.pass,
                //user: "backendseekclass@backendseekclass.com",
                //pass: "Seekclass@"
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        transporter.sendMail({
            from: "SeekClass<nike.jn@gmail.com>",
            to: "rosanasoares042@gmail.com, netolima1992@gmail.com, jose.nascimento@estudante.ifb.edu.br, rosana.soares@estudante.ifb.edu.br, brendalopesmr@gmail.com",
            subject: notificacoes.assunto,
            text: "",
            html: "<p>Novo aviso de SeekClass</p><p>Conteúdo: <b>"+notificacoes.conteudo+"</b></p>."
        }).then(message =>{
            console.log(message)
        }).catch(err => {
            console.log(err)
        })*/


    }
    const remove = async (req, res) => {//método para remover
        try {
            existsOrError(req.params.id, 'Código da notificação não informada')//verificando se o campo foi preenchido
            const notificacoes = await app.db('turmas')//acessando tabela turmas
                .where({id: req.params.id})//condição de acordo com o id passado como parametro da requisição
                notExistsOrError(notificacoes, 'Esta notificação possui turmas')//verificando se existe turmas vinculado na tabela notificacoes
            const usuarios = await app.db('usuarios')//acessando tabela usuarios
                .where({id: req.params.id})//condição de acordo com o id passado como parametro da requisição
                notExistsOrError(usuarios, 'Esta notificação possui avisos')//verificando se existe usuarios vinculado na tabela notificacoes
            
            const rowsDeleted = await app.db('notificacoes')//acessando a tabela notificacoes
                .where({id: req.params.id}).del()//condição de acordo com o id passado como parametro da requisição e deletando
            existsOrError(rowsDeleted, 'Notificação não encontrada')//caso aviso não exista na tabela notificacoes

            res.status(204).send()//sucesso
        }catch(msg) {
            res.status(400).send(msg)//erro
        }

    }
    const get = (req, res) => {//método para buscar todos os notificacoes
        
        app.db('notificacoes')//acessando a tabela notificacoes
            .select('notificacoes.assunto', 'notificacoes.id', {Remetente: 'usuarios.nome'}, {Turma: 'turmas.nome'}, 'createdAt', 'notificacoes.conteudo', 'postar')
            //.count({Encaminhada: 'turmas.id'})
            .join('turmas', 'turmas.id', '=', 'notificacoes.turmas')//join na tabela turmas
            .join('usuarios', 'usuarios.id', '=', 'notificacoes.remetente')//join na tabela usuarios
            //.groupBy('notificacoes.assunto')
            .then(notificacoes => res.json(notificacoes))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {//método para buscas avisos pelo id
        app.db('notificacoes')//acessando a tabela notificacoes
            .select('notificacoes.id', 'createdAt', 'notificacoes.assunto', {Turma: 'turmas.nome'}, {Remetente: 'usuarios.nome'}, 'postar')
            .join('turmas', 'turmas.id', '=', 'notificacoes.turmas')//join na tabela turmas
            .join('usuarios', 'usuarios.id', '=', 'notificacoes.remetente')//join na tabela usuarios
            .where({'notificacoes.id': req.params.id}).first()
            .then(notificacoes => res.json(notificacoes))
            .catch(err => res.status(500).send(err))
    }

    const getTurmaId = (req, res) => {
        app.db('notificacoes')//acessando a tabela notificacoes
            .distinct('notificacoes.id', 'notificacoes.turmas', 'notificacoes.assunto', 'notificacoes.remetente', 'createdAt', 'updatedAt', 'notificacoes.conteudo', {Turma: 'turmas.nome'}, {Remetente: 'usuarios.nome'}, 'postar')
            .join('turmas', 'turmas.id', '=', 'notificacoes.turmas')//join na tabela turmas
            .join('usuarios', 'usuarios.id', '=', 'notificacoes.remetente')//join na tabela usuarios
            .where({'notificacoes.turmas': req.params.turmas})
            .then(notificacoes => res.json(notificacoes))
            .catch(err => res.status(500).send(err))

    }

    const getAssunto = (req, res) => {
        app.db('notificacoes')
            .select({Turma: 'turmas.nome'})
            .join('turmas', 'turmas.id', '=', 'notificacoes.turmas')
            .join('usuarios', 'usuarios.id', '=', 'notificacoes.remetente')
            .where({'notificacoes.assunto': req.params.assunto})
            .then(notificacoes => res.json(notificacoes))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getTurmaId, getAssunto }//retornando todas os métodos para usar em outras classes
}