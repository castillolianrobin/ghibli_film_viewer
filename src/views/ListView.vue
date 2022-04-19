<template>
  <div class="h-100 pb-5">
    <!-- Logo -->
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
    <div class="bg-white fixed-bottom top-0 row p-3 align-items-center border-top">
      <h6 class="col-6 text-center text-md-left text-secondary m-0">
        Displaying {{ (currentPage * 4) - 3 }} - {{ (isLast ? totalFilms : currentPage * 4) }} out of {{ totalFilms }}
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
  </div>
</template>

<script>
// 4 items per page that includes the image, banner, title with original title, description
import Ghibli from "@/api/GhibliFilms";
import FilmCard from '@/components/FilmCard.vue';
export default {
  components: { FilmCard },
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
    isLast() {
      return !(this.currentPage * 4 < this.totalFilms);
    },
    isFirst() {
      return !(this.currentPage * 4 - 4 > 0);
    },
  },

  methods: {
    viewDetails(id) {
      this.$router.push(`view/${id}`);
    },
    nextPage() {
      if (!this.isLast) {
        this.currentPage++;
        window.scrollTo(0,100); 
      } 
    },
    prevPage() {
      if (!this.isFirst) {
        this.currentPage--;
        window.scrollTo(0,100); 
      }
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
