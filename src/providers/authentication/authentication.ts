import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthenticationProvider {

  private user: firebase.User;

  constructor(
    public http: HttpClient,
    public afAuth: AngularFireAuth,
    private facebook: Facebook,
    private gplus: GooglePlus
  ) {
    afAuth.user.subscribe(user => {
      this.user = user;
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  getEmail() {
    return this.user && this.user.email;
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signInWithEmail(credentials): Promise<any> {
    // console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signUp(credentials): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
  }


  signInWithFacebook(): Promise<any> {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } else {
      return this.facebook.login(['public_profile', 'email'])
        .then( response => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

          return firebase.auth().signInWithCredential(facebookCredential)
            .then( success => {
              // console.log("Firebase success: " + JSON.stringify(success));
            });

        }).catch((error) => { console.log(error) });
    }
  }

  signInWithGoogle(): Promise<any> {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      return this.nativeGoogleLogin();
    }
  }

  private nativeGoogleLogin(): Promise<void> {

    const gplusUser = this.gplus.login({
      'webClientId': '372040921428-b64r6jn9kc01rvqcarkqr4it8ga58n8k.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    });


    return new Promise((resolve, reject) => {
      return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser['idToken']))
        .then( (success: any) => {
          resolve(success)
        })
        .catch(error => reject(error));
    });

  }

  /*signInWithGoogle(): Promise<any> {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }*/

  /*private oauthSignIn(provider: AuthProvider): Promise<any> {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then( result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential['accessToken'];
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function(error) {
            // Handle Errors here.
            alert(error.message);
            console.log(error.message);
          });
        });
    }
  }*/

}
