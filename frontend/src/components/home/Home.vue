<template>
    <div class="home">
        <div>
            <PageTitle icon="fa fa-home" main="Início" sub="Bem vindo" />
            <div id="map">
                <b-container >
                    <b-row>
                    <b-col sm="9"><h3>Mapas do IFB</h3></b-col>
                    <b-col sm="3">
                        <b-card class="selected">
                        <b-form-select v-model="selected" :options="options"></b-form-select>
                        </b-card>
                    </b-col>
                    </b-row>
                </b-container>
                <MapaTerreo v-if="selected===null"/>
                <Mapa1Andar v-if="selected===1"/>
                <Mapa2Andar v-if="selected===2"/>
            </div>
        </div>
        
            
        
    </div>
    
</template>

<script>
import PageTitle from '../template/PageTitle';
import MapaTerreo from "../home/Mapa/MapaTerreo.vue";
import Mapa1Andar from "../home/Mapa/Mapa1Andar.vue";
import Mapa2Andar from "../home/Mapa/Mapa2Andar.vue";

export default {
    
    name: 'Home',
    components: {
        PageTitle,
        MapaTerreo,
        Mapa1Andar,
        Mapa2Andar,
    },
    data: function () {
    return {
      selected: null,
      cart: {},
      options: [
        { value: null, text: 'Térreo'},
        { value: 1, text: '1º Andar'},
        { value: 2, text: '2º Andar'},
      ],
    };
  },
    
}
</script>

<style scoped>
    
</style>