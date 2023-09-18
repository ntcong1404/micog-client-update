import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), {
      likeLists: [],
    });
  };

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };
  const signInGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        setUser(result.user);
        setDoc(doc(db, "users", result?.user?.email), {
          likeLists: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => console.log(error));
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle firebase auth change
  useEffect(() => {
    // const unRegisterAuthObserver = auth.onAuthStateChanged(async (CurrUser) => {
    //   console.log(CurrUser);
    //   if (!CurrUser) {
    //     console.log("user is not registered");
    //     return;
    //   }

    //   const token = await CurrUser.getIdToken();
    //   console.log(token);
    //   setUser(CurrUser);
    //   setCurrentUser(!!CurrUser);
    // });
    // return () => unRegisterAuthObserver();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        console.log("user is not registered");
      }
      setUser(currentUser);
      const token = await currentUser?.getIdToken();
      console.log(token);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  // const unRegisterAuthObserver = auth.onAuthStateChanged(async (CurrUser) => {
  //   console.log(CurrUser);
  //   if (!CurrUser) {
  //     console.log("user is not registered");
  //     return;
  //   }

  //   const token = await CurrUser.getIdToken();
  //   console.log(token);
  //   setUser(CurrUser);
  //   setCurrentUser(!!CurrUser);
  // });
  // return () => unRegisterAuthObserver();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        currentUser,
        updateUserProfile,
        logOut,
        signIn,
        signInGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
