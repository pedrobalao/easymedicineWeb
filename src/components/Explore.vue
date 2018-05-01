<template>
  <div class="explore">
    <h1>{{ msg }}</h1>
    <b-card-group deck>
      <b-card v-for="cat in categories" :key="cat.Id" :header="cat.Description">
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'explore',
  data () {
    return {
      categories: []
    }
  },
  created () {
    this.getData()
    console.log('created')
  },
  methods: {
    getData () {
      this.isLoading = true
      axios.get(process.env.API_BASE_URL + '/categories')
        .then(response => {
          // JSON responses are automatically parsed.
          this.categories = response.data
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
