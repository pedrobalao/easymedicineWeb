<template>
  <div class="page">
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
      
    <h1>{{ searchstr }}</h1>
    <template>
      <druglist :drugs="drugs"></druglist>
    </template>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'search',
  data () {
    return {
      isLoading: false,
      selected: null,
      hover: true,
      presearchstr: this.$route.query.searchstr,
      searchstr: this.$route.query.searchstr,
      drugs: [],
      fields: {
        Name: {
          label: 'Nome',
          sortable: true
        },
        ConterIndications: {
          label: 'Contra Indicações',
          sortable: true
        }
      }
    }
  },
  created () {
    this.getData()
    console.log('created')
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    search: function (event) {
      if (this.presearchstr) {
        this.$router.push({ name: 'Search', query: { searchstr: this.presearchstr } })
      }
    },
    getData () {
      this.isLoading = true
      this.searchstr = this.$route.query.searchstr
      this.presearchstr = this.searchstr
      global.http.get(process.env.API_BASE_URL + '/drugs/search?searchstr=' + this.searchstr)
        .then(response => {
          // JSON responses are automatically parsed.
          this.drugs = response.data
          this.isLoading = false
        })
        .catch(e => {
          this.errors.push(e)
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
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


</style>

