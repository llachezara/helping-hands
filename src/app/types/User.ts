import { CampaignDoc } from "./Campaign"

export type UserInterface = {
    email: string,
    uid: string,
    id?: string
}

export type UserDoc = {
    email: string,
    uid: string,
    id: string,
    campaigns: Array<string>,
    signedUpCampaigns: Array<string>
}

export type UserPopulatedDoc = {
    email: string,
    uid: string,
    id: string,
    campaigns: Array<CampaignDoc>,
    signedUpCampaigns: Array<CampaignDoc>
}
  