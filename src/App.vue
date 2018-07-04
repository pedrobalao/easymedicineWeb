<template>
  <div id="app">
    <cookie-law theme="blood-orange--rounded" message="O nosso website armazena cookies no seu equipamento que são utilizados para assegurar funcionalidades que lhe permitem uma melhor experiência de navegação e utilização. Ao prosseguir com a navegação está a consentir a sua utilização." buttonText="OK!"></cookie-law>
    <b-navbar toggleable="md" type="dark" variant="primary" :sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-badge variant="danger">beta</b-badge>
      <b-navbar-brand to="/">{{brand}}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Inicio</b-nav-item>
          <b-nav-item to="/categories">Explorar</b-nav-item>
          <b-nav-item to="/doses">Doses</b-nav-item>
          <b-nav-item to="/medicalcalculations" >Cálculos</b-nav-item>
          <b-nav-item to="/Favourites" v-show="isLogged">Favoritos</b-nav-item>
          <!--<b-nav-item href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>-->
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" >
          <b-nav-form >
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Principio Ativo, Indicação..." v-model="searchstr" @keyup.enter.native="search"/>
            <b-button size="sm" variant="success" class="my-2 my-sm-0" v-on:click="search">Pesquisar</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right v-if="user != null">
            <template slot="button-content">
              <b-img :src="user.photoURL" style="max-height: 30px;" fluid rounded="circle" />
            </template>
            <b-dropdown-item v-if="isLogged" @click="logout" class="text-danger"><font-awesome-icon icon="power-off" /> Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/auth" v-if="!isLogged">Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <loading-component v-show="isLoading"></loading-component>
    <router-view class="basic" v-show="!isLoading"/>
    <div>easyped &copy; {{ new Date().getFullYear() }}</div>
  </div>
</template>

<script>
import auth from '@/auth/auth'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      isLogged: 'isLogged',
      user: 'user'
    }),
    ...mapGetters('loading', {
      isLoading: 'isLoading'
    })
  },
  methods: {
    logout: function () {
      auth.logout(() => {
        location.reload()
      })
    },
    search: function (event) {
      if (this.searchstr) {
        this.$router.push({ name: 'Search', query: { searchstr: this.searchstr } })
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
