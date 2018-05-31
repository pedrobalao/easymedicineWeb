<template>
    <div class="search">
        <h1>{{ searchstr }}</h1>
        <template>
          <pulse-loader :loading="isLoading" :color="loadingcolor" :size="loadingsize"></pulse-loader>
          <druglist :drugs="drugs"></druglist>
        </template>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'search',
  data () {
    return {
      loadingcolor: '#3AB982',
      loadingsize: '45px',
      isLoading: false,
      selected: null,
      hover: true,
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
  methods: {
    getData () {
      this.isLoading = true
      axios.get(process.env.API_BASE_URL + '/drugs/search?searchstr=' + this.searchstr)
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