<template>
  <div>
    <b-card
      border-variant="success"
      bg-variant="light"
      text-variant="black"
      
    >
      <b-card-text>
        <div>
          <b>Assunto:</b>{{ assunto }} <b>Remetente:</b> {{ remetente }}
        </div>
        <br/>
        <b-card
          border-variant="success"
          bg-variant="light"
          text-variant="black"
          
        >
        <div></div>
          <b>Conteúdo:</b> <p v-html="conteudo"></p><br />
        </b-card>
      </b-card-text>
    </b-card>
  </div>
</template>
    
<script>
export default {
    name: "Notificacao",
    props: ["id", "assunto", "remetente", "conteudo"],
};
</script>

<style>
</style>