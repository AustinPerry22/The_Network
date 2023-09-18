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
  <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#edit-account">edit account</button>
  <form @submit.prevent="editAccount" class="row mt-3 collapse" id="edit-account">
        <label for="name">Name:</label>
        <input v-model="accountData.name" type="text" name="name" :placeholder="account.name" maxlength="100">
        <label for="class">Class</label>
        <input v-model="accountData.class" type="text" name="class" :placeholder="account.class" maxlength="100">
        <label for="github">Github</label>
        <input v-model="accountData.github" type="url" name="github" :placeholder="account.github" maxlength="200">
        <label for="linkedin">linkedin</label>
        <input v-model="accountData.linkedin" type="url" name="linkedin" :placeholder="account.linkedin" maxlength="200">
        <label for="resume">resume</label>
        <input v-model="accountData.resume" type="text" name="resume" :placeholder="account.resume" maxlength="100">
        <label for="bio">bio</label>
        <input v-model="accountData.bio" type="text" name="bio" :placeholder="account.bio" maxlength="2500">
        <label for="picture">picture</label>
        <input v-model="accountData.picture" type="text" name="picture" :placeholder="account.picture" maxlength="100">
        <label for="coverImg">coverImg</label>
        <input v-model="accountData.coverImg" type="text" name="coverImg" :placeholder="account.coverImg" maxlength="100">
        <button type="submit" class="btn btn-dark">submit</button>
  </form>
  
  <CreatePost/>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import CreatePost from '../components/createPost.vue';
import Pop from '../utils/Pop';
import { accountService } from '../services/AccountService';
import { logger } from '../utils/Logger';
export default {
    setup() {
        const accountData = ref({})

        watchEffect(()=>{
          AppState.account
          accountData.value = AppState.account
        })
        return {
            accountData,
            account: computed(() => AppState.account),
            coverImg: computed(()=> `url(${AppState.account.coverImg}`),


            async editAccount(){
              try {
                logger.log('edit account .vue'+ accountData.value)
                await accountService.editAccount(accountData.value)
                Pop.success('Account Updated')
                accountData.value = {}
              } catch (error) {
                Pop.error(error)
              }
            }
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
