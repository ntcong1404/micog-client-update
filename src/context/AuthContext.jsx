import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), {
      likeLists: [],
      Lists: [],
    });
  };

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(user, {
      displayName,
      photoURL,
    });
  };

  const updateUserPassword = (password) => {
    return updatePassword(user, password);
  };

  const resetUserPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      setUser(result.user);
      setDoc(doc(db, "users", result?.user?.email), {
        likeLists: [],
        Lists: {},
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => console.log(error));
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle firebase auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        console.log("user is not registered");
      }
      setUser(currentUser);
      const token = await currentUser?.getIdToken();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        updateUserProfile,
        logOut,
        signIn,
        signInGoogle,
        updateUserPassword,
        resetUserPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
