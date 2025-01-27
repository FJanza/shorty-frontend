import {auth} from "@/firebaseConfig";

import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import {toast} from "sonner";
import {addNewUser} from "./FirestoreService";

const providerGoogle = new GoogleAuthProvider();

const providerGithub = new GithubAuthProvider();

export const googleSignIn = async (): Promise<any> => {
  return await signInWithPopup(auth, providerGoogle)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      const email = user.email ?? "";
      const uid = user.uid;

      const obj = await addNewUser({uid, email});

      console.log(obj);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      if (errorCode === "auth/popup-closed-by-user") {
        console.log(
          "User closed the popup before finishing the sign in process."
        );
      } else {
        throw error;
      }
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const githubSignIn = async (): Promise<any> => {
  return await signInWithPopup(auth, providerGithub)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      const email = user.email ?? "";
      const uid = user.uid;

      const obj = await addNewUser({uid, email});
      console.log(obj);

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      console.log({error});
      if (error.code === "auth/account-exists-with-different-credential") {
        console.log(
          `${error.customData.email} is already associated with Google account.`
        );
        toast(
          `${error.customData.email} is already associated with Google account.`
        );
      } else {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        throw error;
      }
    });
};

export const logOut = async (): Promise<void> => {
  console.log(auth.currentUser);
  return await signOut(auth);
};
