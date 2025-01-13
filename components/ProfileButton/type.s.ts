import firebase from "firebase/auth";

export interface Props {
  user: firebase.User | null;
  badge: boolean;
  onClick: () => void;
}
