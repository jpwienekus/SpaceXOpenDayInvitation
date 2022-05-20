import type { LaunchInformation } from "@/models/launch-information";
import type { GraphQlQuery } from "@/models/qraphql-query";
import { mapPayloadInformation, mapRocketInformation } from "@/utils/mapping-helper";
import _ from "lodash";

export class SpaceXClient {
    private endpoint = 'https://api.spacex.land/graphql/';
    private headers = {
        'content-type': 'application/json',
    };

    public async getPastLaunchInformation(): Promise<LaunchInformation[]> {
        const graphqlQuery: GraphQlQuery = {
            'query': `query {
                launchesPast(limit: 100) {
                  mission_name
                  launch_site {
                    site_name
                  }
                  links {
                    flickr_images
                  }
                  launch_date_unix
                  launch_success,
                  rocket {
                    rocket_name,
                    first_stage {
                        cores {
                          core {
                            id,
                            reuse_count
                          }
                        }
                    },
                    second_stage {
                        payloads {
                          payload_mass_kg
                          payload_type
                        }
                    }
                  }
                }
              }
              
              
            `,
            'variables': {}
        };

        const response = await this.getData(graphqlQuery);

        const launchInformation: LaunchInformation[] = _.map(response.launchesPast, e => {
            return {
                images: e.links.flickr_images,
                launchSuccess: e.launch_success,
                missionName: e.mission_name,
                payloadInformation: mapPayloadInformation(e.rocket.second_stage.payloads),
                rocketName: e.rocket.rocket_name,
                rocketCoreInformation: mapRocketInformation(e.rocket.first_stage.cores),
                site: e.launch_site.site_name,
                // Convert to JS date acceptable unit timestamp
                timeUnix: +`${e.launch_date_unix}000`,
            }
        });

        return launchInformation;
    }

    private async getData(graphqlQuery: GraphQlQuery): Promise<any> {
        const options = {
            "method": "POST",
            "headers": this.headers,
            "body": JSON.stringify(graphqlQuery)
        };

        const response = await fetch(this.endpoint, options);
        const data = await response.json();

        return data.data;
    }
}