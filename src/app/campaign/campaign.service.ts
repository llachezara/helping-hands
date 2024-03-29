import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';
import { CampaignDoc } from '../types/Campaign';

@Injectable()
export class CampaignService{
    constructor(private firestore: Firestore, private authService: AuthService, private userService: UserService){}
    campaignsCollection: CollectionReference = collection(this.firestore, 'campaigns');
    

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

    updateCampaign(docRef: DocumentReference, data: object){
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