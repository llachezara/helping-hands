import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData, DocumentReference, addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';
import { CampaignDoc, CampaignEditPartial } from '../types/Campaign';
import { UserPopulatedDoc } from '../types/User';

@Injectable()
export class CampaignService{
    constructor(private firestore: Firestore, private authService: AuthService, private userService: UserService){}
    campaignsCollection: CollectionReference = collection(this.firestore, 'campaigns');
    
    currentUser(){
        return this.authService.currentUser 
    }

    getCurrentUserPopulatedWithCampaignsDoc(): Observable<UserPopulatedDoc>{
        const currentUserUid = this.authService.currentUser!.uid;
        return from(this.userService.getCurrentUserDoc(currentUserUid)
            .then(async (userDoc) => {
                const populatedCampaigns = await Promise.all(userDoc.campaigns.map(campaignId => {
                    const campaignDocRef = doc(this.campaignsCollection, `${campaignId}`);
                    return getDoc(campaignDocRef);
                }))
                const populatedSignedUpCampaigns = await Promise.all(userDoc.signedUpCampaigns.map(campaignId => {
                    const campaignDocRef = doc(this.campaignsCollection, `${campaignId}`);
                    return getDoc(campaignDocRef);
                }))

                return {
                    ...userDoc, 
                    campaigns: populatedCampaigns.map((campaign)=> campaign.data()),
                    signedUpCampaigns: populatedSignedUpCampaigns.map((campaign)=> campaign.data())
                }
            })
            .then(userPopulatedDoc => {
                return userPopulatedDoc as UserPopulatedDoc
            })
        )
    }

    isCampaignSignedByUser(campaignId: string){
        console.log('In campaignService', campaignId)
        const currentUserUid = this.authService.currentUser ? this.authService.currentUser.uid : '' ;
        return this.userService.isUserSignedForCampaign(campaignId, currentUserUid)
    }

    createCampaign(data: object): Observable<void> {
        const owner = this.authService.currentUser!.uid;
        let campaignId = '';
        console.log(owner, { 
            ...data,
            owner
         });

        const promise = addDoc(this.campaignsCollection, <CampaignRawDoc>{ 
           ...data,
           owner
        })
        .then((docRef)=>{
            campaignId = docRef.id;
            return this.updateCampaign(docRef, {id: campaignId});
        })
        .then(()=>{
            return this.userService.updateCampaignsForUser(campaignId, owner)
        })
        .then(()=>console.log('Updated user'));

        return from(promise);
    }

    getAllCampaigns():Observable<(DocumentData | (DocumentData & {}))[]>{
        return collectionData(this.campaignsCollection)
    }

    getCampaignById(id: string | null): Observable<CampaignDoc>{
        const docRef = doc(this.campaignsCollection, `${id}`)

        return from(getDoc(docRef)).pipe(map(doc => {
            console.log(doc.data());
            return doc.data() as CampaignDoc;
          }));
    }

    updateCampaignById(id:string | null, data: CampaignEditPartial):Observable<void>{
        const docRef = doc(this.campaignsCollection, `${id}`)
        return from(this.updateCampaign(docRef, data))
    }

    private updateCampaign(docRef: DocumentReference, data: object){
        return updateDoc(docRef, data);
    }

    deleteCampaign(campaignId: string | null){
        const campaignDocRef = doc(this.campaignsCollection, `${campaignId}`);

        const promise = this.userService.removeCampaignFromUser(campaignDocRef)
            .then(()=>{
                console.log('Deleted campaignId from user campaigns array')
                return deleteDoc(campaignDocRef);
            })

        return from(promise);
    }

    signUpUserForCampaign(campaignId: string): Observable<void>{
        const userUid =  this.authService.currentUser!.uid;
        const campaignDocRef = doc(this.campaignsCollection, `${campaignId}`);
        
        const promise = this.userService.addCampaignToUserSignedCampaigns(campaignId, userUid)
        .then((userId) =>{
            return updateDoc(campaignDocRef, {
                signedUpUsers: arrayUnion(userId)
            })
        })

        return from(promise)
    }
}

type CampaignRawDoc = {
    title:string,
    imageUrl: string,
    description:string,
    startDate: Date,
    endDate: Date,
    phoneNumber:string,
    region:string,
    owner: string
}