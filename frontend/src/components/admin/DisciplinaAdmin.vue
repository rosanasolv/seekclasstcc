<template>
  <div class="disciplinas-admin">
    <PageTitle
      icon="fa fa-book"
      main="Configuração de disciplinas"
      sub="Edição de dados das disciplinas."
    />
    <b-card class="mt-3 mb-3">
      <b-form>
        <input id="disciplina-id" type="hidden" v-model="disciplina.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="disciplina-name">
              <b-form-input
                id="disciplina-name"
                type="text"
                v-model="disciplina.nome"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o nome da Disciplina"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Link:" label-for="disciplina-link">
              <b-form-input
                id="disciplina-link"
                type="text"
                v-model="disciplina.link"
                :readonly="mode === 'remove'"
                placeholder="Informe o endereço do link"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-form-group v-if="mode === 'save'" label="Escolha o professor: " label-for="disciplina-professor">
            <b-form-select
              id="disciplina-professor"
              :options="usuarios" v-model="disciplina.professor" />
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group v-if="mode === 'save'" label="Escolha a turma: " label-for="disciplina-turma">
            <b-form-select
              id="disciplina-turma"
              :options="turmas" v-model="disciplina.turma" />
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group label="Turno" v-show="mode === 'save'">
            <b-form-radio
              v-model="disciplina.turno"
              name="disciplina-turno"
              value="M"
              >Matutino</b-form-radio
            >
            <b-form-radio
              v-model="disciplina.turno"
              name="disciplina-turno"
              value="V"
              >Vespertino</b-form-radio
            >
            <b-form-radio
              v-model="disciplina.turno"
              name="disciplina-turno"
              value="N"
              >Noturno</b-form-radio
            >
          </b-form-group>
        </b-row>
        <b-button variant="primary" v-if="mode === 'save'" @click="save"
          >Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
          >Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>

      </b-form>
    </b-card>
    <b-table hover striped :items="disciplinas" :fields="fields">
        <template v-slot:cell(actions)='data'>
            <b-button variant="warning" @click="loadDisciplina(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadDisciplina(data.item, 'remove')">
                <i class="fa fa-trash"></i>
            </b-button>    
        </template> 
    </b-table>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  name: "DisciplinaAdmin",
  components: {
    PageTitle,
  },
  data: function () {
    return {
      mode: "save",
      disciplina: {},
      disciplinas: [],
      usuarios: [],
      turmas: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "Professor", label: "Professor", sortable: true },
        { key: "turno", label: "Turno", sortable: true },
        { key: "Turma", label: "Turma", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadDisciplinas() {
      const url = `${baseApiUrl}/disciplinas`;
      axios.get(url).then((res) => {
        this.disciplinas = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.disciplina = {}), this.loadDisciplinas();
    },
    save() {
      console.log(this.disciplina);
      const method = this.disciplina.id ? "put" : "post";
      const id = this.disciplina.id ? `/${this.disciplina.id}` : "";
      axios[method](`${baseApiUrl}/disciplinas${id}`, this.disciplina)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.disciplina.id;
      axios
        .delete(`${baseApiUrl}/disciplinas/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadDisciplina(disciplina, mode = 'save') {
      this.mode = mode
      this.disciplina = { ...disciplina }
    },
    loadUsuarios(){
      const url = `${baseApiUrl}/usuarios/professores`
      axios.get(url).then(res => {
        this.usuarios = res.data.map(usuario =>{
          return {value: usuario.id, text: `${usuario.nome} - ${usuario.email}` }
        })
      })
    },
    loadTurmas(){
        const url = `${baseApiUrl}/turmas`
        axios.get(url).then(res => {
            this.turmas = res.data.map(turma =>{
                return {value: turma.id, text: `${turma.nome}`}
            })
        })
    }
    /*getStats(){
            axios.get(`${baseApiUrl}/perfis/`).then(res => this.admin = res.data)
        }*/
  },
  mounted() {
    this.loadUsuarios();
    this.loadTurmas();
    this.loadDisciplinas();
  },
};
</script>

<style>
</style>