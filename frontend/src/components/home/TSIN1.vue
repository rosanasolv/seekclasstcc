<template>
  <div class="turma-tsiv5">
    <PageTitle icon="fa fa-table" main="Grade Horaria" sub="Horários" />
    <h3>TSIN1</h3>

    <div class="table is-bordered">
      <table class="table">
        <thead>
          <tr>
            <th><abbr >Horário</abbr></th>
            <th><abbr>Segunda</abbr></th>
            <th><abbr >Terça</abbr></th>
            <th><abbr >Quarta</abbr></th>
            <th><abbr >Quinta</abbr></th>
            <th><abbr >Sexta</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>14h às 15h</th>
            <td><Materia :nome="materia.usuario[2].nome" :professor="materia.usuario[2].professor"/></td>
            <td><Materia :nome="materia.usuario[1].nome" :professor="materia.usuario[1].professor"/></td>
            <td><Materia :nome="materia.usuario[3].nome" :professor="materia.usuario[3].professor"/></td>
            <td><Materia :nome="materia.usuario[0].nome" :professor="materia.usuario[0].professor"/></td>
            <td><Materia :nome="materia.usuario[4].nome" :professor="materia.usuario[4].professor"/></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>15h às 16h</th>
            <td><Materia :nome="materia.usuario[2].nome" :professor="materia.usuario[2].professor"/></td>
            <td><Materia :nome="materia.usuario[1].nome" :professor="materia.usuario[1].professor"/></td>
            <td><Materia :nome="materia.usuario[3].nome" :professor="materia.usuario[3].professor"/></td>
            <td><Materia :nome="materia.usuario[0].nome" :professor="materia.usuario[0].professor"/></td>
            <td><Materia :nome="materia.usuario[4].nome" :professor="materia.usuario[4].professor"/></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>16h às 17h</th>
            <td><Materia :nome="materia.usuario[1].nome" :professor="materia.usuario[1].professor"/></td>
            <td><Materia :nome="materia.usuario[1].nome" :professor="materia.usuario[1].professor"/></td>
            <td><Materia :nome="materia.usuario[3].nome" :professor="materia.usuario[3].professor"/></td>
            <td><Materia :nome="materia.usuario[0].nome" :professor="materia.usuario[0].professor"/></td>
            <td><Materia :nome="materia.usuario[4].nome" :professor="materia.usuario[4].professor"/></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>17h às 18h</th>
            <td><Materia :nome="materia.usuario[1].nome" :professor="materia.usuario[1].professor"/></td>
            <td><Materia :nome="materia.usuario[1].nome" :professor="materia.usuario[1].professor"/></td>
            <td><Materia :nome="materia.usuario[3].nome" :professor="materia.usuario[3].professor"/></td>
            <td><Materia :nome="materia.usuario[0].nome" :professor="materia.usuario[0].professor"/></td>
            <td><Materia :nome="materia.usuario[4].nome" :professor="materia.usuario[4].professor"/></td>
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
  name: "TSIN1",
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
  .turma-tsiv5{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .table{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  
</style>