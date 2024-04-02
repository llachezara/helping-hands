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
    hasEnded?: boolean
}

export type CampaignEditPartial = { 
    title: string; 
    imageUrl: string; 
    description: string; 
    startDate: Date; 
    endDate: Date; 
    phoneNumber: string ; 
    region: string; 
    hasEnded?: boolean
}