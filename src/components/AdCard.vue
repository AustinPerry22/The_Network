<template> 
<!-- inside a row in a col-3 -->
    <div class="col-12">
        <a :href="link" target="_blank">
            <img :src="ad.sideImg" :alt="ad.title" class="img-fluid selectable">
        </a>
    </div>
</template>
<script>
import { onMounted } from 'vue';
import { Ad } from '../models/Ad';
import { logger } from '../utils/Logger';
export default{
    props: {ad:{type: Ad, required: true}},
    setup(props){
        onMounted(()=>{
            logger.log(props.ad.linkURL, 'link')

        })
        return{
            link: `https://${props.ad.linkURL}`

        }
    }
}
</script>
<style lang="scss" scoped>
    img{
     height: 42.5vh;
     width: 100%;
    }
</style>