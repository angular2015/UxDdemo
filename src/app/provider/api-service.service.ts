import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class ApiServiceService {

    user: Observable<firebase.User>;
    constructor(private firebaseAuth: AngularFireAuth,private af:AngularFireDatabase) {
        this.user = firebaseAuth.authState;
    }

    signup(email: string, password: string) {
        return this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(email, password);
    }
    saveUserInfoFromForm(uid, name, email,mobile) { 
        return this.af.object('registeredUsers/' + uid).set({
            name: name,
            email: email,
            mobile:mobile
        });
    }
    login(email: string, password: string) {
        return this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password);
    }

    logout() {
        this.firebaseAuth
            .auth
            .signOut();
    }

}
