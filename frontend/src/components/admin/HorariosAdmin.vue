<template>
  <div class="admin-grades">
    <PageTitle icon="fa fa-table" main="Grade Horaria" sub="Horários" />
    <b-form>
      <b-row>
        <b-form-group label="Escolha uma turma: " label-for="horarios-turmas">
          <b-form-select
            
            id="horarios-turmas"
            :options="turmas"
            v-model="horario.turma"
          />
        </b-form-group>
      </b-row>
      <b-button variant="primary" @click="carregarHorarios">Buscar</b-button>
    </b-form>
    <b-table hover striped :items="horarios" :fields="fields"> 
        <template v-slot:cell(actions)='data'>
            <b-button variant="warning" @click="loadHorario(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>    
        </template>        
    </b-table>
    <b-card class="mt-3 mb-3" v-if="mode==='save'">
      <b-form>
          <input id="horario-id" type="hidden" v-model="horario.id" />
        <b-row>
          <b-col md="2" sm="12">
            <b-form-group label="Horário:" label-for="horario-horario">
              <b-form-input
                id="horario-horario"
                type="text"
                v-model="horario.horario"
                required
                readonly
                
              />
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Segunda:" label-for="dia-segunda">
              <b-form-input
                id="horario-segunda"
                type="text"
                v-model="horario.segunda"
                required
                :readonly="mode==='remove'"
                
              />
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Terça:" label-for="dia-terca">
              <b-form-input
                id="horario-terca"
                type="text"
                v-model="horario.terca"
                required
                :readonly="mode==='remove'"
                
              />
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Quarta:" label-for="dia-quarta">
              <b-form-input
                id="horario-quarta"
                type="text"
                v-model="horario.quarta"
                required
                :readonly="mode==='remove'"
                
              />
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Quinta:" label-for="dia-quinta">
              <b-form-input
                id="horario-quinta"
                type="text"
                v-model="horario.quinta"
                required
                :readonly="mode==='remove'"
                
              />
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Sexta:" label-for="dia-sexta">
              <b-form-input
                id="horario-sexta"
                type="text"
                v-model="horario.sexta"
                required
                :readonly="mode==='remove'"
                
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="primary" v-if="mode === 'save'" @click="save"
          >Salvar</b-button
        >
        
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import PageTitle from "../template/PageTitle";
export default {
    name: 'HorariosAdmin',
    components: {
    PageTitle,
  },
  data: function () {
    return {
        mode: "",
      turmas: [],
      horario: {},
      horarios: [],
      nomeTurma: {},
      fields: [
        { key: "horario", label: "Horário" },
        { key: "segunda", label: "Segunda" },
        { key: "terca", label: "Terça" },
        { key: "quarta", label: "Quarta" },
        { key: "quinta", label: "Quinta" },
        { key: "sexta", label: "Sexta" },
        { key: 'actions', label: "Ações" }
      ],
      
    };
  },
  methods: {
    loadTurmas() {
      const url = `${baseApiUrl}/turmas`;
      axios.get(url).then((res) => {
        this.turmas = res.data.map((turma) => {
          return { value: turma.id, text: `${turma.nome}` };
        });
      });
    },
    loadHorarios(a) {
    console.log(a);
      const url = `${baseApiUrl}/horarios/${a}`;
      axios.get(url).then((res) => {
        this.horarios = res.data;
        console.log(this.horarios)
      });
    },
    carregarHorarios() {
      //console.log(this.horario.turma);
      const url = `${baseApiUrl}/turmas/${this.horario.turma}`;
      axios.get(url).then((res) => {
        this.nomeTurma = res.data;
        //console.log(this.nomeTurma.nome);
        this.loadHorarios(this.nomeTurma.nome);
      });

      
    },
    loadHorario(horario, mode = 'save') {
      this.mode = mode
      this.horario = { ...horario }
    },
    save() {
      //const method = this.user.id ? "put" : "post";
      //const id = this.user.id ? `/${this.user.id}` : ""
      axios.put(`${baseApiUrl}/horarios/${this.nomeTurma.nome}/edit`, this.horario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          //this.carregarHorarios();
          //this.reset();
          
        })
        .catch(showError);
    },
    reset() {
        this.mode = ""
        //this.horario = {}
        //this.loadUsers()
    },
  },
  mounted() {
    this.loadTurmas();
    //this.loadHorarios();
  },
}
</script>

<style>

</style>