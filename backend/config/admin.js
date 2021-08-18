module.exports = middleware =>{// classe para verificar se o usuario é admin
    return (req, res, next) => {//requisição, resposta e próximo
        if(req.user.admin){
            middleware(req, res, next)//se for admin passa para o próximo middleware
        }else{
            res.status(401).send('Usuário não é administrador.')//bloqueia o usuario caso não seja admin e envia reposta de erro
        }
    }
}