<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="primary" :sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-badge variant="danger">beta</b-badge>
      <b-navbar-brand to="/">{{brand}}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Inicio</b-nav-item>
          <b-nav-item to="/categories">Explorar</b-nav-item>
          <b-nav-item to="/doses">Doses</b-nav-item>
          <b-nav-item to="/medicalcalculations">Cálculos</b-nav-item>
          <!--<b-nav-item href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>-->
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Principio Ativo, Indicação..." v-model="searchstr" />
            <b-button size="sm" variant="success" class="my-2 my-sm-0" type="submit" v-on:click="search">Pesquisar</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view class="basic" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      searchstr: '',
      brand: 'easyPed',
      drugs: [],
      errors: []
    }
  },
  methods: {
    search: function (event) {
      if (this.searchstr) {
        console.log(this.searchstr)
        this.$router.push({ path: 'search', query: { searchstr: this.searchstr } })
      }
    }
  }
}
</script>

<style lang="scss">
  @import './assets/custom.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';

  .basic {
    padding: 10px;
  }
</style>
