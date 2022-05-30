import { createContext,useEffect, useState,useContext } from "react";
import Loading from "./components/Loading";
import nookies from "nookies";
import { Router, useRouter } from "next/router";
import { auth } from "./firebase";
const AuthContext = createContext({});

 export const AuthProvider = ({children}) => {
	 const [currentUser, setCurrentUser] = useState(null);
	 const [loading, setLoading] = useState(true);
	 const router = useRouter();
	 useEffect(() => {
	
		 return auth.onIdTokenChanged(async (user) => {
			 if (!user) {
				console.log('no user'); 
				setCurrentUser(null);
				setLoading(false);
				nookies.set(null, "token", "", {});
				return;
			 }
			 const token = await user.getIdToken();
			 console.log('token',token);
			 console.log('user',user);
			 nookies.set(null, "token", token, {});
			 setCurrentUser(user);
			 setLoading(false);
		 })
	 },[]);

	 if (loading) {
		return <Loading type="bubbles" color="yellowgreen"/>
	 }
	
		return <AuthContext.Provider value={{currentUser}}>
		{children}
	</AuthContext.Provider>
	 
	
}

export const useAuth=()=> useContext(AuthContext);
