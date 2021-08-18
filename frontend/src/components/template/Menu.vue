<template>
  <aside class="menu" v-show="isMenuVisible">
    
    
      <div id="navbar">
        
        <router-link class="navbar-item" to="/horarios"> Grade Horária</router-link>
        <router-link to="/professores" class="navbar-item">Professores</router-link> 
        <router-link class="navbar-item" to="/avisos">Avisos</router-link>
        <router-link class="navbar-item" to="/"> Mapa do IFB</router-link>
        <router-link to="/pedidosavisos" class="navbar-item" v-show="user.admin==1 || user.representante==1
          || user.tipoUsuario==1">Pedidos de Avisos</router-link>
      
    
    
    <div class="navbar-item has-dropdown is-hoverable" id="navbar">
      
        <a class="navbar-link" v-show="user.admin==1"> Administração <i class="fa fa-lg"></i></a>
        <div class="navbar-dropdown" id="itensMenu">
          
            <router-link class="navbar-item" to="/usuarioadmin" >Usuários</router-link>
            <router-link class="navbar-item" to="/turmaadmin">Turmas</router-link>
            <router-link class="navbar-item" to="/disciplinasadmin">Disciplinas</router-link>
            <router-link class="navbar-item" to="/adminhorarios">Grade horária</router-link>
          
        </div>
      
    </div>
    <div class="navbar-item has-dropdown is-hoverable" id="navbar">
      <div id="navbar">
        <hr class="navbar-divider" />
        <div class="versao" id="versao">Version 3.0.0</div>
      </div>
    </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible", 'user']),
};
</script>

<style scoped>
#navbar {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 300px;
  background-color: azure;
  
}
.menu {
  grid-area: menu;
  background-color: rgb(62, 151, 62);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

#navbar a {
  text-decoration: none;
  color: #000;
  display: block;
}
#navbar a:hover {
  background-color: #833e8c;
  color:azure
}
#navbar a:active{
  background-color: #4a102d;
}

Aside.menu > button#butao {
  position: absolute;
  width: 100px;
  height: 5%;
  margin-left: 190px;

}
Aside.menu > button#butao:hover {
  background-color: rgb(62, 151, 62);
}
Aside.menu > input.input {
  position: relative;
  width: 180px;
  height: 4.5%;
  color: #000;
  justify-self: flex-start;
  text-decoration: none;
  margin-right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
}

#itensMenu {
  text-decoration: none;
}
#itensMenu a {
  text-decoration: none;
  color: #000;
}
#itensMenu a:hover {
  text-decoration: none;
}
.versao{
  color: #afaeae;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-decoration: none;
  text-align: center;
}
</style>