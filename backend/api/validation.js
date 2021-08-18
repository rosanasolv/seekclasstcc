module.exports = app => {//funções para validação de formulários
    function existsOrError(value, msg){
        if(!value) throw msg//se o valor ta em branco
        if(Array.isArray(value) && value.length === 0 ) throw msg//se o valor é pequeno
        if(typeof value === 'string' && !value.trim()) throw msg//se o valor não contem o novo string
    
    }
    function notExistsOrError (value, msg) {//testa se o valor não existe
        try {
            existOrError(value, msg)
        }catch(msg) {
            return
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {//testa se dois valores são iguais
        if(valueA !== valueB) throw msg
    }

    function statusFirst(value, msg){
        if(value === 1) throw msg
    }
    function statusFirstNo(value, msg){
        if(value === 0) throw msg
    }
    function passRandom(len){
        var passwd = ''
        do{
            passwd += Math.random().toString(36).substr(2)
        }while(passwd.length < len)
        passwd = passwd.substr(0, len)

        return passwd
    }
    function testeSenha(value, msg){
        if(value.length < 6 ) throw msg//se o valor é pequeno
    }

    return {existsOrError, notExistsOrError, equalsOrError, statusFirst, passRandom, statusFirstNo, testeSenha}//retornando todas os métodos para usar em outras classes
}