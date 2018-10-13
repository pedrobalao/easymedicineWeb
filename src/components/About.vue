<template>
<div>
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
              Base de dados de medicamentos feita por médicos para médicos. Atualizada regularmente e com centenas de médicos a comprovarem a sua qualidade diariamente. 
            </p>
           </div>
        </b-card>
        <b-card  border-variant="light">
          <div class="row h-100 justify-content-center align-items-center">
            <icon name="calculator" scale="5"  class="text-success"></icon>
            <p class="card-text text-center text-muted pt-4">
              Calculos automáticos de doses dos medicamentos mais usados apenas à distância de um click. Evite os erros e poupe tempo.
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
  <div>
   <b-card-group columns class="mb-3" >
        <b-card :title="author.name"  v-for="author in authors" :key="author.name">
            <p class="card-text">
                {{author.speciality}}
            </p>
        </b-card>
    </b-card-group>
  </div>
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
      authors: []
    }
  },
  created () {
    this.getAuthors()
  },
  methods: {
    getAuthors () {
      this.authors = [
        {name: 'Dr. Ruben Rocha', speciality: 'Pediatra'},
        {name: 'Dra. Ana Reis Melo', speciality: 'Interna de Pediatria'},
        {name: 'Dra. Claudia Teles Silva', speciality: 'Interna de Pediatria'},
        {name: 'Dr. João Sarmento', speciality: 'Interno de Cardiologia Pediátrica'},
        {name: 'Dra. Mariana Adrião', speciality: 'Interna de Pediatria'},
        {name: 'Dra. Marta Rosário ', speciality: 'Interna de Pediatria'},
        {name: 'Dr. Ruben Pinheiro', speciality: 'Cirurgião Pediátrico'},
        {name: 'Dra. Sofia Ferreira', speciality: 'Interna de Pediatria'},
        {name: 'Dra. Sónia Silva', speciality: 'Interna de Pediatria'}
      ]
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
