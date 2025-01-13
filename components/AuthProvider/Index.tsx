"use client";
import React from "react";
import {useEffect, useState, createContext, useContext} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {Props} from "./types";
import {auth} from "@/firebaseConfig";
import {usePathname, useRouter} from "next/navigation";

const AuthContext = createContext<User | null>(null);
const WHITE_LIST = ["/", "/robots.txt"];

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({children}: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser && !WHITE_LIST.includes(path)) {
      router.replace("/");
    }
  }, [path]);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
