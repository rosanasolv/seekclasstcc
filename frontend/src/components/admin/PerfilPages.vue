<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-user-circle" main="Perfil" sub="Editar perfil" />
    <div class="stats">
      <!--<Perfil :nome="perfil.usuario.nome" :email="perfil.usuario.email"/>-->
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Configurações do usuário" active
            ><b-card-text><Perfil /></b-card-text>
          </b-tab>
          <b-tab title="Alterar senha"
            ><b-card-text><TrocarSenha /></b-card-text></b-tab
          >
          <!--<b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>--->
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Perfil from "../home/Perfil";
import TrocarSenha from "../home/TrocarSenha";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "PerfilPage",
  components: {
    PageTitle,
    Perfil,
    TrocarSenha,
  },
  data: function () {
    return {
      perfil: {},
    };
  },
  methods: {
    getStats() {
      axios
        .get(`${baseApiUrl}/usuarios/`)
        .then((res) => (this.perfil = res.data));
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style scoped>
</style>