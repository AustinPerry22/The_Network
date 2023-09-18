<template>
  <div class="container-fluid text-light">
    <form @submit.prevent="editAccount" class="row mt-3 justify-content-center">
      <div class="col-6">
        <label for="name">Name</label>
        <input v-model="accountData.name" type="text" name="name" class="w-100" maxlength="100">
        <label for="github">Github</label>
        <input v-model="accountData.github" type="url" name="github" class="w-100" maxlength="200">
        <label for="resume">resume</label>
        <input v-model="accountData.resume" type="text" name="resume" class="w-100" maxlength="100">
        <label for="coverImg">coverImg</label>
        <input v-model="accountData.coverImg" type="text" name="coverImg" class="w-100" maxlength="100">
      </div>
      <div class="col-6">
        <label for="class">Class</label>
        <input v-model="accountData.class" type="text" name="class" class="w-100" maxlength="100">
        <label for="linkedin">linkedin</label>
        <input v-model="accountData.linkedin" type="url" name="linkedin" class="w-100" maxlength="200">
        <label for="picture">picture</label>
        <input v-model="accountData.picture" type="text" name="picture" class="w-100" maxlength="100">
      </div>
      <div class="col-12">
        <label for="bio">bio</label>
        <textarea v-model="accountData.bio" type="text" name="bio" class="w-100" maxlength="2500"></textarea>
      </div>
      <button class="btn btn-success col-5 my-3">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import CreatePost from '../components/createPost.vue';
import Pop from '../utils/Pop';
import { accountService } from '../services/AccountService';
import { logger } from '../utils/Logger';
import { router } from '../router';
export default {
  setup() {
    const accountData = ref({})

    watchEffect(() => {
      AppState.account
      accountData.value = AppState.account
    })
    return {
      accountData,
      account: computed(() => AppState.account),
      coverImg: computed(() => `url(${AppState.account.coverImg}`),


      async editAccount() {
        try {

          await accountService.editAccount(accountData.value)
          Pop.success('Account Updated')
          accountData.value = {}
          router.push({ name: 'Profile', params: { profileId: AppState.account.id } })
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
form {
  border-style: dashed;
  border-width: .25em;
  border-color: #1f2e47;
}
</style>
