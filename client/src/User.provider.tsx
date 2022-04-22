import React, {createContext, useEffect, useState} from "react";
import { fetchUser } from "./services/backService";
import { DbBeer } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';


type UserData = {
  username: string,
  email:string,
  id: number,
  beers: DbBeer[]
}


const setUserData = async (userData: UserData) => {
  const datakey = String(userData.id);
  try {
    await AsyncStorage.setItem(datakey, JSON.stringify(userData));
  } catch (error) {
    
  }
}

const getUserData = async (userid: number): Promise<UserData | null> => {
  const datakey = String(userid);
  try {
    const result = await AsyncStorage.getItem(datakey);
    if (result) return JSON.parse(result);
    else return null;
  } catch (error) {
    return null;
  }
}


type UserContextType = {
  user?: UserData,
  isLogged?: boolean,
  login: (userData: UserData) => void,
  logout: () => void,
  updateUser: (newUser: UserData) => void
}

const UserContext = createContext<UserContextType>({
  user: {
    username: '',
    beers: [],
    email: '',
    id: -1
  },
  login: () => {},
  logout: () => {},
  isLogged: false,
  updateUser: () => {}
});

export const UserProvider: React.FC = ({children}) => {

  const [user, setUser] = useState<UserData>();
  const [isLogged, setLogged] = useState(false);


  const login = async (userData: UserData) => {
    setLogged(true);
    await setUserData(userData);
    const u = await getUserData(userData.id);
    if (u) setUser(u);
  };

  const logout = () => {
    setLogged(false);
    setUser(undefined);
  };

  // useEffect(() => {
  //   const getUser = async () => {
  //     const data = await fetchUser();

  //     console.warn('USER', data); // TODO remove

  //     if (data) setUser(data);
  //   };
  //   getUser();
  // }, [isLogged]);



  return (
    <UserContext.Provider value={{user: user, isLogged: isLogged, login, logout, updateUser: setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => React.useContext(UserContext);