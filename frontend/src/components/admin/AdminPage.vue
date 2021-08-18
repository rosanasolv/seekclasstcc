<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração" sub="Cadastro de dados do sistema" />
        <div class="tabs is-centered">
            <ul>
                <li class="is-active">
                    <a>
                        <UsuarioAdmin />
                    </a>
                </li> 
                    
                
            </ul>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
//import DisciplinaAdmin from './DisciplinaAdmin'
//import TurmaAdmin from './TurmaAdmin'
import UsuarioAdmin from './UsuarioAdmin'

export default {
    name: 'AdminPage',
    components: {
        PageTitle,
        //DisciplinaAdmin,
        UsuarioAdmin,
        //TurmaAdmin
    },
    
}
</script>

<style>
    
</style>