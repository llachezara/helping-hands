import { Injectable } from '@angular/core';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { DocumentReference, addDoc, collection } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService{
    constructor(private firestore: Firestore){}
    usersCollection: CollectionReference = collection(this.firestore, 'users');

    createUserProfile(data: UserCredential): Observable<DocumentReference> {
        const promise = addDoc(this.usersCollection, <UserProfile>{ 
           email: data.user.email 
        })
        return from(promise)
    }
}

type UserProfile = {
    email: string
}