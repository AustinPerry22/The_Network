<template>
  home page
</template>

<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService.js'

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
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
