<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h2>The Network</h2>
      </div>
    </router-link>
    <button v-if="accountId && (route.name == 'Home' || route.name =='Account')" class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#createForm" aria-expanded="false" aria-controls="createForm">New Post</button>
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
      accountId: computed(()=> AppState.account.id),
      route,

      async searchPosts(){
        try {
          let res = null
          if(route.params.profileId){
            res = await postsService.searchPosts(postData.value.search, route.params.profileId)
          } else{
            res = await postsService.searchPosts(postData.value.search)
          }
          if(res){
            Pop.success(`found ${res} results with search of ${postData.value.search}`)
          } else{
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
