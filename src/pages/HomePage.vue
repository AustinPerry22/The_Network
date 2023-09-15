<template>
  <section class="row justify-content-between">
    <div class="col-3">
      <button @click="changePosts(previousUrl)" class="btn btn-light" :disabled="!previousUrl">Previous</button>
    </div>
    <div class="col-3">
      <button @click="changePosts(nextUrl)" class="btn btn-light" :disabled="!nextUrl">Next</button>
    </div>
  </section>
  <div v-for="post in posts" :key="post.id" class="row justify-content-center">
    <PostCard :post="post" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState';
import PostCard from '../components/PostCard.vue';
import { logger } from '../utils/Logger';

export default {
  setup() {
    onMounted(() => getPosts());
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      posts: computed(() => AppState.posts),
      nextUrl: computed(() => AppState.older),
      previousUrl: computed(() => AppState.newer),

      async changePosts(url) {
        try {
          await postsService.changePosts(url)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss"></style>
