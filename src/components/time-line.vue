<template>
    <n-scrollbar x-scrollable>
        <div class="timeline-container">
            <n-timeline horizontal>
                <n-timeline-item v-for="(launchItem) in successfullLaunches" type="success" @click="launchClicked(launchItem)"
                    :title="launchItem.missionName" :content="launchItem.site"
                    :time="formatDate(launchItem.timeUnix)" />
            </n-timeline>
        </div>
    </n-scrollbar>

    <launch-information-modal v-model="showModal" :launchItem="selectedLaunchItem"></launch-information-modal>
</template>
<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import { NTimeline, NTimelineItem, NScrollbar } from 'naive-ui'
import { useLaunchInformationStore } from '@/stores/launch-information-store';
import { storeToRefs } from 'pinia';
import LaunchInformationModal from './launch-information-modal.vue';
import type { LaunchInformation } from '@/models/launch-information';
import { formatDate } from '@/utils/date-helper';

export default defineComponent({
    setup() {
        const store = useLaunchInformationStore();
        const { successfullLaunches } = storeToRefs(store);
        const showModal: Ref<boolean> = ref<boolean>(false);
        const selectedLaunchItem = ref<LaunchInformation | undefined>(undefined);

        const launchClicked = (launchItem: LaunchInformation) => {
            showModal.value = true;
            selectedLaunchItem.value = launchItem;
        }

        return {
            successfullLaunches,
            showModal,
            selectedLaunchItem,
            launchClicked,
        }
    },
    methods: {
        formatDate,
    },
    components: {
        NTimeline,
        NTimelineItem,
        NScrollbar,
        LaunchInformationModal
    }
})
</script>
<style scoped>
.timeline-container {
    white-space: nowrap; 
    padding: 12px;
}
</style>
<style lang="scss">
.n-timeline {
    justify-content: center;
}

.n-timeline .n-timeline-item {
    cursor: pointer;
}

.n-timeline .n-timeline-item .n-timeline-item-content .n-timeline-item-content__title {
    color: $primary-font-color;
}

.n-timeline .n-timeline-item .n-timeline-item-content .n-timeline-item-content__content {
    color: $secondary-font-color;
}

.n-timeline .n-timeline-item .n-timeline-item-content .n-timeline-item-content__meta {
    color: $information-font-color;
}
</style>