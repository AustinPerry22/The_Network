<template>
    <div class="col-11 py-2 my-3 bg-white elevation-5">
        <section class="row">
            <div class="col-2">
                <img @click="changePage" :src="post.creator.picture" class="profile-pic selectable">
            </div>
            <div class="col-8">
                <h5>{{ post.creator.name }}</h5>
                <h6>{{ post.createdAt }}</h6>
            </div>
            <div v-if="post.creatorId == accountId" class="col-2">
                <button  class="btn btn-warning"><i class="mdi mdi-pencil-outline"></i></button>
                <button @click="deletePost" class="btn btn-danger"><i class="mdi mdi-delete-outline"></i></button>
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
        <section v-if="accountId" class="row justify-content-end">
            <div class="col-6 text-end">
                <h3 v-if="liked" @click="toggleLike" class="mb-0 pink">{{post.likes.length}}<i class="mdi mdi-heart selectable"></i>
                </h3>
                <h3 v-else @click="toggleLike" class="mb-0 pink">{{post.likes.length}}<i class="mdi mdi-heart-outline selectable"></i></h3>
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
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { router } from '../router';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {

        return {
            accountId: computed(()=> AppState.account.id),
            liked: computed(() => {
                    let liked = false
                    props.post.likes.forEach(like => {
                        if(like == AppState.account.id){
                            liked = true
                        }
                    });
                    return liked
            }),

            changePage() {
                router.push({ name: 'Profile', params: { profileId: props.post.creatorId } })
            },

            async toggleLike(){
                try {
                    await postsService.toggleLike(props.post.id)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async deletePost(){
                try {
                    if(await Pop.confirm('Are you sure you want to delete this post?')){
                        await postsService.deletePost(props.post.id)
                        Pop.success('post deleted')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
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

.pink{
    color: rgb(236, 105, 127);
}
</style>