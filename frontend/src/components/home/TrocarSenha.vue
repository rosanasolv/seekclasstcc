<template>
  <div>
    <div class="perfil">
      <b-card class="mt-3 mb-3">
        <b-form>
          <b-row>
            <b-col md="6" sm="12">
              <b-form-group label="Nova senha:" label-for="user-senha">
                <b-form-input id="user-senha" type="password" v-model="usuario.senha"/>
              </b-form-group>
            </b-col>
            
            <b-col md="6" sm="12">
              <b-form-group label="Confirmar senha:" label-for="user-csenha">
                <b-form-input id="user-csenha" type="password" v-model="usuario.confirmarSenha"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-button variant="success" @click="alterarSenha"
              >Trocar senha</b-button
            >
            <b-button class="ml-2" variant="primary" @click="reset"
              >Cancelar</b-button
            >
          </b-row>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
    name: "TrocarSenha",
    data: function () {
        return {
        usuario: {},
        };
    },
    computed: mapState(['user']),
    methods: {
      loadUsuario(){
      const url = `${baseApiUrl}/usuarios/${this.user.id}`;
      axios.get(url).then((res) => {
        this.usuario = res.data
      })
    },
      reset() {
         this.usuario.senha = ''
         this.usuario.confirmarSenha = '' 
         //this.loadUsuario();    
      },
      alterarSenha(){
      const url = `${baseApiUrl}/usuarios/trocarsenha/${this.user.id}`;
      axios.put(url, this.usuario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    },
    mounted() {
      this.loadUsuario();
    }
};
</script>

<style>
</style>