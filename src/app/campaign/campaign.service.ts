import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData, DocumentReference, addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';
import { CampaignDoc, CampaignEditPartial } from '../types/Campaign';
import { UserPopulatedDoc } from '../types/User';

@Injectable({
    providedIn: 'root'
})
export class CampaignService{
    constructor(private firestore: Firestore, private authService: AuthService, private userService: UserService){}
    campaignsCollection: CollectionReference = collection(this.firestore, 'campaigns');
    
    get currentUser(){
        return this.authService.currentUser;
    }

    getCurrentUserPopulatedWithCampaignsDoc(): Observable<UserPopulatedDoc>{
        const currentUserUid = this.currentUser!.uid;
        return from(this.userService.getCurrentUserDoc(currentUserUid)
            .then(async (userDoc) => {
                
                const populatedCampaigns = await Promise.all(userDoc.campaigns.map(campaignId => {
                    const campaignDocRef = doc(this.campaignsCollection, `${campaignId}`);
                    return getDoc(campaignDocRef);
                }))
                const populatedSignedUpCampaigns = await Promise.all(userDoc.signedUpCampaigns?.map(campaignId => {
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

    checkCampaignExistence(id: string): Observable<boolean>{
        const docRef = doc(this.campaignsCollection, `${id}`);
        return from(getDoc(docRef).then(docSnapshot => docSnapshot.exists()));
    }

    checkIfCurrentUserIsCampaignOwner(campaignId: string){
        const userUid = this.currentUser!.uid;
        return from(this.getCampaignById(campaignId).pipe(map((campaignDoc)=>{
            return campaignDoc.owner == userUid;
        })))
    }

    checkIfCampaignHasExpired(campaign: CampaignDoc): boolean{
        
        if (!campaign) {
            return false
        }
        const currentDate = new Date();
        const startDate = campaign.startDate.toDate();
        const endDate = campaign.endDate.toDate();

        return currentDate.getTime() > startDate.getTime() && currentDate.getTime() > endDate.getTime()
    }

    createCampaign(data: object): Observable<void> {
        const owner = this.currentUser!.uid;
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

    getCampaignById(id: string): Observable<CampaignDoc>{
        const docRef = doc(this.campaignsCollection, `${id}`)

        return from(getDoc(docRef)).pipe(map(doc => {
            console.log(doc.data());
            return doc.data() as CampaignDoc;
          }));
    }

    updateCampaignById(id:string, data: CampaignEditPartial | {hasEnded: boolean}):Observable<void>{
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
        const userUid =  this.currentUser!.uid;
        const campaignDocRef = doc(this.campaignsCollection, `${campaignId}`);
        
        const promise = this.userService.addCampaignToUserSignedCampaigns(campaignId, userUid)
        .then((userId) =>{
            return updateDoc(campaignDocRef, {
                signedUpUsers: arrayUnion(userId)
            })
        })

        return from(promise)
    }

    isCampaignSignedByUser(campaignId: string){
        console.log('In campaignService', campaignId)
        const currentUserUid = this.currentUser ? this.currentUser.uid : '' ;
        return this.userService.isUserSignedForCampaign(campaignId, currentUserUid)
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