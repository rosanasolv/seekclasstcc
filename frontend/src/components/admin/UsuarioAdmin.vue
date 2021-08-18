<template>
  <div class="usuario-admin">
    <PageTitle
      icon="fa fa-users"
      main="Configuração de Usuários"
      sub="Edição de dados dos usuários."
    />
    <b-card class="mt-3 mb-3">
      <b-form method="post" action="https://formspree.io/f/xnqlboeq">
        <input id="user-id" type="hidden" v-model="user.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="user-name">
              <b-form-input
                name="name"
                id="user-name"
                type="text"
                v-model="user.nome"
                required
                :readonly="mode==='remove'"
                placeholder="Informe o nome do usuário"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="user-email">
              <b-form-input
                name="_replyto"
                id="user-email"
                type="text"
                v-model="user.email"
                required
                :readonly="mode==='remove'"
                placeholder="Informe o e-mail do usuário"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-form-group label="Tipo de usuário" v-show="mode==='save'">
            <b-form-radio
              v-model="user.tipoUsuario"
              name="user-tipoUsuario"
              value="1"
              >Professor</b-form-radio
            >
            <b-form-radio
              v-model="user.tipoUsuario"
              name="user-tipoUsuario"
              value="2"
              >Aluno</b-form-radio
            >
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-checkbox
            id="user-admin"
            v-show="mode==='save'"
            v-model="user.admin"
            class="mt-3 mb-3"
          >
            Administrador?
          </b-form-checkbox>
          <b-form-checkbox
            id="user-representante"
            v-show="mode==='save'"
            v-model="user.representante"
            class="mt-3 mb-3 ml-4"
          >
            Representante?
          </b-form-checkbox>
        </b-row>
        <b-row>
          <b-col md="1" sm="3">
            <b-form-group label="Status:" label-for="user-status">
              <b-form-input
                id="user-status"
                type="text"
                v-model="user.status"
                :readonly="mode==='remove'"
                placeholder="0"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Contato:" label-for="user-contact">
              <b-form-input
                id="user-contact"
                type="text"
                v-model="user.contato"
                :readonly="mode==='remove'"
                placeholder="Informe o contato do usuário"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary" v-if="mode === 'save'" @click="save"
          >Salvar</b-button
        >
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
          >Excluir</b-button
        >
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
    </b-card>
    <b-table hover striped :items="users" :fields="fields">
        <template v-slot:cell(actions)='data'>
            <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                <i class="fa fa-trash"></i>
            </b-button>    
        </template>        
    </b-table>
    
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  name: "UsuarioAdmin",
  components: {
    PageTitle,
  },
  data: function () {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => value ? "Sim" : "Não"
        },
        {
          key: "tipoUsuario",
          label: "Tipo de Usuário",
          sortable: true,
          formatter: value => value==1 ? "Professor" : "Aluno"
        },
        {
          key: "representante",
          label: "Representante",
          sortable: true,
          formatter: value => value ? "Sim" : "Não"
        },
        { key: 'actions', label: "Ações" }
      ],
    }
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/usuarios`;
      axios.get(url).then((res) => {
        this.users = res.data
      })
    },
    reset() {
        this.mode = "save"
        this.user = {}
        this.loadUsers()
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : ""
      axios[method](`${baseApiUrl}/usuarios${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/usuarios/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = 'save') {
      this.mode = mode
      this.user = { ...user }
    },
    /*getStats(){
            axios.get(`${baseApiUrl}/perfis/`).then(res => this.admin = res.data)
        }*/
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>