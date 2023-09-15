<template>
    <div class="col-11 py-2 my-3 bg-white elevation-5">
        <section class="row">
            <div class="col-2">
                <img :src="post.creator.picture" class="profile-pic">
            </div>
            <div class="col-8">
                <h5>{{ post.creator.name }}</h5>
                <h6>{{ post.createdAt }}</h6>
            </div>
            <div class="col-2">
                <button v-if="post.creatorId == account.id" class="btn"><i class="mdi mdi-dots-horizontal"></i></button>
            </div>
        </section>
        <section class="row">
            <div class="col-12">
                <p class="ps-2">{{ post.body }}</p>
            </div>
        </section>
        <section v-if="post.imgUrl" class="row">
            <div class="col-12">
                <img :src="post.imgUrl" class="post-img">
            </div>
        </section>
        <section v-if="account.id" class="row justify-content-end">
            <div class="col-6 text-end">
                <h3 class="mb-0">{{ post.likes.length }}<i class="mdi mdi-heart selectable"></i>
                </h3>
                <h3 class="mb-0">{{ post.likes.length }}<i class="mdi mdi-heart-outline selectable"></i></h3>
            </div>
        </section>
        <section v-else class="row justify-content-end">
            <div class="col-6 text-end">
                <h3 class="mb-0">Likes: {{ post.likes.length }}</h3>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { Post } from '../models/Post';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {

        return {
            account: computed(() => AppState.account),


        };
    },
};
</script>


<style lang="scss" scoped>
.profile-pic {
    height: 4.5em;
    width: 4.5em;
    border-radius: 5em;
}

.post-img {
    height: 15em;
    width: 100%;
}
</style>