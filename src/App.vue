<template>
  <main class="container-fluid">
    <section class="row">
      <div class="col-12">
        <section class="row sticky-top">
          <Navbar />
        </section>
        <section class="row">
          <div class="col-2 h-100 sticky-top-2">
            hello
          </div>
          <div class="col-8">
            <router-view />
          </div>
          <div class="col-2 sticky-top-2 h-100">
            <div v-for="ad in ads" :key="ad.id" class="row justify-content-center mb-4">
              <AdCard :ad="ad"/>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import AdCard from './components/AdCard.vue'
import {adsService} from './services/AdsService'
import Pop from './utils/Pop'
import { logger } from './utils/Logger'

export default {
  setup() {
    onMounted(()=> getAds())

    async function getAds(){
      try {
        logger.log('getting ads controller')
        await adsService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads)
    }
  },
  components: { Navbar, AdCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}
.sticky-top-2{
  position: sticky;
  top: 10vh;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
