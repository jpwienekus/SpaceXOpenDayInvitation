<template>

    <n-spin :show="isLoading">
        <h1 class="center-text">Welcome to the SpaceX open day</h1>

        <h4 class="center-text">“You want to wake up in the morning and think the future is going to be great - and
            that’s
            what being a
            spacefaring civilization is all about. It’s about believing in the future and thinking that the future will
            be
            better than the past. And I can’t think of anything more exciting than going out there and being among the
            stars.”
            -Elon Musk</h4>

        <p class="center-text">Click on any of the launches below to view interesting information about the launch.</p>

        <time-line></time-line>
    </n-spin>

</template>

<script lang="ts">
import { useLaunchInformationStore } from '@/stores/launch-information-store';
import { defineComponent } from 'vue'
import { NLayout, NSpin } from 'naive-ui'
import TimeLine from '@/components/time-line.vue';
import { computed } from '@vue/reactivity';

export default defineComponent({
    setup() {
        const store = useLaunchInformationStore();
        const { getLaunchInformation } = store;
        const isLoading = computed<boolean>(() => store.$state.isLoading);

        getLaunchInformation();

        return {
            isLoading
        }
    }, components: {
        NLayout,
        NSpin,
        TimeLine
    }
})
</script>