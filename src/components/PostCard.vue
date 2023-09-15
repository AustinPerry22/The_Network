<template>
    {{ post }}
</template>

<script>
import { Post } from '../models/Post';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        return {};
    },
};
</script>


<style lang="scss" scoped></style>