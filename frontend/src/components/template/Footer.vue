<template>
    <footer class="card-footer">
        <b-row>
            
                <span class="card-footer-item">SeekClass, Instituto Federal de Brasília - Campus Brasília, © 2021</span>
            
            <!--<b-col sm="3">
                <div class="redes">
                    <a href="https://www.linkedin.com/" target="_blank"><i class="fa fa-linkedin-square fa-2x"></i></a>
                    <a href="https://www.youtube.com/" target="_blank"><i class="fa fa-youtube-play fa-2x"></i></a>
                    <a href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook-square fa-2x"></i></a>
                    <a href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram fa-2x"></i></a>
                    <a href="https://twitter.com/?lang=en" target="_blank"><i class="fa fa-twitter-square fa-2x"></i></a>
                    <a><i class="fa fa-telegram fa-2x"></i></a>
                </div>
                
            </b-col>-->
        </b-row>
         
    </footer>  
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>
    footer{
        grid-area: footer;
        background-color: rgb(11, 78, 11);

        color: white;
        display: block;
        justify-content: center;
        align-items: flex-end;
    }
    .redes>a{
        padding-left: 10px;
        color:azure;
    }
    
    
</style>