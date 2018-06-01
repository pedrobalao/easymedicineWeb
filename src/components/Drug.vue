<template>
    <div>
        <div class="drug" v-if="drug != null">
            <h1 class="title">{{ drug.Name }}</h1>
            <!-- <app-result v-for="res in results" :key="res.id" :unit="res.resultunit" :description="res.resultdescription"  :value="res.result"/>-->
            <div class="dosecalc" v-if="variables.length > 0">
              <p class="text-primary" >Cálculo de Doses</p>
              <b-form class="formvars">
                <b-form-group id="drugVariables">
                  <variable v-for="variable in variables" :key="variable.Id" :variable="variable" v-on:valuechanged="valueChanged"/>
                </b-form-group>
                <p class="text-danger" size="sm" v-if="errorvars">{{errorvars}}</p>
                <!--<b-button @click="onCalc" variant="primary" class="btn">Calcular</b-button>-->
              </b-form>
              <b-card-group columns v-if="hasResults" class="resultgroup">
                <app-result v-if="hasResults"  v-for="res in results" :key="res.resultdescription" :description="res.resultdescription" :value="res.result" />
              </b-card-group>
              <!--<b-table striped :items="results" :hover="false" :fields="fieldsres" v-if="hasResults" />-->
            </div>
            <app-titlevalue v-if="drug.ConterIndications" v-bind:title="conterindicationslabel" :value="drug.ConterIndications" />
            <app-titlevalue v-if="drug.SecondaryEfects" v-bind:title="secondaryeffectslabel" :value="drug.SecondaryEfects" />
            <app-titlevalue v-if="drug.SecondaryEfects" v-bind:title="presentationlabel" :value="drug.Presentation" />
            <app-titlevalue v-if="drug.ComercialBrands" v-bind:title="comercialbrandslabel" :value="drug.ComercialBrands" />
            <app-titlevalue v-if="drug.Obs" v-bind:title="otherdatalabel" :value="drug.Obs" />
            <p class="text-primary">Indicações</p>
            <b-card-group columns >
              <b-card border-variant="primary"
                header-bg-variant="primary"
                header-text-variant="white"
                align="center" v-for="indication in drugindications" :key="indication.IndicationText" :header="indication.IndicationText">
                <b-table class="table-light" stacked :small="true" :items="indication.Doses" :fields="fields"></b-table>
              </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'drug',
  data () {
    console.log('data')
    return {
      errorvars: '',
      conterindicationslabel: 'Contra-Indicações',
      secondaryeffectslabel: 'Efeitos Secundários',
      presentationlabel: 'Apresentação',
      comercialbrandslabel: 'Marcas Comerciais',
      otherdatalabel: 'Outros Dados',
      isLoading: false,
      drugid: this.$route.params.id,
      drug: null,
      drugindications: [],
      variables: [],
      results: [],
      fields: {
        IdVia: {
          label: 'Via',
          sortable: false
        },
        PediatricDose: {
          label: 'Dose Pediátrica',
          sortable: false
        },
        AdultDose: {
          label: 'Dose Adulto',
          sortable: false
        },
        TakesPerDay: {
          label: 'Tomas',
          sortable: false
        },
        MaxDosePerDay: {
          label: 'Dose Máxima Diária',
          sortable: false
        },
        obs: {
          label: 'Observações',
          sortable: false
        }
      }
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
    onReset () {
      var that = this
      that.variables.forEach(element => {
        element.value = ''
      })
    },
    getDrug () {
      this.isLoading = true
      // var that = this
      // debugger
      axios.all([
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid),
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/indications'),
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/variables')
      ])
        .then(
          axios.spread(
            (drugbasics, drugindications, drugvariables) => {
              // debugger
              this.drug = drugbasics.data[0]
              this.drugindications = drugindications.data
              this.variables = drugvariables.data
              this.isLoading = false
              this.variables.forEach(element => {
                if (element.Type === 'LISTVALUES' && element.Values.length > 0) {
                  element.value = element.Values[0]
                } else {
                  element.value = ''
                }
              })
            }
          ))
    },
    valueChanged (id, value) {
      var that = this
      that.variables.find(item => item.Id === id).value = value
      this.onCalc()
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
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/calculation?data=' + JSON.stringify(vars))
          .then(response => {
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
            alert('Erro ao calcular dose')
            that.errors.push(e)
            that.isLoading = false
          })
      } else {
        that.results = []
        that.errorvars = 'Preencha todas as variáveis para efectuar o cálculo da dose.'
      }
    }
  }
}
</script>

<style>
.formvars{
  padding-bottom: 10px;
}
.btn{
  float:right;
}
</style>

