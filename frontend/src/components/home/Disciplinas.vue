<template>
  <div>
    <p v-for="(disciplina, index) in disciplinas" :key="index">
        <Materia 
            :nome="disciplinas[index].nome" 
            :professor="disciplinas[index].Professor" 
            :link="disciplinas[index].link"
            :idProf="$route.params.id"
        />
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl} from "@/global";
import Materia from '../home/Materia'
export default {
    name: "Disciplinas",
    components: {
    Materia
  },
    data: function(){
        return {
            disciplinas: {

            }
        }
    },
    methods: {
        getStats(){
            const id = this.$route.params.id
            axios.get(`${baseApiUrl}/disciplinas/professor/${id}`).then(res => this.disciplinas = res.data)
            console.log(this.disciplinas)
        }
    },
    mounted(){
        this.getStats()
    }
}
</script>

<style>

</style>