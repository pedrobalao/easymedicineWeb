<template>
    <div class="variable">
      <b-input-group size="sm" :prepend="description" :append="unit">
        <b-form-input v-model="value" v-on:change="$emit('valuechanged', id, $event.target.value)" />
      </b-input-group>
    </div>
</template>

<script>

export default {
  name: 'variable',
  props: ['variable'],
  events: ['valuechanged'],
  data () {
    return {
      id: this.variable.Id,
      description: this.variable.Description,
      unit: this.variable.IdUnit,
      type: this.variable.Type,
      value: ''
    }
  },
  watch: {
    value: function (val, oldVal) {
      // alert('Fired! ' + val)
      this.$emit('valuechanged', this.id, val)
    }
  }
}
</script>
        