<template>
    <div class="druglist">
        <template>
          <b-table striped :items="drugs" :fields="fields" :hover="hover" @row-clicked="rowClicked"></b-table>
        </template>
    </div>
</template>

<script>
export default {
  name: 'druglist',
  props: ['drugs'],
  data () {
    return {
      fields: {
        Name: {
          label: 'Nome',
          sortable: true
        },
        ConterIndications: {
          label: 'Contra Indicações',
          sortable: true
        }
      }
    }
  },
  methods: {
    rowClicked (record, index) {
      const drugid = record.Id
      this.$router.push({ name: 'Drug', params: { id: drugid } })
    }
  }
}
</script>