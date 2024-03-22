import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData, DocumentReference, addDoc, collection, updateDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CampaignService{
    constructor(private firestore: Firestore, private authService: AuthService, private userService: UserService){}
    campaignsCollection: CollectionReference = collection(this.firestore, 'campaigns');
    

    createCampaign(data: object): Observable<void> {
        const owner = JSON.parse(this.authService.currentUser!).uid;
        let campaignId = '';
        console.log(owner, { 
            ...data,
            owner
         });

        
        const promise = addDoc(this.campaignsCollection, <Campaign>{ 
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

    updateCampaign(docRef: DocumentReference, data: object){
        return updateDoc(docRef, data);
    }
}

type Campaign = {
    title:string,
    imageUrl: string,
    description:string,
    startDate: Date,
    endDate: Date,
    phoneNumber:string,
    region:string,
    owner: string
}