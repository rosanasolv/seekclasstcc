<template>
  <div>
    <b-card
      border-variant="success"
      bg-variant="light"
      text-variant="black"
      title="Professor"
    >
      <b-card-text>
        <div><b>Nome:</b>{{ nome }} <b>E-mail:</b> {{ email }}</div>
        <b>Contato:</b> {{ contato }}<br/>
        <router-link :to="{ path: '/disciplinas/' + id }" id="itensMenu">
          <b-button variant="success" id="butao">Disciplinas</b-button>
        </router-link>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Professor",
  props: ["id", "nome", "email", "contato"],
  
};
</script>

<style>
    .box {
    background-color: aqua;
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 160px;
    font-size: 12px;
    align-items: flex-start;
    align-content: flex-start;
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
</style>