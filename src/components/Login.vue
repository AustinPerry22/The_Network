<template>
  <section class="row justify-content-center text-light">
    <div class="loginCard text-center col-11">
      <div v-if="!user.isAuthenticated" class="row">
        <h2>Please log in</h2>
        <p class="fw-3">logging in allows you to post and like other peoples posts</p>
        <div>
          <button @click="login" class="btn btn-light">login/sign up</button>
        </div>
      </div>
      <div v-else class="row">
        <div v-if="(account.picture || user.picture) && account.id && account.name" class="col-12">
          <section class="row justify-content-center">
            <h6 class="col-12">{{ account.name }}</h6>
            <router-link :to="{ name: 'Profile', params: { profileId: account.id } }" class="col-12">
              <img :src="account.picture || user.picture" alt="account photo" height="100" class="rounded-circle" />
            </router-link>
            <router-link :to="{ name: 'Account' }" class="my-2">
              <button class="btn btn-warning p-1">edit account</button>
            </router-link>
            <div>
              <button @click="logout" class="btn btn-danger p-1">logout</button>
            </div>
          </section>
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
.loginCard {
  background: #1f2e47;
  border-radius: .5em;
  padding: .5em;
}

img {
  width: 75%;
}
</style>
