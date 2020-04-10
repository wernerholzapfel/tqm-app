import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private angularFireAuth: AngularFireAuth) {
    }


    isLoggedIn() {
        return this.angularFireAuth.authState;
    }

    getToken(): Promise<any> {
        if (this.angularFireAuth.auth.currentUser) {
            return this.angularFireAuth.auth.currentUser.getIdToken(true);
        } else {
            return Promise.resolve(false);
        }
    }

}
