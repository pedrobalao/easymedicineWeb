<template>
  <div class="explore">
    <b-list-group>
        <b-list-group-item v-for="item in items" :key="item.Id"  v-on:click="clicked(item)" action>{{item.Description}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Categories',
  data () {
    return {
      loadingcolor: '#3AB982',
      loadingsize: '45px',
      loading: false,
      items: []
    }
  },
  created () {
    this.getData()
    console.log('created')
  },
  methods: {
    getData () {
      // debugger
      var that = this
      this.loading = true
      global.api.medicalcalculations()
        .then(response => {
          that.items = response.data
          this.loading = false
        }).catch(e => {
          this.errors.push(e)
          this.loading = false
        })
    },
    clicked (item) {
      this.$router.push({ name: 'SpecificMedicalCalculation', params: { id: item.Id } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
