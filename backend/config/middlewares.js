const bodyParser = require('body-parser')//importando body parse para o projeto
const cors = require('cors')//importanto cors

module.exports = app =>{
    app.use(bodyParser.json())
    app.use(cors())
}