import type { PayloadInformation } from "./payload-information";
import type { RocketCoreInformation } from "./rocket-core-information";

export interface LaunchInformation {
    images: string[];
    launchSuccess: boolean;
    missionName: string;
    payloadInformation: PayloadInformation[]
    rocketCoreInformation: RocketCoreInformation[],
    rocketName: string;
    site: string;
    timeUnix: number;
}
