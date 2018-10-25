<template>
  <div class="searchsection">      
      <div class="searchbar">
        <b-container fluid>
          <b-row class="my-1" >
            <div class="logo">easyPed</div>
          </b-row>
          <b-row class="my-1" >
            <b-col sm="10" class="paddingtop"><b-form-input 
                    type="text"
                    placeholder="" v-model="searchstr" @keyup.enter.native="search" ></b-form-input></b-col>
            <b-col sm="1" class="paddingtop"><b-button variant="success" v-on:click="search">Pesquisar</b-button></b-col>
          </b-row>
        </b-container>
      </div> 
  </div> 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
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
.searchsection {
  height: -webkit-fill-available;
  background-position: center;
  background-size: cover;
  font-size: 18px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 40px 60px;
  background-color: transparent!important;
  justify-content: space-around!important;
  background: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url("https://images.unsplash.com/photo-1489087584469-437d40177a45?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1f3b8a70a270394cd9004c37045cc308&auto=format&fit=crop&w=2100&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.center {
    margin: auto;
    width: 60%;
}

.searchbar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto auto;
  margin-top: 15%;
  width: 100%;
  }

.paddingtop
{
  padding-top: 10px;
}

.logo {
  text-align: center;
  margin: auto;
  font-size: 7vw;
  color:white;
}

</style>
