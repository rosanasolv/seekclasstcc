const admin = require('./admin')
const postar = require('./postar')

module.exports = app => {
    //rotas q não precisam de permissões
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.put('/esqueceusenha/', app.api.user.esqueceuSenha)
    app.post('/validateToken', app.api.auth.validateToken)
    app.get('/horarios/tsiv1', app.api.tsiv1.get)
    app.get('/horarios/tsin1', app.api.tsin1.get)
    app.put('/horarios/tsin1/edit', app.api.tsin1.save)
    app.get('/horarios/tsiv2', app.api.tsiv2.get)
    app.get('/horarios/tsin2', app.api.tsin2.get)
    app.get('/horarios/tsiv3', app.api.tsiv3.get)
    app.get('/horarios/tsin3', app.api.tsin3.get)
    app.get('/horarios/tsiv4', app.api.tsiv4.get)
    app.get('/horarios/tsin4', app.api.tsin4.get)
    app.get('/horarios/tsiv5', app.api.tsiv5.get)
    app.get('/horarios/tsin5', app.api.tsin5.get)
    //rotas que precisam de alguma permissão
    app.route('/first')
        .put(app.api.user.primeiroAcesso)

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get)
    
    app.route('/usuarios/professores')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getProfessores)

    app.route('/usuarios/trocarsenha/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.trocarSenha)
    
    app.route('/usuarios/representantes')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.user.getRepresentantes))

    app.route('/usuarios/podePostar')
        //.all(app.config.passport.authenticate())
        .get(app.api.user.getPodepostar)

    app.route('/usuarios/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(admin(app.api.user.remove))
    
    app.route('/turmas')
        .all(app.config.passport.authenticate())
        .get(app.api.turma.get)
        .post(admin(app.api.turma.save))

    app.route('/turmas/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.turma.getById)
        .put(admin(app.api.turma.save))
        .delete(admin(app.api.turma.remove))

    app.route('/notificacoes')
        //.all(app.config.passport.authenticate())
        .get(app.api.notificacao.get)
        .post(app.api.notificacao.save)

    app.route('/notificacoes/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.notificacao.getById)
        .put(app.api.notificacao.save)
        .delete(app.api.notificacao.remove)

    app.route('/notificacoes/assunto/:assunto')
        .get(app.api.notificacao.getAssunto)

    app.route('/notificacoes/turmas/:turmas')
        .get(app.api.notificacao.getTurmaId)

    app.route('/disciplinas')
        .all(app.config.passport.authenticate())
        .get(app.api.disciplina.get)
        .post(admin(app.api.disciplina.save))

    app.route('/disciplinas/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.disciplina.getById)
        .put(admin(app.api.disciplina.save))
        .delete(admin(app.api.disciplina.remove))
    
    app.route('/disciplinas/professor/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.disciplina.getByIdnome)
        

    app.route('/disciplinas/turmas/:turma')
        .all(app.config.passport.authenticate())
        .get(app.api.disciplina.getByTurma)

    
}