<template>
  <section class="row">
        <div class="col-12 text-center mt-4 cover-img">
            <img :src="account.picture" class="account-pic">
            <h2>{{ account.name }}</h2>
            <section class="row">
                <div class="col-6">
                    <h4>email: {{ account.email }}</h4>
                </div>
                <div class="col-6">
                    <h4>class: {{ account.class }}</h4>
                </div>
            </section>
            <section class="row">
                <div class="col-6">
                    <h4>github: {{ account.github }}</h4>
                </div>
                <div class="col-6">
                    <h4>linkedin: {{ account.linkedin }}</h4>
                </div>
            </section>
            <section class="row">
                <div class="col-6">
                    <h4>resume: {{ account.resume }}</h4>
                </div>
                <div class="col-6">
                    <h4 v-if="account.graduated">Graduate</h4>
                    <h4 v-else>Hasn't graduated yet</h4>
                </div>
            </section>
            <section class="row">
                <h5>Bio: {{ account.bio }}</h5>
            </section>
        </div>
  </section>
  <form @submit.prevent="editAccount" class="row mt-3">
        <label for="">hello</label>
  </form>
  
  <CreatePost/>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import CreatePost from '../components/createPost.vue';
export default {
    setup() {
        const accountData = ref({})
        return {
            account: computed(() => AppState.account),
            coverImg: computed(()=> `url(${AppState.account.coverImg}`)
        };
    },
    components: { CreatePost }
}
</script>

<style lang="scss" scoped>
.account-pic {
    height: 8.5em;
    width: 8.5em;
    border-radius: 5em;
}

.cover-img {
    background-image: v-bind(coverImg);
    min-height: 50vh;
    background-position: center;
    background-size: cover;
}
</style>
