<template>
  <div class="h-100 pb-5">
    <!-- Banner -->
    <div class="mb-3">
      <div class="w-100 d-flex justify-content-between position-fixed">
        <img src="@/assets/icon-1.png" alt="Icon 1" height="75px" />
        <img src="@/assets/icon-2.png" alt="Icon 1" height="75px" />
      </div>
    </div>
    <img src="@/assets/banner-1.png" alt="Banner" height="75px" class="d-block m-auto" />

    <!-- Main Content -->
    <div class="mt-2 mt-md-4 container" style="z-index:60">
      <transition-group name="fade" mode="in-out" tag="div" class="row p-2 p-md-3" >
        <div
          v-for="(film, index) in currentFilms"
          :key="`film-${index}-${film.id}`"
          class="col col-12 col-md-6 mb-5"
        >
          <FilmCard :film="film" @click="viewDetails(film.id)"></FilmCard>
        </div>
      </transition-group>
    </div>

    <!-- Pagination -->
    <ListPagination v-model="currentPage" :length="totalFilms"></ListPagination>
  </div>
</template>

<script>
// 4 items per page that includes the image, banner, title with original title, description
import Ghibli from "@/api/GhibliFilms";
import FilmCard from '@/components/FilmCard.vue';
import ListPagination from '@/components/ListPagination.vue';
export default {
  components: { FilmCard, ListPagination },
  name: "ListView",
  data() {
    return {
      films: [],
      currentPage: 1,
    };
  },

  computed: {
    totalFilms() { return this.films.length; },
    currentFilms() {
      let start = (this.currentPage * 4) - 4;
      return this.films.slice(start, start + 4);
    },
  },

  methods: {
    viewDetails(id) {
      this.$router.push(`view/${id}`);
    },
  },

  async mounted() {
    this.films = await Ghibli.getFilms();
  },
};
</script>

<style>
.fade-move, .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
