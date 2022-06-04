import { useState } from "react";

import { signInToAppWithGoogle, signOutFromApp } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const { isUserAuthorized } = useFirestore();

    const [userEmail, setUserEmail] = useState<string>('');
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [profileImg, setProfileImg] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const signInWithGoogle = async () : Promise<boolean> => {
        const credential = await signInToAppWithGoogle();
        const isAuthorized = await isUserAuthorized(credential.user.email);
        if (isAuthorized) {
            setUserEmail(credential.user.email!);
            setDisplayName(credential.user.displayName);
            setProfileImg(credential.user.photoURL);
            setIsLoggedIn(true); 
        }
        return isAuthorized;
    }

    const signOut = async () : Promise<void> => {
        await signOutFromApp().then(() => {
            setUserEmail('');
            setDisplayName(null);
            setProfileImg(null);
            setIsLoggedIn(false);
        });
    }

    const contextValue = { userEmail, displayName, profileImg, isLoggedIn, signInWithGoogle, signOut };
    return (
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;