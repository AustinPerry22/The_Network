<template>
    <section class="row">
        <div class="col-12 text-center img-text mt-4 cover-img">
            <img :src="profile.picture" class="profile-pic">
            <h2>{{ profile.name }}</h2>
            <section class="row">
                <div class="col-6">
                    <h4>class: {{ profile.class }}</h4>
                </div>
                <div class="col-6">
                    <h4 v-if="profile.graduated">Graduate</h4>
                    <h4 v-else>Hasn't graduated yet</h4>
                </div>
                <h4 class="col-12">email: {{ profile.email }}</h4>
                <h4 class="col-12">github: {{ profile.github }}</h4>
                <h4 class="col-12">linkedin: {{ profile.linkedin }}</h4>
                <h4 class="col-12">resume: {{ profile.resume }}</h4>
                <h5 class="col-12">Bio: {{ profile.bio }}</h5>
            </section>
        </div>
    </section>
    <div v-if="profile.id == accountId">
        <CreatePost />
    </div>
    <PostsList />
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { profileService } from '../services/ProfileService.js'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService.js';
import PostsList from '../components/PostsList.vue';
import CreatePost from '../components/createPost.vue';

export default {

    setup() {
        const route = useRoute();
        onMounted(() => {
            getProfile()
            getPostsByProfile()
        })

        watchEffect(() => {
            route.params.profileId
            getProfile()
            getPostsByProfile()
        })


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
                AppState.posts = []
                AppState.searchPosts = []
                await postsService.getPostsByProfile(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            profile: computed(() => AppState.activeProfile),
            accountId: computed(() => AppState.account.id),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg}`),
        };
    },
    components: { PostsList, CreatePost }
};
</script>


<style lang="scss" scoped>
.profile-pic {
    margin-block: 2vh;
    height: 25vh;
    width: 25vh;
    border-radius: 5rem;
}

.img-text {
    color: #d6d6d6;
    text-shadow: 2px 2px 1px black;
}

.cover-img {
    background-image: v-bind(coverImg);
    min-height: 50vh;
    background-position: center;
    background-size: cover;
}
</style>