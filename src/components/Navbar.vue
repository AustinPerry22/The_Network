<template>
  <nav class="container-fluid">
    <section class="row justify-content-between">
      <router-link class="col-3" :to="{ name: 'Home' }">
          <h2>The Network</h2>
      </router-link>
        <form @submit.prevent="searchPosts" class="col-4">
          <section class="row">
           <label for="search" class="col-4 text-end">Find Posts</label>
           <input v-model="postData.search" type="text" id="search" class="col-6" maxlength="25" placeholder="search here">
           <button class="btn btn-dark col-2"></button>
          </section>
       </form>
     
    </section>
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
