<template>
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
        logger.log(AppState.posts)
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss"></style>
