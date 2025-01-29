import {app} from "@/firebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
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
    receiveUserInfo: false,
  });

  return {
    status: "ok",
    message: "User added successfully",
  };
};
