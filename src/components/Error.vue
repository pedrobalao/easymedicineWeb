<template>
  <div class="container">
    <div v-if="error === '404'">
        <h1>Oops!! A página parece não existir!!</h1>
        <p>Talvez tenha escrito mal o endereço...</p>
        <!-- <div class="divcenter">
            <b-img class="w-50"  :src="require('../assets/404.jpg')" center  alt="Engenheiros" />
        </div> -->
    </div>
    <div v-else >
        <h1 >Oops!! Algo correu mal! {{error}} </h1>
        <p>Os nossos melhores engenheiros vão analisar e resolver o problema!!</p>
        <!-- <div class="divcenter">
            <b-img class="w-50"  :src="require('../assets/500.jpg')" center  alt="Engenheiros" />
            <b-link class="refimg" center href="https://www.freepik.com/free-vector/small-start-up-company_1311614.htm">Designed by Iconicbestiary</b-link>
        </div> -->
        
    </div>
    <div>
        <b-link href="/">Voltar ao início</b-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style>
.divcenter {
    text-align:center; 
}
.refimg {
    text-align:center; 
    font-size:xx-small;
}
</style>
