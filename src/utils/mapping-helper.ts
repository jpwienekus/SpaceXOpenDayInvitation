import type { PayloadInformation } from "@/models/payload-information";
import type { RocketCoreInformation } from "@/models/rocket-core-information";
import _ from "lodash";

export function mapRocketInformation(rocketInformation: any): RocketCoreInformation[] {
    return rocketInformation.length > 0
        ? _.map(rocketInformation, coreEntry => {
            return {
                id: coreEntry.core.id,
                reuseCount: coreEntry.core.reuse_count
            }
        })
        : [];
}

export function mapPayloadInformation(payloadInformation: any): PayloadInformation[] {
    return payloadInformation.length > 0
        ? _.map(payloadInformation, e => {
            return {
                massInKg: e.payload_mass_kg,
                type: e.payload_type
            }
        })
        : [];
}