import { Injectable } from '@angular/core';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { DocumentReference, addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { CampaignDoc } from '../types/Campaign';
import { UserDoc } from '../types/User';

@Injectable()
export class UserService{
    constructor(private firestore: Firestore){}
    usersCollection: CollectionReference = collection(this.firestore, 'users');

    async getCurrentUserDoc(uid: string): Promise<UserDoc>{
        return this.getUserDocRef(uid)
            .then(userDocRef=>{
                return getDoc(userDocRef);
            })
            .then(userDoc=>{
                return userDoc.data() as UserDoc
            })
    }

    async getUserDocRef(uid: string){
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
            campaigns: [],
            signedUpCampaigns: []
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

        const queryForOwner = query(this.usersCollection, where("uid", "==", owner));

        const userDocs = await getDocs(queryForOwner);
        const updateCampaigns = ( userDocRef: DocumentReference) => updateDoc(userDocRef, {
            campaigns: arrayRemove(id)
        });

        userDocs.forEach((doc)=>{
            updateCampaigns(doc.ref).then(()=>{})
        })
    
        const queryForSignedUsers = query(this.usersCollection, where("signedUpCampaigns", "array-contains", id));
        const signedUpUsersDocs = await getDocs(queryForSignedUsers);
        const updateSigneUpCampaigns = ( userDocRef: DocumentReference) => updateDoc(userDocRef, {
            signedUpCampaigns: arrayRemove(id)
        });

        signedUpUsersDocs.forEach((doc)=>{
            updateSigneUpCampaigns(doc.ref).then(()=>{})
        })
    }

    async addCampaignToUserSignedCampaigns(campaignId: string, userUid: string){
        const userDocRef = await this.getUserDocRef(userUid);
        await updateDoc(userDocRef, {
            signedUpCampaigns: arrayUnion(campaignId)
        })
        return userDocRef.id
    }

     isUserSignedForCampaign(campaignId: string, userUid: string){
        const q = query(this.usersCollection, where('uid', '==', userUid), where('signedUpCampaigns', 'array-contains', campaignId))
        console.log("In User service")
        return from(getDocs(q).then((docs)=>{
            return docs.size > 0
        }))
    }
}

type UserProfile = {
    uid: string,
    email: string
}