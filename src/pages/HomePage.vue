<template>
  <section v-if="accountId" class="row justify-content-center text-center mt-2">
    <!-- <div class="col-4"> -->
      <!-- <button class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#createForm" aria-expanded="false" aria-controls="createForm">Toggle Create Post Form</button>
    </div> -->
    <div class="collapse col-12" id="createForm">
      <form @submit.prevent="createPost" class="row mt-3">
        <div class="col-12">
          <label for="post-imgUrl">ImgUrl</label>
          <input v-model="postData.imgUrl" type="url" id="post-imgUrl" class="form-control" placeholder="please use a valid image Url" maxlength="5000">
          <img :src="postData.imgUrl" class="img-fluid">
        </div>
        <div class="col-12">
          <label for="body">Post Message</label>
          <textarea v-model="postData.body" id="body" class="form-control" placeholder="please type your post message here" maxlength="1000"></textarea>
        </div>
        <div class="col-12 mb-3">
          <button class="btn btn-success">Post</button>
        </div>
      </form>
    </div>
  </section>
  <PostsList/>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState';
import PostsList from '../components/PostsList.vue';
import { logger } from '../utils/Logger';

export default {
  setup() {
    const postData = ref({})
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
      postData,
      accountId: computed(()=> AppState.account.id),

      async createPost(){
        try {
          await postsService.createPost(postData.value)
          Pop.success('Post created')
          postData.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { PostsList }
}
</script>

<style scoped lang="scss"></style>
