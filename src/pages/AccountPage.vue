<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <CreatePost/>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import CreatePost from '../components/createPost.vue';
export default {
    setup() {
        return {
            account: computed(() => AppState.account)
        };
    },
    components: { CreatePost }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100px;
}
</style>
