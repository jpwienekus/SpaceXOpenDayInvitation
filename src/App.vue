<template>
    <n-layout class="root-layout" embedded position="absolute" content-style="padding: 24px;">
        <page-header></page-header>
        <div class="container">
            <router-view />
        </div>
    </n-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '@/components/page-header.vue';

export default defineComponent({
    components: {
        PageHeader
    }
})
</script>

<style lang="scss" scoped>
.container {
    padding: 0 $offset;
}
</style>