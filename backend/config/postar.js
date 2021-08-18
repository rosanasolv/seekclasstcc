module.exports = middleware =>{// classe para verificar se o usuario pode postar avisos
    return (req, res, next) => {
        if(req.user.tipoUsuario == 1 || req.user.representante || req.user.postador){//condição para saber se o usuario pode postar
            middleware(req, res, next)//passa para o proximo middleware
        }else{
            res.status(402).send('Usuário não pode fazer postagens.')//erro caso não possa postar
        }
    }
}