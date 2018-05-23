<template>
    <div class="titlevalue">
        <p class="text-primary">{{ title }}</p>
        <p class="text-secondary">{{ value }}</p>
    </div>
</template>

<script>

export default {
  name: 'titlevalue',
  props: ['title', 'value'],
  data () {
    return {
      title: this.title,
      value: this.value
    }
  }
}
</script>