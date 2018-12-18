<template>
    <b-card border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      :text-variant="variant" 
      align="center" :header="description" :title="value" >
      <p class="card-text" v-if="observation"  >
        {{observation}}
      </p>
    </b-card>
</template>

<script>

export default {
  name: 'result',
  // props: ['description', 'unit', 'value', 'observation', 'variant'],
  props: {
    description: { type: String },
    unit: { type: String },
    value: { type: String },
    observation: { type: String },
    variant: {
      type: String,
      default: 'success'
    }
  },
  data () {
    return {
    }
  }
}
</script>