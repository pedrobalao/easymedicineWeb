<template>
  <div class="explore">
    <div class="loading" v-if="loading">
      <pulse-loader :loading="loading" :color="loadingcolor" :size="loadingsize"></pulse-loader>
    </div>
    <b-list-group>
        <b-list-group-item v-for="item in items" :key="item.Id"  v-on:click="clicked(item)" action>{{item.Description}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

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
      axios.get(process.env.API_BASE_URL + '/medicalcalculations')
        .then(response => {
          that.items = response.data
          this.loading = false
        }).catch(e => {
          debugger
          this.errors.push(e)
          this.loading = false
        })
    },
    clicked (item) {
      // debugger
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
