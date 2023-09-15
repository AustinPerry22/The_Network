<template>
    <section class="row">
        <div class="col-12 text-center mt-4 cover-img">
            <img :src="profile.picture" class="profile-pic">
            <h2>{{ profile.name }}</h2>
            <section class="row">
                <div class="col-6">
                    <h4>email: {{ profile.email }}</h4>
                </div>
                <div class="col-6">
                    <h4>class: {{ profile.class }}</h4>
                </div>
            </section>
            <section class="row">
                <div class="col-6">
                    <h4>github: {{ profile.github }}</h4>
                </div>
                <div class="col-6">
                    <h4>linkedin: {{ profile.linkedin }}</h4>
                </div>
            </section>
            <section class="row">
                <div class="col-6">
                    <h4>resume: {{ profile.resume }}</h4>
                </div>
                <div class="col-6">
                    <h4>graduated: {{ profile.graduated }}</h4>
                </div>
            </section>
            <section class="row">
                <h5>Bio: {{ profile.bio }}</h5>
            </section>
        </div>
    </section>
    <div v-for="post in posts" :key="post.id" class="row justify-content-center">
        <PostCard :post="post" />
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { profileService } from '../services/ProfileService.js'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';

export default {

    setup() {
        onMounted(() => {
            getProfile()
            getPostsByProfile()
        })
        const route = useRoute();
        async function getProfile() {
            try {
                AppState.activeProfile = {}
                await profileService.getProfile(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getPostsByProfile() {
            try {
                logger.log('getting postst by profile')
                await postsService.getPostsByProfile(route.params.profileId)
                logger.log(AppState.posts)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            profile: computed(() => AppState.activeProfile),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg}`),
            posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard }
};
</script>


<style lang="scss" scoped>
.profile-pic {
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