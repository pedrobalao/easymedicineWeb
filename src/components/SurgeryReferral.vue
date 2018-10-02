<template>
    <div>
  <!--<b-collapse v-for="item in items" :key="item.Scope" :id="item.Scope" class="mt-2">
    <b-card>
      <p class="card-text">{item.Scope}</p>
      <b-btn v-b-toggle.collapse1_inner size="sm">Toggle Inner Collapse</b-btn>
      <b-collapse id=collapse1_inner class="mt-2">
        <b-card>{item.Scope}</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>-->
        <b-list-group>
            <b-list-group-item v-for="item in items" :key="item.Scope"  v-b-toggle="item.Scope" action>
                <p class="card-text">{{item.Scope}}</p>
                <b-collapse :id="item.Scope" class="mt-2">
                    <b-card>
                        <p class="text-primary">Referenciação</p>
                        <p class="text-secondary" v-for="itemR in item.Referral" :key="itemR" >{{ itemR }}</p>
                        <p class="text-primary" v-if="item.Observations.length > 0" >Observações</p>
                        <p class="text-secondary" v-for="itemO in item.Observations" :key="itemO" >{{ itemO }}</p>
                    </b-card>
                </b-collapse>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'SurgeryReferral',
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
      this.loading = true
      global.http.get(process.env.API_BASE_URL + '/surgeryreferral')
        .then(response => {
          // JSON responses are automatically parsed.
          this.items = response.data.PediatricSurgeries.sort(
            function (a, b) {
              if (a.Scope < b.Scope) {
                return -1
              }
              if (a.Scope > b.Scope) {
                return 1
              }
              return 0
            }
          )
          console.log(this.items)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
