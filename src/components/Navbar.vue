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
      </form>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import Login from './Login.vue';
import { ref } from 'vue';
export default {
  setup() {
    const postData = ref({})
    return {
      postData,

      async searchPosts(){
        try {
          await postsService.searchPosts(postData.value.search)
          postData.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
