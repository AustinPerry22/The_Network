<template>
    <div v-if="searchPosts.length > 0" class="container-fluid">
        <section class="row justify-content-center sticky-top-2">
            <button @click="clearSearch" class="btn btn-danger col-10">clear search</button>
        </section>
        <div v-for="post in searchPosts" :key="post.id" class="row justify-content-center">
            <PostCard :post="post" />
        </div>
    </div>

    <div v-else class="container-fluid">
        <section class="row justify-content-between">
            <div class="col-3">
                <button @click="changePosts(previousUrl)" class="btn btn-outline-light" :disabled="!previousUrl"><i
                        class="fw-bold fs-5 mdi mdi-arrow-left-bold"></i></button>
            </div>
            <div class="col-3 text-end">
                <button @click="changePosts(nextUrl)" class="btn btn-outline-light" :disabled="!nextUrl"><i
                        class="fw-bold fs-5 mdi mdi-arrow-right-bold"></i></button>
            </div>
        </section>
        <div v-for="post in posts" :key="post.id" class="row justify-content-center">
            <PostCard :post="post" />
        </div>
        <section class="row justify-content-between">
            <div class="col-3">
                <button @click="changePosts(previousUrl)" class="btn btn-outline-light" :disabled="!previousUrl"><i
                        class="fw-bold fs-5 mdi mdi-arrow-left-bold"></i></button>
            </div>
            <div class="col-3 text-end">
                <button @click="changePosts(nextUrl)" class="btn btn-outline-light" :disabled="!nextUrl"><i
                        class="fw-bold fs-5 mdi mdi-arrow-right-bold"></i></button>
            </div>
        </section>
    </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState'
import PostCard from './PostCard.vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
export default {
    setup() {
        return {
            posts: computed(() => AppState.posts),
            nextUrl: computed(() => AppState.older),
            previousUrl: computed(() => AppState.newer),
            searchPosts: computed(() => AppState.searchPosts),

            async changePosts(url) {
                try {
                    await postsService.changePosts(url)
                } catch (error) {
                    Pop.error(error)
                }
            },

            clearSearch() {
                AppState.searchPosts = []
            }
        }
    },
    components: { PostCard }
}
</script>

<style lang="scss" scoped>
.sticky-top-2 {
    position: sticky;
    top: 11.5vh;
    z-index: 1;
}
</style>