<template>
    <div class="mapa-1-andar">
        <b-container>
        <b-row>
          <b-col sm="9">
            <b-card class="mapaandar">
              <img src="@/assets/1andar.png" alt="Mapa" />

              <img id="BlocoB1A" class="estados" alt="Bloco B 1º Andar"
              @load="posicionar('BlocoB1A', '3%', '82%')"
              @mouseover="algumacoisa(BlocoB1A, BlocoB1A.posicaoL, BlocoB1A.posicaoT, 'BlocoB1A')"
              @mouseout="limpar('BlocoB1A')"
              src="@/assets/local1.png"
              />
              <img id="BlocoC1A" class="estados" alt="Bloco C 1º Andar"
              @load="posicionar('BlocoC1A', '4%', '4%')"
              @mouseover="algumacoisa(BlocoC1A, BlocoC1A.posicaoL, BlocoC1A.posicaoT, 'BlocoC1A')"
              @mouseout="limpar('BlocoC1A')"
              src="@/assets/local1.png"
              />
              <img id="BlocoD1A" class="estados" alt="Bloco D 1º Andar"
              @load="posicionar('BlocoD1A', '52%', '4%')"
              @mouseover="algumacoisa(BlocoD1A, BlocoD1A.posicaoL, BlocoD1A.posicaoT, 'BlocoD1A')"
              @mouseout="limpar('BlocoD1A')"
              src="@/assets/local1.png"
              />
              <img id="BlocoA1A" class="estados" alt="Bloco A 1º Andar"
              @load="posicionar('BlocoA1A', '52%', '81%')"
              @mouseover="algumacoisa(BlocoA1A, BlocoA1A.posicaoL, BlocoA1A.posicaoT, 'BlocoA1A')"
              @mouseout="limpar('BlocoA1A')"
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
                <a class="linkEstados" @click="algumacoisa(BlocoA1A, BlocoA1A.posicaoL, BlocoA1A.posicaoT, 'BlocoA1A')" >Bloco A</a> <br/>
                <a class="linkEstados" @click="algumacoisa(BlocoB1A, BlocoB1A.posicaoL, BlocoB1A.posicaoT, 'BlocoB1A')" >Bloco B</a> <br/>
                <a class="linkEstados" @click="algumacoisa(BlocoC1A, BlocoC1A.posicaoL, BlocoC1A.posicaoT, 'BlocoC1A')" >Bloco C</a> <br/>
                <a class="linkEstados" @click="algumacoisa(BlocoD1A, BlocoD1A.posicaoL, BlocoD1A.posicaoT, 'BlocoD1A')" >Bloco D</a> <br/>
                
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="9">
            <b-card class="mapaandar">
              <center><h3>Salas do 1º andar</h3></center>
              <img src="@/assets/salas1andar.png" alt="Mapa" />
            </b-card>
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
           BlocoB1A: {
                Sala: "Bloco B 2º Andar",
                Caminho: "Acesso pelas escadas e rampas, em frente ao bloco C",
                posicaoL: "11%",
                posicaoT: "82%",
                sigla: "BlocoB1A"
            },
            BlocoC1A: {
                Sala: "Bloco C 2º Andar",
                Caminho: "Acesso pelas escadas e rampas, em frente ao bloco A",
                posicaoL: "11%",
                posicaoT: "8%",
                sigla: "BlocoC1A"
            },
            BlocoD1A: {
                Sala: "Bloco D 2º Andar",
                Caminho: "Acesso pelas escadas e rampas, em frente ao bloco A",
                posicaoL: "63%",
                posicaoT: "15%",
                sigla: "BlocoD1A"
            },
            BlocoA1A: {
                Sala: "Bloco A 2º Andar",
                Caminho: "Acesso pelas escadas e rampas, em frente ao bloco D",
                posicaoL: "60%",
                posicaoT: "58%",
                sigla: "BlocoA1A"
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
    height:150px; 
    width:35%;  
    display: none;
}
.linkEstados{
  font-size: 17px;
  color:rgb(62, 151, 62);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.mapaandar{
  margin-bottom: 10px;
}
</style>