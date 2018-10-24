<template>
    <b-card border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      text-variant="success" 
      align="center" :header="description" :title="value" >
      <p class="card-text" v-if="observation">
        {{observation}}
      </p>
    </b-card>
</template>

<script>

export default {
  name: 'result',
  props: ['description', 'unit', 'value', 'observation'],
  data () {
    return {
    }
  }
}
</script>