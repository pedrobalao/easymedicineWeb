<template>
    <div class="drug">
        <spinner :loading="isLoading" />
        <h1>{{ drug.Name }}</h1>
        <variable v-for="variable in variables" :key="variable.Id" :variable="variable" v-on:valuechanged="valueChanged"/>
        <app-titlevalue v-if="drug.ConterIndications" v-bind:title="conterindicationslabel" :value="drug.ConterIndications" />
        <app-titlevalue v-if="drug.SecondaryEfects" v-bind:title="secondaryeffectslabel" :value="drug.SecondaryEfects" />
        <app-titlevalue v-if="drug.SecondaryEfects" v-bind:title="presentationlabel" :value="drug.Presentation" />
        <app-titlevalue v-if="drug.ComercialBrands" v-bind:title="comercialbrandslabel" :value="drug.ComercialBrands" />
        <app-titlevalue v-if="drug.Obs" v-bind:title="otherdatalabel" :value="drug.Obs" />
        <h3>Indicações</h3>
        <b-card-group deck>
          <b-card v-for="indication in drugindications" :key="indication.IndicationText" :header="indication.IndicationText">
            <b-table stacked :items="indication.Doses" :fields="fields"></b-table>
          </b-card>
        </b-card-group>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'drug',
  data () {
    console.log('data')
    return {
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
      this.variables.find(p => p.Id === id).value = value
      let fillComplete = true
      let vars = {}
      debugger
      this.variables.forEach(element => {
        vars[element.Id] = element.value

        if (element.value === '') {
          fillComplete = false
        }
        // alert(element.Id + ' ' + element.value)
      })
      if (fillComplete) {
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/calculation?data=' + JSON.stringify(vars))
          .then(response => {
            debugger
            // JSON responses are automatically parsed.
            alert(response.data[0].result)
          })
          .catch(e => {
            debugger
            alert('Erro ao calcular dose')
            this.errors.push(e)
            this.isLoading = false
          })
      }
    }
  }
}
</script>