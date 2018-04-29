<template>
    <div class="drug">
        <spinner :loading="isLoading" />
        <h1>{{ drug.Name }}</h1>
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
        axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid + '/indications')
      ])
        .then(
          axios.spread(
            function (drugbasics, drugindications) {
              debugger
              that.drug = drugbasics.data[0]
              that.drugindications = drugindications.data
            }
          ))
      /* axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid)
        .then(response => {
          // JSON responses are automatically parsed.
          this.drug = response.data[0]
          debugger
          this.isLoading = false
        })
        .catch(e => {
          debugger
          this.errors.push(e)
          this.isLoading = false
        }) */
    }
  }
}
</script>