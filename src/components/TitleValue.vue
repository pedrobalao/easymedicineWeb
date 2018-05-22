<template>
    <div class="titlevalue">
        <h3>{{ title }}</h3>
        <p>{{ value }}</p>
    </div>
</template>

<script>

export default {
  name: 'titlevalue',
  props: ['title', 'value']
}
</script>