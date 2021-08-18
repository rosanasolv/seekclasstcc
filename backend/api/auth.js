const { authSecret } = require('../.env')//importanto authSecret do arquivo .env que serve como modelo
const jwt = require('jwt-simple')//importanto jwt simple para criar o token de autenticação
const bcrypt = require('bcrypt-nodejs')//criptografia da senha digitada pelo usuario



module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError, statusFirst } = app.api.validation//importanto métodos para validações dos campos
    const signin = async (req, res) => {//método apra realização de login

        const user = { ...req.body }//carregando corpo das requisições na const user

        try {
            
            existsOrError(user.email, 'E-mail não informado')//verificando se o campo email foi preenchido
            
            existsOrError(user.senha, 'Senha não informada')//verificando se o campo senha foi preenchido
            //existsOrError(user.confirmarSenha, 'Confirmação de senha inválida')
            //equalsOrError(user.senha, user.confirmarSenha, 'Senhas diferentes')
        }catch(msg) {
            return res.status(400).send(msg)//retorna mensagem em caso de erro no try
        }

        const userDb = await app.db('usuarios')//obtenção do usuário pelo email no banco
            .where({ email: user.email })
            .first()//pegando apenas o primeiro dado registrado

        if (!userDb) return res.status(400).send('Dados incorretos')//se o email não existir no banco, resposta de erro
        if(userDb.status===0) return res.status(400).send('Senha ainda não definida.')
            
        
        const isMatch = bcrypt.compareSync(user.senha, userDb.senha)//comparando a senha criptografada com a senha do banco de dados
        if (!isMatch) return res.status(401).send('senha inválida!')//verificando se a senha criptografada confere com a senha do banco de dados se n conferir envia respota de erro

        const now = Math.floor(Date.now() / 1000)//pegando a data e hora do sistema

        const payload = {//armazenando as informações do usuario encontrado no banco em um payload para montagem da secção
            id: userDb.id,
            nome: userDb.nome,
            email: userDb.email,
            admin: userDb.admin,
            representante: userDb.representante,
            tipoUsuario: userDb.tipoUsuario,
            senha: userDb.senha,
            iat: now,//emissão de data de login e emissão do token
            exp: now + (60 * 60 * 24 * 3)//expiração do login designado para 3 dias

        }
        res.json({//mandando payload e o token para o usuário
            ...payload, 
            token: jwt.encode(payload, authSecret)//armazenando o token
        })
    }
    const validateToken = async (req, res)=>{//método para validação de token
        const userData = req.body || null
        try{
            if(userData) {//se dados do usuario existir
                const token = jwt.decode(userData.token, authSecret)//criando token com dada de criação
                if(new Date(token.exp * 1000) > new Date()) {//verificando se o token ainda é válido
                    return res.send(true)
                }
            }
        }catch(e){
            //problema com o token
        }
        res.send(false)
    }
    return { signin, validateToken }
}