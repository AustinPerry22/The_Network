<template>
  <main class="container-fluid">
    <section class="row">
      <div class="col-2 align-self-center">
        <Login />
      </div>
      <div class="col-10">
        <section class="row">
          <Navbar />
        </section>
        <section class="row">
          <div class="col-9">
            <router-view />
          </div>
          <div class="col-3">
            ads component here
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
