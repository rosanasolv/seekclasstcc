<template>
  <div class="perfil">
    <b-card class="mt-3 mb-3">
      <b-form>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="user-name">
              <b-form-input
                id="user-name"
                type="text"
                v-model="usuario.nome"
                :readonly="mode == 'normal'"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group
              label="E-mail:"
              label-for="user-email"
              
            >
              <b-form-input
                id="user-email"
                type="text"
                v-model="usuario.email"
                readonly
                
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Contato:" label-for="user-contato">
              <b-form-input
                id="user-contato"
                type="text"
                v-model="usuario.contato"
                :readonly="mode == 'normal'"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              label="Representante:"
              label-for="representante-email"
              v-show="mode == 'normal'"
            >
              <b-form-input
                id="representante-email"
                type="text"
                v-model="usuario.representante"
                :readonly="mode == 'normal'"
                v-show="mode == 'normal'"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group
              label="Tipo de usuário:"
              label-for="tipoUsuario-name"
              v-show="mode == 'normal'"
            >
              <b-form-input
                id="tipoUsuario-name"
                type="text"
                v-model="usuario.tipoUsuario"
                readonly
                v-show="mode == 'normal'"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-button variant="primary" @click="editarPerfil()" v-show="mode==='normal'"
            >Editar perfil</b-button
          >
          <b-button variant="danger" @click="alterarPerfil" v-show="mode==='edit'"
          >Salvar</b-button
          >
          <b-button
            class="ml-2"
            variant="primary"
            v-if="mode == 'edit'"
            @click="reset()"
            >Cancelar</b-button
          >
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  name: "Perfil",
  props: ["nome", "email"],
  data: function () {
    return {
      mode: "normal",
      usuario: {}
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
    editarPerfil() {
      this.mode = "edit";
      
    },
    alterarPerfil(){
      const url = `${baseApiUrl}/usuarios/${this.user.id}`;
      axios.put(url, this.usuario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = "normal";
      this.loadUsuario();
    },
  },
  mounted() {
    this.loadUsuario();
  }
};
</script>

<style scoped>
.box {
  width: 500px;
}
</style>