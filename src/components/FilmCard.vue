<template>
  <div
    class="card w-100 h-100 border shadow bg-white rounded overflow-hidden hover-overlay"
    v-on="$listeners"
  >
    <div class="p-3 bg-info text-white">
      <h5 class="m-0 font-weight-bold">{{ film.title }}</h5>
      <h6 class="m-0">({{ film.original_title_romanised }})</h6>
    </div>
    <div class="p-2 d-flex flex-column align-items-center">
      <div class="d-flex w-100">
        <div class="p-1 flex-shrink-0" style="width: 28.5%">
          <img class="w-100" :src="film.image" :alt="film.image" />
        </div>
        <div class="p-1 flex-shrink-1">
          <img
            class="w-100"
            :src="film.movie_banner"
            :alt="film.movie_banner"
          />
        </div>
      </div>
      <div class="pl-2 pr-2 flex-grow-1 flex-shrink-1">
        <p class="truncated-text mt-4 h-100 text-justify">
          {{ film.description.slice(0, 320)
          }}{{ film.description.length > 320 ? "..." : "" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmCard",

  props: { film: { type: Object, default: () => ({}) } },
};
</script>

<style lang="scss" scoped>
.card {
  transition: transform 0.1s filter 0.1s;
  cursor: pointer;
  &:hover {
    transform: scale(102%);
    filter: brightness(95%);
  }
}
</style>
