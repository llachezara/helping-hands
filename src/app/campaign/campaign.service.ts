import { Injectable } from '@angular/core';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { DocumentReference, addDoc, collection } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable()
export class CampaignService{
    constructor(private firestore: Firestore){}
    usersCollection: CollectionReference = collection(this.firestore, 'campaigns');

    createCampaign(data: object): Observable<DocumentReference> {
        const promise = addDoc(this.usersCollection, <Campaign>{ 
           ...data
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
    region:string
}