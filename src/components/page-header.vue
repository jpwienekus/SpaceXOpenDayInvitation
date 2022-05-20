<template>
    <n-page-header>
        <template #title>
            <a href="#">
                <img src="../assets/logo.png" width="200">
            </a>
        </template>
    </n-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NPageHeader } from 'naive-ui'

export default defineComponent({
    setup() {
        return {
        }
    },
    components: {
        NPageHeader,
    }
})
</script>

<style lang="scss">
.n-page-header{
    margin: 0 $offset;
}
</style>