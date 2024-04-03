import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';

import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const firebaseConfig = {
  apiKey: "AIzaSyBKNp0I6E7jMFStDfAVd8LRB3G5-WdkCew",
  authDomain: "helping-hands-85ecf.firebaseapp.com",
  projectId: "helping-hands-85ecf",
  storageBucket: "helping-hands-85ecf.appspot.com",
  messagingSenderId: "446214338847",
  appId: "1:446214338847:web:9e21fb56d07fd1f8dd582a"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),//environment is not of type FirebaseOptions, TODO: Use environment.firebaseConfig
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
