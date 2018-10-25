<template>
    <div class="druglist">
        <template>
          <b-table bordered :items="drugs" :fields="fields" hover @row-clicked="rowClicked"></b-table>
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
      },
      hover: false
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