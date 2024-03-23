import { Timestamp } from "firebase/firestore";

export type CampaignDoc = {
    title: string,
    description: string,
    phoneNumber:string,
    imageUrl: string,
    region: string,
    id:string,
    owner:string,
    startDate: Timestamp,
    endDate: Timestamp,
  }