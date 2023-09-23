<template>
  <createPost />
  <PostsList />
</template>

<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop';
import createPost from '../components/createPost.vue';
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState';
import PostsList from '../components/PostsList.vue';

export default {
  setup() {
    onMounted(() => getPosts())
    async function getPosts() {
      try {
        AppState.posts = []
        AppState.searchPosts = []
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
    };
  },
  components: { PostsList, createPost }
}
</script>

<style scoped lang="scss"></style>
