<template>
    <!-- inside a row in a col-3 -->
    <div class="col-12">
        <a :href="link" target="_blank">
            <img :src="ad.sideImg" :alt="ad.title" class="img-fluid selectable">
        </a>
    </div>
</template>
<script>
import { Ad } from '../models/Ad';
export default {
    props: { ad: { type: Ad, required: true } },
    setup(props) {
        return {
            link: `https://${props.ad.linkURL}`

        }
    }
}
</script>
<style lang="scss" scoped>
img {
    height: 40vh;
    width: 100%;
}
</style>