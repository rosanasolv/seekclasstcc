import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import PerfilPages from '../components/admin/PerfilPages'
import AdminPage from '../components/admin/AdminPage'
import Avisos from '../components/home/Avisos'
import Notificacao from '../components/home/Notificacoes'
import Professores from '../components/home/Professores'
import UsuarioAdmin from '../components/admin/UsuarioAdmin'
import TurmaAdmin from '../components/admin/TurmaAdmin'
import DisciplinaAdmin from '../components/admin/DisciplinaAdmin'
import Disciplinas from '../components/home/Disciplinas'
import Professor from '../components/home/ProfessorId'
import Auth from '../components/auth/Auth'
import Horarios from '../components/home/Horarios'
import AdminGrades from '../components/admin/HorariosAdmin'
import EsqueceuSenha from '../components/home/EsqueceuSenha'
import Mapa from '../components/home/Mapa'
import PedidosAvisos from '../components/home/PedidosAvisos'

import {userKey} from '@/global'

Vue.use(VueRouter)

const routes = [
{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'adminpage',
    path: '/admin',
    component: AdminPage,
    meta: {
        requiresAdmin: true
    }
},{
    name: 'usuarioadmin',
    path: '/usuarioadmin',
    component: UsuarioAdmin,
    meta: {
        requiresAdmin: true
    }
},{
    name: 'turmaadmin',
    path: '/turmaadmin',
    component: TurmaAdmin,
    meta: {
        requiresAdmin: true
    }
},{
    name: 'disciplinasadmin',
    path: '/disciplinasadmin',
    component: DisciplinaAdmin,
    meta: {
        requiresAdmin: true
    }
},{
    name: 'perfilPages',
    path: '/perfil',
    component: PerfilPages
    
},{
    name: 'aviso',
    path: '/avisos',
    component: Avisos,
    
},{
    name: 'notif',
    path: '/notificacoes',
    component: Notificacao
},{
    name: 'professores',
    path: '/professores',
    component: Professores
},{
    name: 'disciplinas',
    path: '/disciplinas/:id',
    component: Disciplinas
},{
    name: 'professor',
    path: '/professor/:id',
    component: Professor
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name:'horarios',
    path: '/horarios',
    component: Horarios
},{
    name: 'adminhorarios',
    path: '/adminhorarios',
    component: AdminGrades,
    meta: {
        requiresAdmin: true
    }
},{
    name: 'esqueceusenha',
    path: '/esqueceusenha',
    component: EsqueceuSenha
},{
    name: 'mapaifb',
    path: '/mapaifb',
    component: Mapa
},{
    name: 'pedidosavisos',
    path: '/pedidosavisos',
    component: PedidosAvisos,
    meta: {
        requiresPostar: true
    }
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next)=>{
    const json = localStorage.getItem(userKey)
    if(to.matched.some(record => record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        user && user.admin ? next() : next({path: '/'})
    }else{
        next()
    }
    if(to.matched.some(record => record.meta.requiresPostar)){
        const user = JSON.parse(json)
        user && (user.representante || user.tipoUsuario===1) ? next() : next({path: '/'})
    }else{
        next()
    }
})
 
export default router
