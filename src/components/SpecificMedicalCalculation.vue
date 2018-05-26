<template>
    <div class="drug">
        <spinner :loading="isLoading" />
        <h1 class="title">{{ medicalcalculation.Description }}</h1>
        <!-- <app-result v-for="res in results" :key="res.id" :unit="res.resultunit" :description="res.resultdescription"  :value="res.result"/>-->
        <div v-if="variables.length > 0">
          <p class="text-primary">Variáveis</p>
          <b-form @submit="onCalc" @reset="onReset" >
            <b-form-group id="exampleGroup4">
              <variable v-for="variable in variables" :key="variable.Id" :variable="variable" v-on:valuechanged="valueChanged"/>
            </b-form-group>
            <b-button type="submit" variant="primary">Calcular</b-button>
          </b-form>
        </div>
        <app-titlevalue v-if="drug.Obs" title="Observações" :value="medicalcalculation.Observation" />
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'drug',
  data () {
    console.log('data')
    return {
      medicalcalculation: {},
      variables: [],
      results: [],
      isLoading: false
    }
  },
  computed: {
    // a computed getter
    hasResults: function () {
      // `this` points to the vm instance
      return this.results.length > 0
    }
  },
  created () {
    this.getDrug()
    console.log('created')
  },
  methods: {
    getDrug () {
      this.isLoading = true
      var that = this
      debugger
      axios.all([
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid),
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/indications'),
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/variables')
      ])
        .then(
          axios.spread(
            function (drugbasics, drugindications, drugvariables) {
              debugger
              that.drug = drugbasics.data[0]
              that.drugindications = drugindications.data
              that.variables = drugvariables.data

              that.variables.forEach(element => {
                element.value = ''
              })
            }
          ))
    },
    valueChanged (id, value) {
      var that = this
      that.variables.find(item => item.Id === id).value = value
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
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/calculation?data=' + JSON.stringify(vars))
          .then(response => {
            debugger
            that.results = []
            response.data.forEach(item => {
              that.results.push({
                resultdescription: item.resultdescription,
                result: item.result + ' ' + item.resultunit
              })
            })
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