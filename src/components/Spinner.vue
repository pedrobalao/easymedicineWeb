<template>
    <div class="spinner">
        <template>
          <pulse-loader :loading="isLoading" :color="loadingcolor" :size="loadingsize"></pulse-loader>
        </template>
    </div>
</template>
<script>

export default {
  name: 'spinner',
  props: ['loading'],
  data () {
    return {
      loadingcolor: '#3AB982',
      loadingsize: '45px',
      isLoading: this.loading
    }
  }
}
</script>