import { Injectable } from '@angular/core';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { DocumentReference, addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { CampaignDoc } from '../types/Campaign';

@Injectable()
export class UserService{
    constructor(private firestore: Firestore){}
    usersCollection: CollectionReference = collection(this.firestore, 'users');


    async getUserDoc(uid: string){
        const q = query(this.usersCollection, where("uid", "==", uid));
        const docs = await getDocs(q);
        let userId = '';
        console.log("The length is ", docs.size);
        
        docs.forEach(doc=>{
            userId = doc.id
        })

        const userDocRef = doc(this.usersCollection, `${userId}`);

        return userDocRef;
    }

    async createUserProfile(data: UserCredential): Promise<void> {
        const userDocRef = await addDoc(this.usersCollection, <UserProfile>{ 
            uid: data.user.uid,
            email: data.user.email,
            campaigns: []
        })

        return updateDoc(userDocRef, {
            id: userDocRef.id
        })
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

    async removeCampaignFromUser( campaignDocRef: DocumentReference){
        
        const campaignDoc = (await getDoc(campaignDocRef)).data() as CampaignDoc;
        const {id, owner} = campaignDoc;

        const q = query(this.usersCollection, where("uid", "==", owner));

        const userDocs = await getDocs(q);
        const update = (userDocRef: DocumentReference) => updateDoc(userDocRef, {
            campaigns: arrayRemove(id)
        });

        userDocs.forEach((doc)=>{
             update(doc.ref).then(()=>{})
        })
    
    }

    async addCampaignToUserSignedCampaigns(campaignId: string, userUid: string){
        const userDocRef = await this.getUserDoc(userUid);
        await updateDoc(userDocRef, {
            signedUpCampaigns: arrayUnion(campaignId)
        })
        return userDocRef.id
    }
}

type UserProfile = {
    uid: string,
    email: string
}