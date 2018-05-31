<template>
    <div class="spinner">
          <pulse-loader :loading="loading" :color="loadingcolor" :size="loadingsize"></pulse-loader>
    </div>
</template>
<script>

export default {
  name: 'spinner',
  props: ['loading'],
  data () {
    return {
      loadingcolor: '#3AB982',
      loadingsize: '45px'
    }
  }
}
</script>