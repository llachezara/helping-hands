import { Injectable } from '@angular/core';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { DocumentReference, addDoc, arrayUnion, collection, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService{
    constructor(private firestore: Firestore){}
    usersCollection: CollectionReference = collection(this.firestore, 'users');

    createUserProfile(data: UserCredential): Observable<DocumentReference> {
        const promise = addDoc(this.usersCollection, <UserProfile>{ 
            uid: data.user.uid,
            email: data.user.email,
            campaigns: []
        })
        return from(promise)
    }

    async updateCampaignsForUser(campaignId: string, uid: string){
        const q = query(this.usersCollection, where("uid", "==", uid));
        const docs = await getDocs(q);
        const update = (ref: DocumentReference) => updateDoc(ref, {
            campaigns: arrayUnion(campaignId)
        });

        docs.forEach((doc)=>{
             update(doc.ref).then(()=>{})
        })

    }
}

type UserProfile = {
    uid: string,
    email: string
}