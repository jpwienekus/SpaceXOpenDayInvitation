<template>
    <n-carousel autoplay direction="horizontal" dot-placement="bottom" dot-type="line">
        <img v-for="(launchImage) in launchImages" :src="launchImage" :alt="imageAlt" class="carousel-img">
    </n-carousel>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { NCarousel } from 'naive-ui'

export default defineComponent({
    props: {
        launchImages: {
            type: [] as PropType<string[]>,
            required: true
        },
        description: String
    },
    setup(props) {
        return {
            launchImages: props.launchImages,
            imageAlt: props.description
        }
    },
    components: {
        NCarousel
    }
})
</script>
<style lang="scss" scoped>
.n-carousel {
    height: 100%;
}

.n-carousel {
    margin-bottom: $half-offset;
}
</style>

<style>
.carousel-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
}
</style>