<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h2>The Network</h2>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarText">
      <form @submit.prevent="searchPosts">
        <label for="search">Find Posts</label>
        <input v-model="postData.search" type="text" id="search" maxlength="25" placeholder="search here">
        <button class="btn btn-dark">search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    const route = useRoute()
    const postData = ref({})
    return {
      postData,
      accountId: computed(() => AppState.account.id),
      route,

      async searchPosts() {
        try {
          let res = null
          if (route.params.profileId) {
            res = await postsService.searchPosts(postData.value.search, route.params.profileId)
          } else {
            res = await postsService.searchPosts(postData.value.search)
          }
          if (res) {
            Pop.success(`found ${res} results with search of ${postData.value.search}`)
          } else {
            Pop.toast(`found no results for search term ${postData.value.search}`)
          }

          postData.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  },
}
</script>

<style scoped>
button {
  border-radius: 0rem .5rem .5rem 0rem;
}

input {
  border-radius: .5rem 0rem 0rem .5rem;
}
</style>
