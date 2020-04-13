import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public uid: string;
    public isAdmin: boolean;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.angularFireAuth.authState.subscribe(user => {
            if (user) {
                this.uid = user.uid;
                this.angularFireAuth.auth.currentUser.getIdTokenResult(true).then(tokenResult => {
                    this.isAdmin = tokenResult.claims.admin;
                });
            }
        });
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
