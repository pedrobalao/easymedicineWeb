<template>
    <div class="search">
        <div class="loading" v-if="isLoading">
          <spinner :loading="isLoading" />
        </div>
        <druglist :drugs="drugs"></druglist>
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
      axios.get(process.env.API_BASE_URL + '/drugs/?calculation=true')
        .then(response => {
          // JSON responses are automatically parsed.
          this.drugs = response.data
          this.isLoading = false
        })
        .catch(e => {
          debugger
          this.errors.push(e)
          this.isLoading = false
        })
    }
  }
}
</script>
