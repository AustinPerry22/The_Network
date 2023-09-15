<template>
    <div class="col-11">
        <section class="row">
            <div class="col-2">
                <img :src="post.creator.picture" class="profile-pic">
            </div>
            <div class="col-8">
                <h5>{{ post.creator.name }}</h5>
                <h6>{{ post.createdAt }}</h6>
            </div>
            <div class="col-2">
                <button v-if="post.creatorId == Account.id" class="btn"><i class="mdi mdi-dots-horizontal"></i></button>
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
    </div>
</template>

<script>
import { Account } from '../models/Account';
import { Post } from '../models/Post';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        return {
            Account
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