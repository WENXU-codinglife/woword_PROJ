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

import {
    getFirestore, 
    doc, 
    getDoc, 
    getDocs,
    setDoc, 
    addDoc, 
    updateDoc,
    collection,
    query,
    where,
    FieldValue,
    orderBy,
    limit
} from 'firebase/firestore';
import { randomWordGen } from "../api/openaiAPI.utils";
import { GAMEPLAY } from "../titles/titles.utils";
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

export const createOrUpdateWordDocument = async (word, userId) => {
    const timestamp = new Date();
    const wordsRef = collection(db, 'words');
    const q = query(wordsRef, where('text', '==', word), where('user', '==', userId));
    const querySnapshot = await getDocs(q);//.where('text', '==', word).where('user', '==', userId).get();
    if(querySnapshot.size === 1){
        querySnapshot.forEach( async (wordDoc) => { 
            const docRef = doc(db, 'words', wordDoc.id);
            await updateDoc(docRef, {
                latestTimestamp: timestamp,
                count: wordDoc.data().count + 1
            }) ;
        })
    }else if(querySnapshot.size === 0){
        const wordDocRef = await addDoc(
            wordsRef,
            {
                text: word,
                firstTimestamp: timestamp,
                latestTimestamp: timestamp,
                count: 1,
                user: userId,        
            }
        );
    }else{
        console.log('Multiple word records error!', querySnapshot.length);
    }
}

export const findOrCreateGame = async ( userId ) => {
    const timestamp = new Date();
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where('guest', '==', '/'), where('host', '!=', userId), limit(1));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.size);
    if(querySnapshot.size === 1){
        let docRef = null;
        querySnapshot.forEach( gameDoc => {
            docRef = doc(db, 'games', gameDoc.id);
        });
        await updateDoc(docRef, {
            guest: userId,
        });
        return {
            player: GAMEPLAY.GUEST,
            gameId: docRef.id
        };
        
    }else{
        const gameDocRef = await addDoc(
            gamesRef,
            {
                createdAt: timestamp,
                host: userId,
                guest: '/',
                history_myWord: [randomWordGen(5),],
                history_nextWord: [randomWordGen(5),],
                history_player: [GAMEPLAY.GUEST],
            }
        );
        return {
            player: GAMEPLAY.HOST,
            gameId: gameDocRef.id
        };
    };

}

export const pushMyWordAndNextWord = async ( myWord, nextWord, player, gameDocId ) => {
    if (!gameDocId) return;
    const gameDocRef = doc(db, 'games', gameDocId);
    const gameSnapshot = await getDoc(gameDocRef);
    if(gameSnapshot.exists()){
        await setDoc(gameDocRef, {
            ...gameSnapshot.data(),
            history_player : gameSnapshot.data().history_player.concat([player]),
            history_myWord: gameSnapshot.data().history_myWord.concat([myWord]),
            history_nextWord: gameSnapshot.data().history_nextWord.concat([nextWord])
        })
    }else{
        console.error('Game fetching error!');
    }
}

// Still have the problems of xxx is not a function, e.g. update() is not a function,
// or FieldValue.increment() is not a function. Also found that it can't import 'update' 
// from 'firebase/firestore'. 
// NEED TO BE RESOLVED LATE!