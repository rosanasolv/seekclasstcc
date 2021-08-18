import Vue from 'vue'

export const userKey = '__seekclass_user'
export const baseApiUrl = /*'http://192.168.15.13:8000'*/ 'http://localhost:8000'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data})
    }else if(typeof e === 'string'){
        Vue.toasted.global.defaultError({ msg: e})
    }else{
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey}
