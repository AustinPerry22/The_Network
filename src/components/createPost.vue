<template>
  <section v-if="accountId" class="row justify-content-center text-center my-2">
    <button class="btn btn-outline-light rounded-5 col-1" type="button" data-bs-toggle="collapse"
      data-bs-target="#createForm" aria-expanded="false" aria-controls="createForm"><i
        class="mdi mdi-tooltip-plus"></i></button>
    <div class="collapse col-12 text-light" id="createForm">
      <form @submit.prevent="createPost" class="row justify-content-center mt-3">
        <div class="col-12">
          <label for="post-imgUrl">ImgUrl</label>
          <input v-model="postData.imgUrl" type="url" id="post-imgUrl" class="form-control"
            placeholder="please use a valid image Url" maxlength="5000">
          <img :src="postData.imgUrl" class="img-fluid">
        </div>
        <div class="col-12">
          <label for="body">Post Message</label>
          <textarea v-model="postData.body" id="body" class="form-control"
            placeholder="please type your post message here" maxlength="1000"></textarea>
        </div>
        <button class="btn btn-success col-5 my-3" data-bs-toggle="collapse" data-bs-target="#createForm">Create
          Post</button>
      </form>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
  setup() {
    const postData = ref({})

    return {
      postData,
      accountId: computed(() => AppState.account.id),
      async createPost() {
        try {
          await postsService.createPost(postData.value)
          Pop.success('Post created')
          postData.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  border-style: dashed;
  border-width: .25em;
  border-color: #1f2e47;
}
</style>