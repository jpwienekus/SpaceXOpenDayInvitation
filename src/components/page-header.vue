<template>
    <n-page-header class="side-padding-xs side-padding-s side-padding-m side-padding-l side-padding-xl">
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