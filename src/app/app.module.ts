import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './/app-routing.module';
import {ApiServiceService} from './provider/api-service.service';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { HomeComponent } from './home/home.component';
export const firebaseConfig = {
    apiKey: 'AIzaSyAyJg9t6j6PKZ6St9IFXwWssmrqr0Iet5k',
    authDomain: 'https://uxddemo-a10e6.firebaseapp.com/',
    databaseURL: 'https://uxddemo-a10e6.firebaseio.com/',
    storageBucket: 'gs://uxddemo-a10e6.appspot.com',
    messagingSenderId: '154040845818'
};
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        FieldErrorDisplayComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule
    ],
    providers: [ApiServiceService,AngularFireDatabase],
    bootstrap: [AppComponent]
})
export class AppModule {}
