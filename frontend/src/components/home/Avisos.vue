<template>
  <div>
    <PageTitle icon="fa fa-envelope-open" main="Avisos" sub="Mandar avisos" />
    <b-card class="mt-3 mb-3">
      <b-form>
        <b-row>
          <b-form-group hidden
            label="Escolha um remetente: "
            label-for="notificacao-remetente"
          >
          <b-form-input
                id="notificacao-remetente"
                type="text"
                v-model="user.nome"
                required
                readonly
                
              />
          </b-form-group>
        </b-row>
        <b-col>
          <b-form-group label="Escolha as turmas">
            <b-checkbox-group
              id="notificacao-turmas"
              v-model="notificacao.turmas"
              :options="turmas"
            >
            </b-checkbox-group>
          </b-form-group>
        </b-col>
        <input id="notificacao-id" type="hidden" v-model="notificacao.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Assunto:" label-for="notificacao-assunto">
              <b-form-input
                id="notificacao-assunto"
                type="text"
                v-model="notificacao.assunto"
                required
                placeholder="Informe o assunto"
              />
            </b-form-group>
          </b-col>

          <b-form-group label="Conteúdo:" label-for="notificacao-conteudo">
            <VueEditor
              v-model="notificacao.conteudo"
              placeholder="Digite o conteúdo..."
            />
          </b-form-group>
        </b-row>
        <b-button variant="success" @click="save">Postar</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import {mapState} from 'vuex'
import { baseApiUrl, showError } from "@/global";
import PageTitle from "../template/PageTitle";
export default {
  name: "PerfilPage",
  components: {
    PageTitle,
    VueEditor,
  },
  computed: mapState(['user']),
  data: function () {
    return {
      usuarios: [],
      turmas: [],
      notificacao: {},
      notificacoes: [],
      encaminhamento: [],
    };
  },
  methods: {
    reset() {
      (this.notificacao = {}), this.loadTurmas, this.loadUsuarios;
    },
    save() {
      var turmas = this.notificacao.turmas;
      
      

      //this.notificacao.Remetente = this.user.nome
      this.notificacao.remetente = this.user.id
      //console.log(this.user.representante);
      //console.log(turmas);
      if(this.user.representante == 1 || this.user.tipoUsuario == 1 || this.user.admin == 1){
        console.log("Pode postar sem verificação");
        for (var i of turmas) {
          const url = `${baseApiUrl}/turmas/${i}`;
          console.log(i)
          axios.get(url).then((res) => {
            this.encaminhamento = res.data;
            //console.log(this.encaminhamento.nome)
             
            
          })
          
          
          this.notificacao.postar = true;
          this.notificacao.turmas = [i];
          var enc =+ i
          
          axios
            .post(`${baseApiUrl}/notificacoes`, this.notificacao)
              .then(() => {})
              .catch(showError);
        }
        
        console.log(enc)
        this.$toasted.global.defaultSuccess();
      }else{
        console.log("Passar pela verificação");
        for (var j of turmas) {
        //console.log(j);
        this.notificacao.turmas = [j];
        axios
          .post(`${baseApiUrl}/notificacoes`, this.notificacao)
          .then(() => {})
          .catch(showError);
        }
        this.$toasted.global.defaultSuccess();
      }
      this.reset();

      //console.log(this.notificacao)
      //const method = this.notificacao.id ? "put" : "post";
      //const id = this.disciplina.id ? `/${this.disciplina.id}` : "";
    },
    loadUsuarios() {
      const url = `${baseApiUrl}/usuarios/podePostar`;
      axios.get(url).then((res) => {
        this.usuarios = res.data.map((usuario) => {
          return {
            value: usuario.id,
            text: `${usuario.nome} - ${usuario.email}`,
          };
        });
      });
    },
    loadTurmas() {
      const url = `${baseApiUrl}/turmas`;
      axios.get(url).then((res) => {
        this.turmas = res.data.map((turma) => {
          return { value: turma.id, text: `${turma.nome}` };
        });
      });
    },
  },
  mounted() {
    this.loadUsuarios();
    this.loadTurmas();
  },
};
</script>
<style scoped>

</style>