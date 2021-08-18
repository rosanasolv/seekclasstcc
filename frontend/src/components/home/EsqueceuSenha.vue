<template>
  <div class="forgot-password">
      
      <div class="forgot-modal">
        <div class="forgot-title">
          <p><b>Página de esqueceu a senha</b></p>
          <p>Verifique seu e-mail após clicar em enviar</p>
        </div>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input is-primary"
            v-model="user.email"
            name="email"
            type="text"
            placeholder="E-mail"
            v-on:keyup.enter="enter"
            autofocus
          />
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </p>
        <button id="ButtonSignup" class="button is-success" @click="recuperarSenha">Enviar</button>
        <router-link to="/auth"> 
          <span>Faça login</span>
        </router-link>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
    name: "EsqueceuSenha",
    data: function () {
    return {
      user: {},
    };
  },
  methods: {
    recuperarSenha(){
      const url = `${baseApiUrl}/esqueceusenha/`;
      console.log(this.user)
      axios.put(url, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
        })
        .catch(showError);
    },
  },
}
</script>

<style>
.forgot-password {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-modal {
  background-color: white;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}
.forgot-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>