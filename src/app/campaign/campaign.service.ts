import { Injectable } from '@angular/core';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { DocumentReference, addDoc, collection } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { AuthService } from '../user/auth.service';

@Injectable()
export class CampaignService{
    constructor(private firestore: Firestore, private authService: AuthService){}
    usersCollection: CollectionReference = collection(this.firestore, 'campaigns');
    campaignsCollection: CollectionReference = collection(this.firestore, 'campaigns');

    createCampaign(data: object): Observable<DocumentReference> {
        const owner = JSON.parse(this.authService.currentUser!).uid;
        console.log(owner, { 
            ...data,
            owner
         });

        //Get owner by uid and push campaign id to campaigns
        
        const promise = addDoc(this.usersCollection, <Campaign>{ 
        const promise = addDoc(this.campaignsCollection, <Campaign>{ 
           ...data,
           owner
        });
        return from(promise);
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