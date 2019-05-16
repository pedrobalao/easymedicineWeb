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
            <p class="text-danger" size="sm" v-if="errorvars">{{errorvars}}</p>
            <!--<b-button @click="onCalc" variant="primary">Calcular</b-button>-->
          </b-form>
        </div>
        <div class="result" >
          <app-result v-if="resultvalue" :value="resultvalue +' '+ (resultunit == 'NA' ? '' : resultunit)" :observation="medicalcalculation.Observation" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SpecificMedicalCalculation',
  data () {
    return {
      errorvars: '',
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
      if (value) {
        this.onCalc()
      } else {
        this.results = []
      }
    },
    getMedCalc () {
      this.isLoading = true
      var that = this
      axios.all([
        global.http.get(process.env.API_BASE_URL + '/medicalcalculations/' + this.medcalcid),
        global.http.get(process.env.API_BASE_URL + '/medicalcalculations/' + this.medcalcid + '/variables')
      ])
        .then(
          axios.spread(
            function (mcbasics, mcvariables) {
              that.medicalcalculation = mcbasics.data[0]
              that.variables = mcvariables.data

              that.variables.forEach(element => {
                if (element.Type === 'LISTVALUES' && element.Values.length > 0) {
                  element.value = element.Values[0].Value
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
      that.variables.forEach(element => {
        vars[element.Id] = element.value
        if (element.value === '') {
          fillComplete = false
        }
      })
      if (fillComplete) {
        that.errorvars = ''
        axios.get(process.env.API_BASE_URL + '/medicalcalculations/' + this.medcalcid + '/calculation?data=' + JSON.stringify(vars))
          .then(response => {
            that.result = response.data
            that.resultvalue = that.result.result
            that.resultunit = that.result.resultunit
            that.hasResults = true
            // that.results = response.data
          })
          .catch(e => {
            alert('Erro ao calcular dose')
            that.errors.push(e)
            that.isLoading = false
          })
      } else {
        that.result = {}
        that.errorvars = 'Preencha todas as variáveis para efectuar o cálculo da dose.'
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
