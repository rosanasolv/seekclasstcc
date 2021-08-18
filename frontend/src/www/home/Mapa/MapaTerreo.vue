<template>
  <div class="mapa-terreo">
      <b-container>
          <b-row>
              <b-col col="9">
                <b-card class="mapaandar">
                    <img src="@/assets/terreoifb.png" alt="Mapa" />

                    <img id="Cantina" class="estados" alt="Cantina"
                    @load="posicionar('Cantina', '9%', '45%')"
                    @mouseover="algumacoisa(Cantina, Cantina.posicaoL, Cantina.posicaoT, 'Cantina')"
                    @mouseout="limpar('Cantina')"
                    src="@/assets/local1.png"
                    />
                    <img id="Biblioteca" class="estados" alt="Biblioteca"
                    @load="posicionar('Biblioteca', '53%', '43%')"
                    @mouseover="algumacoisa(Biblioteca, Biblioteca.posicaoL, Biblioteca.posicaoT, 'Biblioteca')"
                    @mouseout="limpar('Biblioteca')"
                    src="@/assets/local1.png"
                    />
                    <img id="Recepcao" class="estados" alt="Recepção"
                    @load="posicionar('Recepcao', '58%', '80%')"
                    @mouseover="algumacoisa(Recepcao, Recepcao.posicaoL, Recepcao.posicaoT, 'Recepcao')"
                    @mouseout="limpar('Recepcao')"
                    src="@/assets/local1.png"
                    />
                    <img id="Ginasio" class="estados" alt="Ginásio"
                    @load="posicionar('Ginasio', '10%', '10%')"
                    @mouseover="algumacoisa(Ginasio, Ginasio.posicaoL, Ginasio.posicaoT, 'Ginasio')"
                    @mouseout="limpar('Ginasio')"
                    src="@/assets/local1.png"
                    />
                    <img id="BanheirosT" class="estados" alt="Banheiros Térreo"
                    @load="posicionar('BanheirosT', '42%', '25%')"
                    @mouseover="algumacoisa(BanheirosT, BanheirosT.posicaoL, BanheirosT.posicaoT, 'BanheirosT')"
                    @mouseout="limpar('BanheirosT')"
                    src="@/assets/local1.png"
                    />
                    <img id="Armarios" class="estados" alt="Armários"
                    @load="posicionar('Armarios', '8%', '37%')"
                    @mouseover="algumacoisa(Armarios, Armarios.posicaoL, Armarios.posicaoT, 'Armarios')"
                    @mouseout="limpar('Armarios')"
                    src="@/assets/local1.png"
                    />
                    <img id="Entrada" class="estados" alt="Entrada"
                    @load="posicionar('Entrada', '39%', '91%')"
                    @mouseover="algumacoisa(Entrada, Entrada.posicaoL, Entrada.posicaoT, 'Entrada')"
                    @mouseout="limpar('Entrada')"
                    src="@/assets/local1.png"
                    />
                    <div id="descricao" class="notification is-link">
                        <button class="delete" @click="limpar(cart.sigla)"></button>
                        <p> {{ cart.Sala }}</p>
                        <p> {{ cart.Caminho }}</p>
                    </div>
                </b-card>
              </b-col>
              <b-col sm="3">
                  <b-card 
                    id="cardEstados"
                    title="Salas:"
                    tag="article"
                    style="max-width: 20rem"
                    class="mb-2"
                    >
                    <b-card-text>
                        <a class="linkEstados" @click="algumacoisa(Cantina, Cantina.posicaoL, Cantina.posicaoT, 'Cantina')" >Cantina</a> <br/>
                        <a class="linkEstados" @click="algumacoisa(Biblioteca, Biblioteca.posicaoL, Biblioteca.posicaoT, 'Biblioteca')" >Biblioteca</a> <br/>
                        <a class="linkEstados" @click="algumacoisa(Recepcao, Recepcao.posicaoL, Recepcao.posicaoT, 'Recepcao')" >Recepção</a> <br/>
                        <a class="linkEstados" @click="algumacoisa(Ginasio, Ginasio.posicaoL, Ginasio.posicaoT, 'Ginasio')" >Ginásio</a> <br/>
                        <a class="linkEstados" @click="algumacoisa(BanheirosT, BanheirosT.posicaoL, BanheirosT.posicaoT, 'BanheirosT')" >Banheiros Térreo</a> <br/>
                        <a class="linkEstados" @click="algumacoisa(Armarios, Armarios.posicaoL, Armarios.posicaoT, 'Armarios')" >Armários</a> <br/>
                        <a class="linkEstados" @click="algumacoisa(Entrada, Entrada.posicaoL, Entrada.posicaoT, 'Entrada')" >Entrada</a> <br/>
                    </b-card-text>
                  </b-card>
              </b-col>
          </b-row>
          <b-row>
              <b-col sm="9">

              </b-col>
              <b-col sm="3">

              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
    name: "MapaTerreo",
    data: function () {
        return {
            cart: {},
            Cantina: {
                Sala: "Cantina",
                Caminho: "Desça a \"Rampa Térro\" e vire a esquerda",
                posicaoL: "9%",
                posicaoT: "46%",
                sigla: "Cantina"
            },
            Biblioteca: {
                Sala: "Biblioteca",
                Caminho: "Desça a \"Rampa Térro\" e vire a direita",
                posicaoL: "54%",
                posicaoT: "30%",
                sigla: "Biblioteca"
            },
            Recepcao: {
                Sala: "Recepção",
                Caminho: "Após a entrada vire a direita",
                posicaoL: "59%",
                posicaoT: "67%",
                sigla: "Recepcao"
            },
            Ginasio: {
                Sala: "Ginásio",
                Caminho: "Desça a \"Rampa Térro\" e vire a esquerda, ao lado da biblioteca, siga pelo caminho de acesso.",
                posicaoL: "63%",
                posicaoT: "28%",
                sigla: "Ginasio"
            },
            BanheirosT: {
                Sala: "Banheiros Térreo",
                Caminho: "No pátio ao lado dos armários",
                posicaoL: "42%",
                posicaoT: "12%",
                sigla: "BanheirosT"
            },
            Armarios: {
                Sala: "Armários",
                Caminho: "Ao lado da cantina",
                posicaoL: "8%",
                posicaoT: "24%",
                sigla: "Armarios"
            },
            Entrada: {
                Sala: "Entrada/Saída",
                Caminho: "Você chegou!",
                posicaoL: "38%",
                posicaoT: "78%",
                sigla: "Entrada"
            },
        }
    },
    methods: {
    algumacoisa(a, b, c, d) {
      //console.log(a, b, c);
      this.cart = a;
      document.getElementById("descricao").style.display = "block";
      document.getElementById("descricao").style.left = b
      document.getElementById("descricao").style.top = c
      document.getElementById(d).style.width = "7%"
    },
    limpar(a) {
      this.cart = "";
      document.getElementById("descricao").style.display = "none";
      document.getElementById(a).style.width = "5%"
    },
    posicionar(a, b, c){
      document.getElementById(a).style.left = b;
      document.getElementById(a).style.top = c;
    }
  },
}
</script>

<style>
.estados {
  position: absolute;
  width: 5%;
}
#descricao{
    position:absolute; 
    height:200px; 
    width:40%;  
    display: none;
}
.linkEstados{
  font-size: 17px;
  color:rgb(62, 151, 62);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>