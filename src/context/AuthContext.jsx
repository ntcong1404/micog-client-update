import { createContext, useContext, useState } from "react";
import * as Service from "../apiService/Service";
import { useEffect } from "react";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUser = async () => {
      const accessToken = localStorage.getItem("micog");
      if (accessToken) {
        const { res, err } = await Service.getInfo();
        if (res) setUser(res);
        if (err) setUser(null);
      } else {
        setUser(null);
      }
    };

    authUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
