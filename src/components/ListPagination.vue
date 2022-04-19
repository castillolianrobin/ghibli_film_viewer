<template>
  <div class="bg-white fixed-bottom top-0 row p-3 align-items-center border-top">
    <h6 class="col-6 text-center text-md-left text-secondary m-0">
      Displaying {{ (value * 4) - 3 }} - {{ (isLast ? length : value * 4) }} out of {{ length }}
    </h6>
    <button
      class="m-2 col btn btn-info"
      :disabled="isFirst"
      @click="prevPage"
    >
      Previous
    </button>
    <button
      class="m-2 col btn btn-info"
      :disabled="isLast"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'ListPagination',

  props: {
    value: { type: Number, default: 1 },
    length: { type: Number, default: 1 },
  },

  computed: {
    totalFilms() { return this.films.length; },
    isLast() {
      return !(this.value * 4 < this.length);
    },
    isFirst() {
      return !(this.value * 4 - 4 > 0);
    },
  },

  methods: {
    nextPage() {
      if (!this.isLast) {
        this.$emit('input', this.value + 1);
        window.scrollTo(0,100);
      } 
    },
    prevPage() {
      if (!this.isFirst) {
        this.$emit('input', this.value - 1);
        window.scrollTo(0,100); 
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>