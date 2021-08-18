const app = require('express')()//importanto express
const consign = require('consign')//importando consig para gerenciar as depedencias
const db = require('./config/db')//importanto bd

app.db = db//banco de dados
//inicializando middlewares para o gerenciamento de dependencias da aplicação
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


app.listen(8000, ()=>{
    console.log('Executando na porta 8000')
})