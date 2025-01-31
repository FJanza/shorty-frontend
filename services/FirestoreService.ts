import {app} from "@/firebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(app);

interface AddNewUserProps {
  uid: string;
  email: string;
}

export const addNewUser = async ({uid, email}: AddNewUserProps) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    if (doc.data().email === email && doc.id !== uid) {
      //console.log("User already exists");
      return {
        status: "error",
        message: "User already exists",
      };
    }
  });

  await setDoc(doc(db, "users", uid), {
    email: email,
  });

  return {
    status: "ok",
    message: "User added successfully",
  };
};

export const getUserReceiveInfo = async (email: string) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let receiveUserInfo = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().email === email) {
      receiveUserInfo = doc.data().receiveUserInfo;
    }
  });

  if (receiveUserInfo === null || receiveUserInfo === undefined) {
    return {
      status: "ok",
      receiveUserInfo: undefined,
    };
  }

  return {
    status: "ok",
    receiveUserInfo: receiveUserInfo,
  };
};

export const setUserReceiveInfo = async (uid: string, userAccept: boolean) => {
  await updateDoc(doc(db, "users", uid), {
    receiveUserInfo: userAccept,
  });
};
