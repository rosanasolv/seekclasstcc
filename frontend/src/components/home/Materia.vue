<template>
    <div class="materia">
        <div class="box">
            <p><span class="perfil-nome"><b>Matéria:</b> {{nome}}</span>  </p>
            <p><span class="perfil-email"><b>Professor:</b> {{professor}}</span></p>
            <div class="perfil-link">
                <p><i class="fa fa-link"></i><a>{{link}}</a></p>
            </div>
        </div>
        
    </div>    
</template>
<script>
export default {
    name: 'Materia',
    props: 
        ['nome', 'professor', 'link', 'idProf']
    
    
}
</script>
<style scoped>
    .box{
        background-color: aqua;
        flex:1;
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 160px;
        font-size: 10px;
        align-items: flex-start;
        align-content: flex-start;
    }
    .materia{
        
        width: 250px;
    }
</style>