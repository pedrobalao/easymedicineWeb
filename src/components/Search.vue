<template>
    <div class="search">
        <h1>{{ searchstr }}</h1>
        <template>
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
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    getData () {
      this.isLoading = true
      this.searchstr = this.$route.query.searchstr
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
