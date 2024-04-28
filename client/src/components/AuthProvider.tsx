import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { User } from "../types/User";
import Cookies from "universal-cookie";
import axios from "axios";

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({
  children,
  isSignedIn,
}: AuthProviderProps) {
  // Uses `isSignedIn` prop to determine whether or not to render a user

  const cookies = new Cookies(null, { path: "/" });

  const token = cookies.get("token");
  if (token) {
    isSignedIn = true;
  }
   
 
  // isSignedIn = true;

  const [user, setUser] = useState<any>(null);


  useEffect(()=>{
    const getUser = async()=>{
      const response = await axios.get("/users/token");
      // console.log(response)
      setUser(response.data);
    }
    if(token){
      getUser();
    }
  },[])

  
  // const [user, setUser] = useState<User | null>(isSignedIn ? { id: 1 } : null);
  // const [user, setUser] = useState<User | null>(null);
  
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
