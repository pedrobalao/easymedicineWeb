<template>
    <div class="result">
        <p>Resultado</p>
        <p>{{description}} {{value}} {{unit}}</p>
    </div>
</template>

<script>

export default {
  name: 'result',
  props: ['description', 'unit', 'value'],
  data () {
    return {
      description: this.description,
      unit: this.unit,
      value: this.value
    }
  }
}
</script>