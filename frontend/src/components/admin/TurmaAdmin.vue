<template>
  <div class="turma-admin">
    <PageTitle
      icon="fa fa-graduation-cap"
      main="Configuração de turmas"
      sub="Edição de dados das turmas."
    />

    <b-card class="mt-3 mb-3">
      <b-form>
        <input id="turma-id" type="hidden" v-model="turma.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="turma-name">
              <b-form-input
                id="turma-name"
                type="text"
                v-model="turma.nome"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o nome da Turma"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Sala:" label-for="turma-sala">
              <b-form-input
                id="turma-sala"
                type="text"
                v-model="turma.sala"
                :readonly="mode === 'remove'"
                placeholder="Informe o nome da Sala"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-form-group v-if="mode === 'save'" label="Escolha o representante: " label-for="turma-representante">
            <b-form-select
              id="turma.representante"
              :options="usuarios" v-model="turma.representante" />
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group label="Turno" v-show="mode === 'save'">
            <b-form-radio
              v-model="turma.turno"
              name="turma-turno"
              value="M"
              >Matutino</b-form-radio>
            <b-form-radio
              v-model="turma.turno"
              name="turma-turno"
              value="V"
              >Vespertino</b-form-radio>
            <b-form-radio
              v-model="turma.turno"
              name="turma-turno"
              value="N"
              >Noturno</b-form-radio>
          </b-form-group>
        </b-row>
        <b-button variant="primary" v-if="mode === 'save'" @click="save"
          >Salvar</b-button
        >
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
          >Excluir</b-button
        >
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
    </b-card>

    <b-table hover striped :items="turmas" :fields="fields"> 
        <template v-slot:cell(actions)='data'>
            <b-button variant="warning" @click="loadTurma(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadTurma(data.item, 'remove')">
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
  name: "TurmaAdmin",
  components: {
    PageTitle,
  },
  data: function () {
    return {
      mode: "save",
      turma: {},
      turmas: [],
      usuarios: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "Representante", label: "Representante", sortable: true },
        { key: "turno", label: "Turno", sortable: true },
        { key: "sala", label: "Sala", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadTurmas() {
      const url = `${baseApiUrl}/turmas`;
      axios.get(url).then((res) => {
        this.turmas = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.turma = {}), this.loadTurmas();
    },
    save() {
      console.log(this.turma);
      const method = this.turma.id ? "put" : "post";
      const id = this.turma.id ? `/${this.turma.id}` : "";
      axios[method](`${baseApiUrl}/turmas${id}`, this.turma)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.turma.id;
      axios
        .delete(`${baseApiUrl}/turmas/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTurma(turma, mode = 'save') {
      this.mode = mode
      this.turma = { ...turma }
    },
    loadUsuarios(){
      const url = `${baseApiUrl}/usuarios/representantes`
      axios.get(url).then(res => {
        this.usuarios = res.data.map(usuario =>{
          return {value: usuario.id, text: `${usuario.nome} - ${usuario.email}` }
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
  },
};
</script>

<style>
</style>