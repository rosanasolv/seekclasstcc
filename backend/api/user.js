const bcrypt = require('bcrypt-nodejs')
const nodemailer = require('nodemailer')
const SMTP_Config = require('../config/smtp')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError, statusFirst, passRandom, statusFirstNo, testeSenha } = app.api.validation//importanto métodos para validações dos campos

    const encryptPassword = senha => {//método para criptografar senha
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const save = async (req, res) => {//método de salvar ou atualizar
        const user = { ...req.body }//carregando corpo das requisições na const user
        if (req.params.id) user.id = req.params.id//verificando se a requisição contém paramentros

        //if(!req.originalUrl.startWith('/usuarios')) user.admin=false
        //if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.nome, 'Nome não informado')//verificando se o campo foi preenchido
            existsOrError(user.email, 'E-mail não informado')//verificando se o campo foi preenchido
            //existsOrError(user.tipoUsuario, 'Tipo do usuário não informado')//verificando se o campo foi preenchido
            //existsOrError(user.senha, 'Senha não informada')
            //existsOrError(user.confirmarSenha, 'Confirmação de senha inválida')
            //equalsOrError(user.senha, user.confirmarSenha, 'Senhas diferentes')

            const userFromDb = await app.db('usuarios')//acessa do a tabela usuarios e carregando na variavel userFromDb
                .where({ email: user.email }).first()//buscando um dado no bd com o email digitado
            if (!user.id) {//caso seja um inserte no bd verifica se ja tem o usuário no bd
                notExistsOrError(userFromDb, 'Usuário já cadastrado')//mensagem de erro
            }
        } catch (msg) {
            return res.status(400).send(msg)//erro
        }
        //user.senha = encryptPassword(user.senha)//criptografando a senha digitada
        //delete user.confirmarSenha//deletando a confirmação de senha digitada 

        if (user.id) {//verifica se id foi passado como parametro se sim faz um update no bd
            app.db('usuarios')//acessa a tabela usuarios no bd
                .update(user)//atuliza tabela
                .where({ id: user.id })//condição de id informado como parametro
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        } else {//caso não tenha parametros é um inserte no bd
            app.db('usuarios')//acessa a tabela disciplinas no bd
                .insert(user)//insere dados no bd
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        }
    }

    const remove = async (req, res) => {//método para remover
        try {
            existsOrError(req.params.id, 'Código do Usuário não informado')//verificando se o campo foi preenchido

            const rowsDeleted = await app.db('usuarios')//acessando tabela usuarios
                .where({ id: req.params.id }).del()//condição de acordo com o id passado como parametro da requisição e deletando
            existsOrError(rowsDeleted, 'Usuário não encontrado não encontrado')//caso aviso não exista na tabela usuarios

            res.status(204).send()//sucesso
        } catch (msg) {
            res.status(400).send(msg)//erro
        }

    }

    const get = (req, res) => {//método para buscar todos os usuarios
        app.db('usuarios')//acessando a tabela usuarios
            .select('id', 'nome', 'email', 'admin', 'tipoUsuario', 'representante', 'contato', 'status')//select na tabela
            .then(users => res.json(users))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//erro
    }
    const getById = (req, res) => {//método para buscas avisos pelo id
        app.db('usuarios')//acessando a tabela usuarios
        .select('id', 'nome', 'email', 'admin', 'tipoUsuario', 'representante', 'contato', 'status')//select na tabela
            .where({ id: req.params.id }).first()//condição de acordo com o parametro passado na requisição
            .then(user => res.json(user))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    const getProfessores = (req, res) => {//método para buscar todos os professores 
        app.db('usuarios')//acessando a tabela usuarios
            .select('id', 'nome', 'email', 'admin', 'tipoUsuario', 'representante', 'contato', 'status')
            .where({ 'tipoUsuario': 1 })//condição de acordo com o parametro passado na requisição
            .then(users => res.json(users))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    const getRepresentantes = (req, res) => {//método para buscar todos os professores 
        app.db('usuarios')//acessando a tabela usuarios
            .select('id', 'nome', 'email', 'admin', 'tipoUsuario', 'representante', 'contato', 'status')
            .where({ 'representante': true })//condição de acordo com o parametro passado na requisição
            .then(users => res.json(users))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }
    const primeiroAcesso = async (req, res) => {//método para trocar a senha do primeiro acesso
        const user = { ...req.body }//carregando corpo das requisições na const disciplinas
        

            try {
                //existsOrError(user.nome, 'Nome não informado')
                existsOrError(user.email, 'E-mail não informado')//verificando se o campo foi preenchido
                //existsOrError(user.tipoUsuario, 'Tipo do usuário não informado')
                existsOrError(user.senha, 'Senha não informada')
                testeSenha(user.senha, 'Digite uma senha com no mínimo 6 digitos!')
                existsOrError(user.confirmarSenha, 'Confirmação de senha inválida')//verificando se o campo foi preenchido
                equalsOrError(user.senha, user.confirmarSenha, 'Senhas diferentes')//verificando se o campo senha é igual ao confirmar senha
                
                
                const userFromDb = await app.db('usuarios')//acessando a tabela usuarios e carregando na variavel userFromDb
                    //.select('status')
                    .where({ email: user.email }).first()//verificando se e-mail existe no banco
                    
                    //console.log(userFromDb)

                existsOrError(userFromDb, 'Usuário não existe')//erro
                statusFirst(userFromDb.status, 'Senha já definida para o usuário'+user.email)//verificando se o email ainda não fez o primeiro acesso
                    
                    userFromDb.status = 1//setando o status=1 para não permitir um novo primeiro acesso
                    userFromDb.senha = user.senha//setando a senha para salvar no banco
                    userFromDb.senha = encryptPassword(userFromDb.senha)//criptografando a senha digitada
                    delete user.confirmarSenha//deletando a confirmação de senha digitada
                    //console.log(userFromDb.senha)
                    app.db('usuarios')
                        .update(userFromDb)//atualiza a tabela usuarios
                        .where({ email: user.email })//condição de acordo com o email 
                        .then(_ => res.status(204).send())//sucesso
                        .catch(err => res.status(500).send(err))//erro
                    
                    
                    //const dbStatus = await app.db('usuarios')
                    //notExistsOrError(userFromDb, 'Usuário já cadastrado')//usuário não existe no banco
                
            } catch (msg) {
                return res.status(400).send(msg)//erro
            }
    }

    const getPodepostar = (req, res) => {//método para buscar todos os professores 
        app.db('usuarios')//acessando a tabela usuarios
            .select('id', 'nome', 'email', 'admin', 'tipoUsuario', 'representante', 'contato', 'status')
            .where({ 'tipoUsuario': 1})//condição de acordo com o parametro passado na requisição
            .orWhere({'representante': true})
            .then(users => res.json(users))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//caso haja erro
    }

    const trocarSenha = async (req, res) => {
        const user = { ...req.body }//carregando corpo das requisições na const user
        try {
            //existsOrError(user.nome, 'Nome não informado')
            //existsOrError(user.email, 'E-mail não informado')//verificando se o campo foi preenchido
            //existsOrError(user.tipoUsuario, 'Tipo do usuário não informado')
            existsOrError(user.senha, 'Senha não informada')
            testeSenha(user.senha, 'Digite uma senha com no mínimo 6 digitos!')
            existsOrError(user.confirmarSenha, 'Confirmação de senha inválida')//verificando se o campo foi preenchido
            equalsOrError(user.senha, user.confirmarSenha, 'Senhas diferentes')//verificando se o campo senha é igual ao confirmar senha
            
            const userFromDb = await app.db('usuarios')//acessando a tabela usuarios e carregando na variavel userFromDb
                //.select('status')
                .where({ id: user.id }).first()//verificando se e-mail existe no banco
                
                //console.log(userFromDb)

            existsOrError(userFromDb, 'Usuário não existe')//erro
            
            //statusFirst(userFromDb.status, 'Senha já definida para o usuário'+user.email)//verificando se o email ainda não fez o primeiro acesso
            
                //userFromDb.status = 1//setando o status=1 para não permitir um novo primeiro acesso
                userFromDb.senha = user.senha//setando a senha para salvar no banco
                userFromDb.senha = encryptPassword(userFromDb.senha)//criptografando a senha digitada
                delete user.confirmarSenha//deletando a confirmação de senha digitada
                //console.log(userFromDb.senha)
                app.db('usuarios')
                    .update(userFromDb)//atualiza a tabela usuarios
                    .where({ email: user.email })//condição de acordo com o email 
                    .then(_ => res.status(204).send())//sucesso
                    .catch(err => res.status(500).send(err))//erro
                
                //const dbStatus = await app.db('usuarios')
                //notExistsOrError(userFromDb, 'Usuário já cadastrado')//usuário não existe no banco
            
        } catch (msg) {
            return res.status(400).send(msg)//erro
        }

    }
    const esqueceuSenha = async (req, res) => {
        const user = { ...req.body }

        try {
            const userFromDb = await app.db('usuarios')//acessando a tabela usuarios e carregando na variavel userFromDb
                .where({ email: user.email }).first()//verificando se e-mail existe no banco

            existsOrError(userFromDb, 'Usuário não existe')//erro
            statusFirstNo(userFromDb.status, 'Primeiro acesso ainda não definido para o email: '+user.email)//verificando se o email ainda não fez o primeiro acesso

            const senhaRandom = passRandom(10)
            console.log(senhaRandom)
            userFromDb.senha = senhaRandom
            userFromDb.senha = encryptPassword(userFromDb.senha)//criptografando a senha digitada

            app.db('usuarios')
                .update(userFromDb)//atualiza a tabela usuarios
                .where({ email: user.email })//condição de acordo com o email 
                .then(_ => res.status(204).send())//sucesso
                .catch(err => res.status(500).send(err))//erro

                const transporter = nodemailer.createTransport({
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
                    to: "seekclassifb@gmail.com, "+userFromDb.email+"",
                    subject: "Alteração de senha",
                    text: "Nova senha: "+senhaRandom+" definida.",
                    html: "Nova senha: <b>"+senhaRandom+"</b> definida."
                }).then(message =>{
                    console.log(message)
                }).catch(err => {
                    console.log(err)
                })

                /*const transporter = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "f7700e43835928",
                        pass: "44b5c961449d47"
                        //user: "backendseekclass@backendseekclass.com",
                        //pass: "Seekclass@"
                    }
                });

                transporter.sendMail({
                    from: "SeekClass<f7700e43835928>",
                    to: userFromDb.email,
                    subject: "Alteração de senha",
                    text: "Nova senha: "+senhaRandom+" definida.",
                    html: "Nova senha: <b>"+senhaRandom+"</b> definida."
                }).then(message =>{
                    console.log(message)
                }).catch(err => {
                    console.log(err)
                })*/

        } catch (msg) {
            return res.status(400).send(msg)//erro
        }
    }
    return { save, get, getById, remove, getProfessores, primeiroAcesso, getRepresentantes, getPodepostar, trocarSenha,
        esqueceuSenha }//retornando todas os métodos para usar em outras classes
}