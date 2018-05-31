<template>
  <div class="explore">
    <b-breadcrumb :items="links"/>
    <druglist :drugs="drugs"></druglist>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SubCategory',
  data () {
    return {
      loading: false,
      msg: '',
      drugs: [],
      category: null,
      subcategory: null,
      links: [{
        text: 'Explorar',
        to: { name: 'Categories' }
      }]
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
      var that = this
      this.loading = true
      var catid = this.$route.params.catid
      var idsubcat = this.$route.params.idsubcat
      let url = '/categories/' + catid + '/subcategories/' + idsubcat + '/drugs'
      axios.all([
        axios.get(process.env.API_BASE_URL + url),
        axios.get(process.env.API_BASE_URL + '/categories/' + catid),
        axios.get(process.env.API_BASE_URL + '/categories/' + catid + '/subcategories/' + idsubcat)
      ])
        .then(
          axios.spread(
            function (dg, cat, subcat) {
              that.category = cat.data[0]
              that.links.push({
                text: that.category.Description,
                to: { name: 'SpecificCategory', params: { catid: that.category.Id } }
              })
              that.subcategory = subcat.data[0]
              that.links.push({
                text: that.subcategory.Description,
                to: { name: 'SpecificSubCategory', params: { catid: that.category.Id, idsubcat: that.subcategory.Id } },
                active: true
              })
              that.drugs = dg.data
              that.loading = false
            }))
        .catch(e => {
          that.errors.push(e)
          that.loading = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
