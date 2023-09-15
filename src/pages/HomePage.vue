<template>
  {{ posts }}
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState';

export default {
  setup() {
    onMounted(() => getPosts())

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss"></style>
