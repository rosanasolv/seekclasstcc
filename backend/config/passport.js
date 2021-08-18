const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { authenticate } = require('passport')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {//importanto para verificação
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

    }

    const strategy = new Strategy(params, (payload, done)=>{//definindo a estrategia de password
        app.db('usuarios')//acessando tabela usuarios
            .where({id: payload.id})//condição de acordo com o id do payload
            .first()//buscando apenas o primeiro
            .then(user => done(null, user ? {...payload} : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session:false})//retornando o password
    }
}