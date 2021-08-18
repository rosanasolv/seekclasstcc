<template>
  <div>
    <PageTitle
      icon="fa fa-commenting"
      main="Notificações"
      sub="Todas as notificações"
    />
    <b-form>
      <b-row class="my-1">
        <b-col sm="4">
          <b-form-select
            class="mt-3"
            id="notificacao-turma"
            :options="turmas"
            v-model="selected"
          >
            <b-form-select-option :value="null"
              >Escolha uma turma para buscar</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col sm="2">
          <b-button
            variant="primary"
            class="btnBuscar"
            @click="loadNotificacoesByTurmas()"
            >Buscar</b-button
          >
        </b-col>
      </b-row>
    </b-form>

    <p v-for="(notificacao, index) in notificacoes" :key="index">
        <b-card-group deck v-if="notificacoes[index].postar==1">
          <b-card :title="notificacoes[index].assunto" header-tag="header" footer-tag="footer">
            <template #header>
              <h6 class="mb-0"><b>Remetente: </b>{{ notificacoes[index].Remetente }}</h6>
            </template>
            <b-row>
              <b-col sm="8">
                <b-card-text>
                  <b-card border-variant="success" bg-variant="light" text-variant="black">
                    <p><b>Conteúdo: </b></p>
                    <div class="notificacao-content">
                      <p v-html="notificacoes[index].conteudo"></p>
                      
                    </div>
                    Destinada a turma: {{ notificacoes[index].Turma }}
                  </b-card>
                </b-card-text>
              </b-col>
              <b-col sm="4">
                
              </b-col>
            </b-row><br/>
            <template #footer>
              <em><b>Criado em: </b>{{ notificacoes[index].createdAt }}</em>
            </template>
          </b-card>
      </b-card-group>
      
    </p>
  </div>
</template>
<script>
//import Turmas from "../home/Turmas";
import {mapState} from 'vuex'
import axios from "axios";
import { baseApiUrl /*showError*/ } from "@/global";
import PageTitle from "../template/PageTitle";
//import Notificacao from "../home/Notificacao"
export default {
  name: "Notificacoes",
  components: {
    PageTitle,
    //Notificacao
  },
  data: function () {
    return {
      notificacoes: [],
      turmas: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "assunto", label: "Assunto", sortable: true },
        { key: "Remetente", label: "Remetente", sortable: true },
        { key: "createdAt", label: "Criado em", sortable: true },
      ],
      selected: null,
      options: [{ value: null, text: "Escolha uma opção" }],
    };
  },
  computed: mapState(['notification']),
  methods: {
    loadNotificacoesByTurmas() {
      const url = `${baseApiUrl}/notificacoes/turmas/${this.selected}`;
      axios.get(url).then((res) => {
        res.data.sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        });
        this.notificacoes = res.data;
      });
    },
    reset() {
      this.loadNotificacoes(), this.loadTurmasSel();
    },
    loadNotificacoes() {
      const url = `${baseApiUrl}/notificacoes`;
      axios.get(url).then((res) => {
        res.data.sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        });
        if(res.data.length>=this.notification){
          this.$store.commit("setNotification", res.data.length-this.notification);
        }else{
          this.$store.commit("setNotification", 0);
        }
        
        console.log(this.notification)
        this.notificacoes = res.data;
      });
    },

    buscar() {},
    loadTurmasSel() {
      const url = `${baseApiUrl}/turmas`;
      axios.get(url).then((res) => {
        this.turmas = res.data.map((turma) => {
          return { value: turma.id, text: `${turma.nome}` };
        });
      });
    },
    loadTurmas() {
      for (var i of this.notificacoes) {
        console.log(i.assunto);
        axios
          .get(`${baseApiUrl}/notificacoes/assunto/${i.assunto}`)
          .then((res) => {
            this.abc = res.data;
            console.log(this.abc);
            return this.abc;
          });
      }
    },
  },
  mounted() {
    this.loadNotificacoes();
    this.loadTurmasSel();
  },
};
</script>
<style scoped>
.notificacao-content {
  background-color: white;
  border-radius: 8px;
  padding: 25px;
}
.notificacao-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
}
.notificacao-content img {
  max-width: 100%;
}
.notificacao-content :last-child {
  margin-bottom: 0px;
}
.btnBuscar{
  margin-top: 15px;
  
}
</style>