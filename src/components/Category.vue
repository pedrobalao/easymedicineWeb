<template>
  <div class="explore">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <h1>{{ msg }}</h1>
    <b-list-group>
        <b-list-group-item v-for="cat in categories" :key="cat.Id"  v-on:click="clicked(cat)" action>{{cat.Description}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Categories',
  data () {
    return {
      loading: false,
      categories: []
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
      // debugger
      this.loading = true
      var catid = this.$route.params.catid
      let url = '/categories'
      if (catid) {
        url = url + '/' + catid + '/subcategories'
      }
      axios.get(process.env.API_BASE_URL + url)
        .then(response => {
          // JSON responses are automatically parsed.
          this.categories = response.data
          this.loading = false
        })
        .catch(e => {
          debugger
          this.errors.push(e)
          this.loading = false
        })
    },
    clicked (cat) {
      // debugger
      if (this.$route.params.catid) {
        this.$router.push({ path: cat.CategoryId + '/subcategories/' + cat.Id })
      } else {
        this.$router.push({ path: 'categories/' + cat.Id })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
