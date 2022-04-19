<template>
  <div v-bind="$attrs" v-on="$listeners">
    <h6 class="mb-1 text-uppercase">{{ label }}</h6>
    <p class="text-justify">{{ value }}</p>
  </div>
</template>

<script>
  export default {
    name: 'DetailItem',

    props: {
      label: String,
      value: String,
    }
  }
</script>

<style lang="scss" scoped>

</style>