import { ErrorFactory } from "@firebase/util";
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, getAdditionalUserInfo, signInWithPopup, signInWithRedirect, GithubAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHYsCQ95J9CIOEzbLOtkhkSbEFhjhVOuo",
    authDomain: "nextjs-app-72ece.firebaseapp.com",
    projectId: "nextjs-app-72ece",
    storageBucket: "nextjs-app-72ece.appspot.com",
    messagingSenderId: "110311179446",
    appId: "1:110311179446:web:c8da7f1f22b85872b39217",
    measurementId: "G-62EDKYZH26"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GithubAuthProvider();
// const currentUser = auth.currentUser;

const mapUserFromFirebaseAuth = (user) => {
    // const addiotionalInfo = getAdditionalUserInfo(user)
    const { displayName } = user
    const { photoURL, blog } = user

    console.log("Getting user from singin", user)
    return {
        avatar: photoURL,
        displayName: displayName,
        url: blog
    }
}

export const onAuthStateChange = (onChange) => {
    // return onAuthStateChanged(user => {
    //     const normalizedUser = mapUserFromFirebaseAuth(user)
    //     onChange(normalizedUser)
    // })
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const normalizedUser = mapUserFromFirebaseAuth(user)
            onChange(normalizedUser)
            console.log("ya hay un usuario logeado", user)
            // const uid = user.uid;
        }
        else {
            console.log("no user")
        }
    })
}

export const loginWithGitHub = () => {
    return signInWithPopup(auth, provider)
        .then(mapUserFromFirebaseAuth)

    // signInWithPopup(auth, provider)
    //     .then((result) => {
    //         console.log("result with poup:",result);
    //         const details = getAdditionalUserInfo(result);
    //         console.log("AditionalInfo:",details);
    //         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //         const credential = GithubAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         console.log("TOKEN:",token)
    //         // The signed-in user info.
    //         const user = result.user;
    //         console.log("USER:", user)
    //         // ...
    //         avatarUrl = details;
    //         userName = details;
    //     }).catch((error) => {
    //         console.log(error)
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.email;
    //         // The AuthCredential type that was used.
    //         const credential = GithubAuthProvider.credentialFromError(error);
    //         // ...
    //     });

}