export default interface AuthContextType {
    userEmail : any,
    displayName : any,
    profileImg : any,
    isLoggedIn : any,
    signInWithGoogle : () => Promise<boolean>,
    signOut : () => Promise<void>,
}