import { Injectable } from '@angular/core';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { DocumentReference, addDoc, collection } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CampaignService{
    constructor(private firestore: Firestore, private authService: AuthService, private userService: UserService){}
    campaignsCollection: CollectionReference = collection(this.firestore, 'campaigns');
    

    createCampaign(data: object): Observable<void> {
        const owner = JSON.parse(this.authService.currentUser!).uid;
        console.log(owner, { 
            ...data,
            owner
         });

        
        const promise = addDoc(this.campaignsCollection, <Campaign>{ 
           ...data,
           owner
        }).then((data)=>{
            const campaignId = data.id;
            return this.userService.updateCampaignsForUser(campaignId, owner)
        }).then(()=>console.log('Updated user'));

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