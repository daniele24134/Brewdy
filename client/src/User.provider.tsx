import React, {createContext, useEffect, useState} from "react";
import { fetchUser } from "./services/backService";
import { DbBeer, User } from "./types";


type UserContextType = {
  username?:string,
  email?:string,
  beers?: DbBeer[],
  isLogged?: boolean,
  login: () => void,
  logout: () => void,
}

const UserContext = createContext<UserContextType>({
  username: '',
  email: '',
  beers: [],
  login: () => {},
  logout: () => {},
  isLogged: false
});

export const UserProvider: React.FC = ({children}) => {

  const [user, setUser] = useState<User>();
  const [isLogged, setLogged] = useState(false);


  const login = () => setLogged(true);
  const logout = () => setLogged(false);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser();

      console.warn('USER', data); // TODO remove

      if (data) setUser(data);
    };
    getUser();
  }, [isLogged]);



  return (
    <UserContext.Provider value={{...user, isLogged: isLogged, login, logout}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => React.useContext(UserContext);