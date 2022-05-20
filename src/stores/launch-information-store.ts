import { SpaceXClient } from '@/api/spacex-client';
import type { LaunchInformation } from '@/models/launch-information';
import _ from 'lodash';
import { defineStore } from 'pinia'

export const useLaunchInformationStore = defineStore({
    id: 'launch-information',
    state: () => ({
        isLoading: false,
        launchInformation: [] as LaunchInformation[]
    }),
    getters: {
        successfullLaunches: (state) => _.sortBy(_.filter(state.launchInformation, (launchInformation: LaunchInformation) => launchInformation.launchSuccess), (e) => e.timeUnix) as LaunchInformation[]
    },
    actions: {
        async getLaunchInformation() {
            try {
                this.isLoading = true;

                const client = new SpaceXClient();
                
                this.launchInformation = await client.getPastLaunchInformation();
                this.isLoading = false;
            } catch (error) {
                alert(error)
                console.log(error)
            }
        }
    }
})
