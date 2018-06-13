<template>
  <div class="explore">
    <b-breadcrumb :items="links"/>
    <b-list-group>
        <b-list-group-item v-for="cat in categories" :key="cat.Id"  v-on:click="clicked(cat)" action>{{cat.Description}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Categories',
  data () {
    return {
      loading: false,
      categories: [],
      links: [{
        text: 'Explorar',
        to: { name: 'Categories' }
      }],
      errors: []
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
      this.links = [{
        text: 'Explorar',
        to: { name: 'Categories' }
      }]
      if (catid) {
        url = url + '/' + catid + '/subcategories'
        global.http.get(process.env.API_BASE_URL + '/categories/' + catid)
          .then(response => {
            let category = response.data[0]
            this.links.push({
              text: category.Description,
              to: { name: 'SpecificCategory', params: { catid: category.Id } }
            })
          })
      }
      global.http.get(process.env.API_BASE_URL + url)
        .then(response => {
          this.categories = response.data
          this.loading = false
        })
        .catch(e => {
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
