import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import configDB from "../database/database";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await configDB.post("/connexion", data);

      setUserInfo(response.data.user);
      setUserToken(response.data.token);

      AsyncStorage.setItem("AccessToken", response.data.token);
      AsyncStorage.setItem("UserInfo", JSON.stringify(response.data.user));

      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("AccessToken");
    AsyncStorage.removeItem("UserInfo");
    setIsLoading(false);
  };

  const deleteAccount = async (idUser) => {
    const response = await configDB.delete(`/users/${idUser}`);
    console.log("response: ", response);
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.clear();
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("AccessToken");
      let userInfo = await AsyncStorage.getItem("UserInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Erreur login: ", error);
    }
  };

  const getConfig = async () => {
    if (userToken) {
      return {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
    } else {
      throw new Error("User is not authenticated");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        setIsLoading,
        userToken,
        userInfo,
        setUserInfo,
        deleteAccount,
        getConfig,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
