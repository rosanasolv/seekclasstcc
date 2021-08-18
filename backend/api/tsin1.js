module.exports = app => {

    const save = async (req, res) => {//método de salvar ou atualizar
        const horario = { ...req.body }//carregando corpo das requisições na const user
        //if (req.params.id) user.id = req.params.id//verificando se a requisição contém paramentros

        //if(!req.originalUrl.startWith('/usuarios')) user.admin=false
        //if(!req.user || !req.user.admin) user.admin = false

        /*try {
            existsOrError(horario.nome, 'Nome não informado')//verificando se o campo foi preenchido
            existsOrError(horario.email, 'E-mail não informado')//verificando se o campo foi preenchido
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
        }*/
        //user.senha = encryptPassword(user.senha)//criptografando a senha digitada
        //delete user.confirmarSenha//deletando a confirmação de senha digitada 

        
            app.db('tsin1')//acessa a tabela usuarios no bd
                .update(horario)//atuliza tabela
                .where({ id: horario.id })//condição de id informado como parametro
                .then(_ => res.status(204).send())//resposta de sucesso
                .catch(err => res.status(500).send(err))//resposta de erro
        
    }

    const get = (req, res) => {//método para buscar todos os usuarios
        app.db('tsin1')//acessando a tabela usuarios
            .select('id', 'horario', 'segunda', 'terca', 'quarta', 'quinta', 'sexta')//select na tabela
            .then(tsi => res.json(tsi))//armazenando em um json o resultado da busca
            .catch(err => res.status(500).send(err))//erro
    }
    return {get, save}

}