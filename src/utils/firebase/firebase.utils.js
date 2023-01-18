// Import the functions you need from the SDKs you need
import { async, getDefaultAppConfig } from "@firebase/util";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithRedirect,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzE5uO19xiTSp_Jb4gH5kIFZGT3L3YD1c",
  authDomain: "woword-c9aae.firebaseapp.com",
  projectId: "woword-c9aae",
  storageBucket: "woword-c9aae.appspot.com",
  messagingSenderId: "450107037831",
  appId: "1:450107037831:web:4e3ab1e21696ff2c98c022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:'select_account',
})

export const auth = getAuth();
export const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, googleProvider);
}

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {
    if(!userAuth)return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }


    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedLister = (callback) => {
    onAuthStateChanged(auth, callback);
}