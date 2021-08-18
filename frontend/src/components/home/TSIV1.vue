<template>
  <div class="tabela-horario">
    <PageTitle icon="fa fa-table" main="Grade Horaria" sub="Horários" />
    <h3>TSIV1</h3>
    
    <div class="table is-bordered">
      <table class="table">
        <thead>
          <tr>
            <th><abbr>Horário</abbr></th>
            <th><abbr>Segunda</abbr></th>
            <th><abbr>Terça</abbr></th>
            <th><abbr>Quarta</abbr></th>
            <th><abbr>Quinta</abbr></th>
            <th><abbr>Sexta</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>14h às 15h</th>
            <td><Materia :nome="materia[1].nome" :professor="materia[1].Professor" :link="materia[1].link"/></td>
            <td><Materia :nome="materia[2].nome" :professor="materia[2].Professor" :link="materia[2].link"/></td>
            <td><Materia :nome="materia[0].nome" :professor="materia[0].Professor" :link="materia[0].link"/></td>
            <td><Materia :nome="materia[0].nome" :professor="materia[0].Professor" :link="materia[0].link"/></td>
            <td><Materia :nome="materia[4].nome" :professor="materia[4].Professor" :link="materia[4].link"/></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>15h às 16h</th>
            <td><Materia :nome="materia[1].nome" :professor="materia[1].Professor" :link="materia[1].link"/></td>
            <td><Materia :nome="materia[2].nome" :professor="materia[2].Professor" :link="materia[2].link"/></td>
            <td><Materia :nome="materia[0].nome" :professor="materia[0].Professor" :link="materia[0].link"/></td>
            <td><Materia :nome="materia[0].nome" :professor="materia[0].Professor" :link="materia[0].link"/></td>
            <td><Materia :nome="materia[4].nome" :professor="materia[4].Professor" :link="materia[4].link"/></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>16h às 17h</th>
            <td><Materia :nome="materia[1].nome" :professor="materia[1].Professor" :link="materia[1].link"/></td>
            <td><Materia :nome="materia[2].nome" :professor="materia[2].Professor" :link="materia[2].link"/></td>
            <td><Materia :nome="materia[3].nome" :professor="materia[3].Professor" :link="materia[3].link"/></td>
            <td><Materia :nome="materia[0].nome" :professor="materia[0].Professor" :link="materia[0].link"/></td>
            <td><Materia :nome="materia[4].nome" :professor="materia[4].Professor" :link="materia[4].link"/></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>17h às 18h</th>
            <td><Materia :nome="materia[1].nome" :professor="materia[1].Professor" :link="materia[1].link"/></td>
            <td><Materia :nome="materia[2].nome" :professor="materia[2].Professor" :link="materia[2].link"/></td>
            <td><Materia :nome="materia[3].nome" :professor="materia[3].Professor" :link="materia[3].link"/></td>
            <td><Materia :nome="materia[0].nome" :professor="materia[0].Professor" :link="materia[0].link"/></td>
            <td><Materia :nome="materia[4].nome" :professor="materia[4].Professor" :link="materia[4].link"/></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from 'axios'
import Materia from '../home/Materia'
import {baseApiUrl} from '@/global'

export default {
  name: "TSIV1",
  components: {
    PageTitle,
    Materia
  },
  data: function(){
        return {
            materia: {

            }
        }
    },
    methods: {
        getStats(){
            axios.get(`${baseApiUrl}/disciplinas/turmas/1`).then(res => this.materia = res.data)
        }
    },
    mounted(){
        this.getStats()
    }
};
</script>

<style scoped>
  th{
    width: 150px;
  }
</style>