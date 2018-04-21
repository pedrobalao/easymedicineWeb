<template>
    <div class="drug">
        <spinner :loading="isLoading" />
        <h1>{{ drug.Name }}</h1>
        <app-titlevalue v-bind:title="conterindicationslabel" :value="drug.ConterIndications" />
        <app-titlevalue v-bind:title="secondaryeffectslabel" :value="drug.SecondaryEfects" />
        <app-titlevalue v-bind:title="presentationlabel" :value="drug.Presentation" />
        <app-titlevalue v-bind:title="comercialbrandslabel" :value="drug.ComercialBrands" />
        <app-titlevalue v-bind:title="otherdatalabel" :value="drug.Obs" />
        
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
      drug: null
    }
  },
  created () {
    this.getDrug()
    console.log('created')
  },
  methods: {
    getDrug () {
      this.isLoading = true
      setTimeout(function () {
        console.log('Blah blah blah blah extra-blah')
      }, 10000)
      axios.get(process.env.API_BASE_URL + '/drugs/' + this.drugid)
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
        })
    }
  }
}
</script>