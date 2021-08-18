<template>
  <div>
    <PageTitle
      icon="fa fa-briefcase"
      main="Professores"
      sub="Lista de professores"
    />

    <p v-for="(professor, index) in professores" :key="index">
      <Professor
        :nome="professores[index].nome"
        :email="professores[index].email"
        :contato="professores[index].contato"
        :id="professores[index].id"
      />
    </p>
  </div>
</template>
<script>
import PageTitle from "../template/PageTitle";
import Professor from "../home/Professor";
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "Professores",
  components: {
    PageTitle,
    Professor,
  },
  data: function () {
    return {
      professores: {},
    };
  },
  methods: {
    getStats() {
      axios
        .get(`${baseApiUrl}/usuarios/professores/`)
        .then((res) => (this.professores = res.data));
      console.log(this.professores);
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>
<style scoped>
</style>
