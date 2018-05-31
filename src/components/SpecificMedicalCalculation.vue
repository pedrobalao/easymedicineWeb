<template>
    <div class="drug">
       
        <h1 class="title">{{ medicalcalculation.Description }}</h1>
        <!-- <app-result v-for="res in results" :key="res.id" :unit="res.resultunit" :description="res.resultdescription"  :value="res.result"/>-->
        <div v-if="variables.length > 0">
          <p class="text-primary">Variáveis</p>
          <b-form >
            <b-form-group id="exampleGroup4">
              <variable v-for="variable in variables" :key="variable.Id" :variable="variable" v-on:valuechanged="valueChanged"/>
            </b-form-group>
            <b-button @click="onCalc" variant="primary">Calcular</b-button>
          </b-form>
        </div>
        <div class="result" >
          <b-jumbotron bg-variant="primary" text-variant="white" border-variant="primary">
            <template slot="header">
              {{resultvalue +' '+resultunit}}
            </template>
            <template slot="lead">
              {{medicalcalculation.Observation}}
            </template>
          </b-jumbotron>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SpecificMedicalCalculation',
  data () {
    debugger
    return {
      medcalcid: this.$route.params.id,
      medicalcalculation: {},
      variables: [],
      resultvalue: '',
      resultunit: '',
      result: {},
      isLoading: false,
      hasResults: false
    }
  },
  created () {
    this.getMedCalc()
    console.log('created')
  },
  methods: {
    valueChanged (id, value) {
      var that = this
      that.variables.find(item => item.Id === id).value = value
    },
    getMedCalc () {
      this.isLoading = true
      var that = this
      debugger
      axios.all([
        axios.get(process.env.API_BASE_URL + '/medicalcalculations/' + this.medcalcid),
        axios.get(process.env.API_BASE_URL + '/medicalcalculations/' + this.medcalcid + '/variables')
      ])
        .then(
          axios.spread(
            function (mcbasics, mcvariables) {
              debugger
              that.medicalcalculation = mcbasics.data[0]
              that.variables = mcvariables.data

              that.variables.forEach(element => {
                debugger
                if (element.Type === 'LISTVALUES' && element.Values.length > 0) {
                  element.value = element.Values[0]
                } else {
                  element.value = ''
                }
              })
            }
          ))
    },
    onCalc () {
      var that = this
      let fillComplete = true
      let vars = {}
      debugger
      that.variables.forEach(element => {
        vars[element.Id] = element.value
        if (element.value === '') {
          fillComplete = false
        }
      })
      if (fillComplete) {
        axios.get(process.env.API_BASE_URL + '/medicalcalculations/' + this.medcalcid + '/calculation?data=' + JSON.stringify(vars))
          .then(response => {
            debugger
            that.result = response.data
            that.resultvalue = that.result.result
            that.resultunit = that.result.resultunit
            that.hasResults = true
            // that.results = response.data
          })
          .catch(e => {
            debugger
            alert('Erro ao calcular dose')
            that.errors.push(e)
            that.isLoading = false
          })
      } else {
        alert('Preencha todas variáveis para efetuar o cálculo!')
      }
    }
  }
}
</script>
<style>
.result {
  padding: 10px
}
</style>
