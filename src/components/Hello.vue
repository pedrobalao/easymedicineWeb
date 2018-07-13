<template>
<div>
  <!--<div class="search">
      <div class="searchdiv">
        <b-form @submit.prevent="onSubmit"> 
          <div>
            <b-form-input variant="success" type="text" class="searchinput" placeholder="Principio Ativo, Indicação..." v-model="searchstr" @keyup.enter.native="search"/>
          </div>
          <div class="searchbutton">
            <b-button variant="success"  v-on:click="search">Pesquisar</b-button>
          </div>
        </b-form>
      </div>
  </div>-->
  <hello-carousel />
  <blockquote class="blockquote text-center pt-5">
    <p class="mb-0">"Muito simples e prático, extremamente útil na prática diária!"</p>
    <footer class="blockquote-footer">Dr. Andre Tome</footer>
  </blockquote>

  <blockquote class="blockquote text-center">
    <p class="mb-0">"Adeus livrinho verde, olá easyPed"</p>
    <footer class="blockquote-footer">Dra. Paula Matos</footer>
  </blockquote>
  
  <div>
    <b-card-group deck class="cardgroup">
        <b-card border-variant="light">
          <div class="row h-100 justify-content-center align-items-center">
            <icon name="database" scale="5" class="text-success"></icon>
            <p class="card-text text-center text-muted pt-4">
              Base de dados feita por médicos para médicos. Atualizada regularmente e com centenas de médicos a comprovarem a sua qualidade diariamente. 
            </p>
           </div>
        </b-card>
        <b-card  border-variant="light">
          <div class="row h-100 justify-content-center align-items-center">
            <icon name="calculator" scale="5"  class="text-success"></icon>
            <p class="card-text text-center text-muted pt-4">
              Calculos autmáticos de doses dos medicamentos mais usados apenas à distância de um click. Evite os erros e poupe tempo.
            </p>
          </div>
        </b-card>
        <b-card  border-variant="light">
          <div class="row h-100 justify-content-center align-items-center">
            <icon name="chart-line" scale="5"  class="text-success"></icon>
            <p class="card-text text-center text-muted pt-4">
              Evite os calculos médicos complexos e repetitivos, a easyPed disponibiliza-lhe um conjunto de calculadoras que lhe permitem um maior foco no doente e menos em tarefas acessórias. 
            </p>
          </div>
        </b-card>
    </b-card-group>
  </div>

<!--
  <b-container>
    <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="7"><b-form-input type="text" placeholder="Medicamento, Principio Ativo, Indicação..." v-model="searchstr" @keyup.enter.native="search"/></b-col>
        <b-col cols="3"><b-button  variant="success"  v-on:click="search">Pesquisar</b-button></b-col>
        <b-col cols="1"></b-col>
    </b-row>
  </b-container>
-->
  
  
</div>  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'hello',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  data () {
    return {
      searchstr: ''
    }
  },
  methods: {
    search: function (event) {
      if (this.searchstr) {
        this.$router.push({ name: 'Search', query: { searchstr: this.searchstr } })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchdiv {
  width: 90%;
  padding: 20px;
  resize: both;
  overflow: auto;
}

.searchbutton{
  align-items: center;
  padding-top: 5px;
}

.cardgroup {
  padding: 20px;
}

img {
    max-width: 100%;
    height: auto;
}

</style>
