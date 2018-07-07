<template>
<div>
  <div class="search">
      <div class="searchdiv">
        <b-form @submit.prevent="onSubmit"> 
          <div>
            <b-form-input variant="success" type="text" class="searchinput" placeholder="Principio Ativo, Indicação..." v-model="presearchstr" @keyup.enter.native="search"/>
          </div>
          <div class="searchbutton">
            <b-button variant="success"  v-on:click="search">Pesquisar</b-button>
          </div>
        </b-form>
      </div>
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
  <hello-carousel />
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

img {
    max-width: 100%;
    height: auto;
}

</style>
