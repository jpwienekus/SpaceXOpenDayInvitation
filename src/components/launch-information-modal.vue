<template>
    <n-modal v-model:show="shouldShow" :title="launchInformation.missionName" class="custom-card" preset="card"
        :bordered="false" size="medium" :segmented="segmented">
        <launch-image-carousel v-if="hasImages" :launch-images="launchInformation.images" :description="description"></launch-image-carousel>
        <p v-else>There are no images available for this launch.</p>

        Launch Site: {{ launchInformation.site }} <br />
        Rocket Name: {{ launchInformation.rocketName }} <br />
        Launch Date: {{ formatDate(launchInformation.timeUnix) }} <br />

        Rocket Cores: <br />
        <span v-for="(rocketCoreInformation) in launchInformation.rocketCoreInformation">
            &emsp;Id: {{ rocketCoreInformation.id }} <br />
            &emsp;Reuse Count: {{ rocketCoreInformation.reuseCount }} <br />
        </span>

        Payload Information: <br />
        <span v-for="(payloadInformation) in launchInformation.payloadInformation">
            &emsp;Type: {{ payloadInformation.type }} <br />
            &emsp;Mass in Kg: {{ payloadInformation.massInKg }} <br />
        </span>

    </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue'
import { NModal } from 'naive-ui'
import type { LaunchInformation } from '@/models/launch-information';
import { computed } from '@vue/reactivity';
import LaunchImageCarousel from '@/components/launch-image-carousel.vue';
import _ from 'lodash';
import { formatDate } from '@/utils/date-helper';

export default defineComponent({
    props: {
        modelValue: Boolean,
        launchItem: Object as PropType<LaunchInformation>
    },
    emits: ['update:modelValue'],
    setup(props, context) {
        const shouldShow = ref<boolean>(false);
        const hasImages = computed<boolean>(() => {
            return props.launchItem
                ? props.launchItem.images.length > 0
                : false
        });

        const description = computed<string>(() => {
            return props.launchItem
                ? props.launchItem.missionName + ' ' + props.launchItem.rocketName
                : '';
        });

        const launchInformation = computed<LaunchInformation>(() => {
            return props.launchItem || {
                images: [],
                launchSuccess: false,
                missionName: '',
                payloadInformation: [],
                rocketCoreInformation: [],
                rocketName: '',
                site: '',
                timeUnix: 0
            }
        });

        watch(() => props.modelValue, (newValue: boolean) => {
            shouldShow.value = newValue;
        });

        watch(() => shouldShow.value, (newValue: boolean) => {
            context.emit('update:modelValue', newValue);
        });

        return {
            segmented: {
                content: 'soft',
                footer: 'soft'
            } as const,
            shouldShow,
            launchInformation,
            hasImages,
            description
        }
    },
    methods: {
        formatDate,
    },
    components: {
        NModal,
        LaunchImageCarousel
    }
})
</script>

<style lang="scss">
.n-card>.n-card-header .n-card-header__main {
    color: $primary-font-color;
}
</style>