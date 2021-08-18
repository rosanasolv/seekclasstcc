<template>
  <div class="auth-content">
    
    <div class="auth-modal">
      
      <hr/>
      <div class="auth-title">
        {{ showSignup ? "Primeiro Acesso" : "Área de acesso ao sistema" }}
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
      <p class="control has-icons-left has-icons-right">
      <input
        class="input is-primary"
        v-model="user.senha"
        type="password"
        placeholder="Digite a senha"
        v-on:keyup.enter="enter"
      />
      <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
      </span>
      </p>
      <p class="control has-icons-left has-icons-right">
      <input
        class="input is-primary"
        v-if="showSignup"
        v-model="user.confirmarSenha"
        type="password"
        placeholder="Confirme a senha"
        v-on:keyup.enter="enter"
      />
      <span class="icon is-small is-left" v-if="showSignup">
          <i class="fa fa-lock"></i>
      </span>
      </p>
      <button id="ButtonSignup" class="button is-success" v-if="showSignup" @click="primeiroAcesso">Registrar</button>
      <button id="ButtonSignin" class="button is-success" v-else @click="signin">Entrar</button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup"
          >Já realizou o primeiro acesso? Faça o login!</span
        >
        <span v-else>Primeiro Acesso?</span>
      </a>
      <router-link to="/esqueceusenha" v-show="!showSignup"> 
        <span>Esqueceu a senha?</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function () {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
          //this.$toasted.global.defaultSuccess();
        })

        .catch(showError);
    },
    primeiroAcesso() {
      axios
        .put(`${baseApiUrl}/first`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
    enter(){
      if(this.showSignup){
        this.primeiroAcesso()
      }else{
        this.signin()
      }
      
    }
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: white;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth-modal > h1 {
  color: rgb(77, 133, 26);
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 10px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: royalblue;
  color: white;
  padding: 5px 15px;
}
.auth-modal hr {
  border: 1;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
#ButtonSignin{
  width: 100%;
  background-color: rgb(62, 151, 62);
}
#ButtonSignup{
  width: 100%;
  background-color: rgb(62, 151, 62);
}
</style>