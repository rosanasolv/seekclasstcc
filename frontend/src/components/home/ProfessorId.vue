<template>
  <div>
    <b-card
      border-variant="success"
      bg-variant="light"
      text-variant="black"
      title="Professor"
    >
      <b-card-text>
        <Professor
          :nome="professor.nome"
          :email="professor.email"
          :contato="professor.contato"
          :id="professor.id"
        />
        <router-link :to="{ path: '/disciplinas/' + id }" id="itensMenu">
          <b-button variant="success" id="butao">Disciplinas</b-button>
        </router-link>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import Professor from "../home/Professor";
export default {
  name: "Professor",
  components: {
    Professor,
  },
  data: function () {
    return {
      professor: {},
    };
  },
  methods: {
    getStats() {
      const id = this.$route.params.id;
      axios
        .get(`${baseApiUrl}/usuarios/${id}`)
        .then((res) => (this.professor = res.data));
      console.log(this.professor);
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style>
</style>