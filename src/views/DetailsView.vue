<template>
  <div
    v-if="!film.title"
    class="h-100 w-100 d-flex align-items-center justify-content-center"
  >
    {{ message }}
  </div>
  <div v-else class="h-100 position-relative">
    <!-- Header -->
    <div
      class="w-100 bg-info d-flex justify-content-between align-items-center p-1 pl-md-5 pr-md-5 shadow"
      style="position: sticky; top: 0; left: 0; z-index: 50"
    >
      <div class="text-white">
        <h5>{{ film.title }}</h5>
        <h6 class="font-weight-normal">{{ film.original_title_romanised }}</h6>
      </div>
      <div>
        <button class="btn btn-outline-light" @click="$router.go(-1)">
          Back
        </button>
      </div>
    </div>
    <!-- Content -->
    <div class="container">
      <div class="p-3 overflow-hidden row">
        <!-- Movie Banner -->
        <div
          class="mt-3 pl-5 pr-5 position-relative d-flex flex-column align-items-center col-12 col-md-4"
        >
          <!-- View Detail Btn -->
          <div class="position-absolute d-md-none" style="top: -5%">
            <transition name="fade">
              <button
                v-if="film.image"
                class="btn btn-sm btn-light ml-auto shadow"
                @click="viewDetails"
              >
                View Details &#8642;
              </button>
            </transition>
          </div>
          <!-- Image -->
          <img
            ref="mov_img"
            class="w-100 shadow"
            :src="film.image"
            :alt="film.image"
          />
        </div>

        <div class="mt-5 mt-md-3 pt-2 pt-md-4 border-top col">
          <div class="row mt-1">
            <!-- Japanese -->
            <DetailItem
              label="Japanese Title"
              :value="film.original_title"
              class="col-6"
            ></DetailItem>
            <!-- Release Date -->
            <DetailItem
              label="Release Date"
              :value="film.release_date"
              class="col-6"
            ></DetailItem>
          </div>

          <div class="row mt-1">
            <!-- Producer -->
            <DetailItem
              label="Produced By"
              :value="film.producer"
              class="col-6"
            ></DetailItem>

            <!-- Director -->
            <DetailItem
              label="Directed By"
              :value="film.director"
              class="col-6"
            ></DetailItem>
          </div>

          <!-- Director -->
          <DetailItem label="Description" :value="film.description"></DetailItem>

          <div class="mt-4">
            <button
              class="d-block m-auto btn btn-sm text-info border-0 p-0 pl-1 pr-1"
              @click="viewBanner = !viewBanner"
            >
              {{ viewBanner ? "Hide" : "View" }} Banner
            </button>
            <transition name="fade">
              <img
                v-if="viewBanner"
                class="shadow w-100"
                :src="film.movie_banner"
                :alt="film.image"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ghibli from "@/api/GhibliFilms";
import DetailItem from "@/components/DetailItem.vue";
export default {
  components: { DetailItem },
  name: "DetailsView",
  data() {
    return {
      film: {},
      viewBanner: false,
      message: "Loading...",
    };
  },

  methods: {
    viewDetails() {
      let img = this.$refs.mov_img;
      window.scrollTo(0, img.scrollHeight);
    },
  },
  async mounted() {
    let id = this.$route.params.id;
    if (id) {
      this.film = await Ghibli.getFilm(id);
      if (this.film.title) {
        {
          this.message = "No Date to show";
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
