import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService{
    constructor(private firestore: Firestore){}
}