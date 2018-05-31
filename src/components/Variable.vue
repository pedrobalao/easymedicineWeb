<template>
    <div class="variable">
      <b-input-group size="sm" v-if="type === 'NUMBER'" :prepend="description" :append="unit">
        <b-form-input type="number" v-model="value" v-on:change="$emit('valuechanged', id, value)" />
      </b-input-group>
      <b-input-group size="sm" v-if="type === 'LISTVALUES'" :prepend="description" :append="unit">
        <b-form-select v-model="value" :options="values"  size="sm"  v-on:change="$emit('valuechanged', id, value)" />
      </b-input-group>
    </div>
</template>

<script>

export default {
  name: 'variable',
  props: ['variable'],
  events: ['valuechanged'],
  data () {
    debugger
    let vals = []
    if (this.variable.Values) {
      this.variable.Values.forEach(element => {
        vals.push(element.Value)
      })
    }
    return {
      id: this.variable.Id,
      description: this.variable.Description,
      unit: (this.variable.IdUnit === 'NA' ? '' : this.variable.IdUnit),
      type: this.variable.Type,
      values: vals,
      value: (vals.length > 0 ? vals[0] : '')
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

<style>
.variable {
  padding: 5px
}
</style>
