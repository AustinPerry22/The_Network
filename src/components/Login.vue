<template>
<section class="row">
  <div class="col-12">
    <div class="loginCard text-center">
      <div v-if="!user.isAuthenticated">
        <h2>Please log in</h2>
        <p class="fw-3">logging in allows you to post and like other peoples posts</p>
        <div>
          <button @click="login" class="btn btn-light">login/sign up</button>
        </div>
      </div>
      <div v-else>
        <div v-if="(account.picture || user.picture) && account.id">
          <router-link :to="{ name: 'Profile', params: { profileId: account.id } }">
            <img :src="account.picture || user.picture" alt="account photo" height="150" class="rounded-circle" />
          </router-link>
          <router-link :to="{ name: 'Account' }">
            <button class="btn btn-light">edit account</button>
          </router-link>
          <div>
            <button @click="logout" class="btn btn-light">logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loginCard{
  background: rgb(200, 255, 193);
  border-radius: 2em;
}
img{
  width: 75%;
}
</style>
