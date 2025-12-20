import {
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // GithubAuthProvider,
  // sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
// import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const updateProfileFunc = (displayName, photoURL) => {
  //   setLoading(true);
  //   return updateProfile(auth?.currentUser, { displayName, photoURL });
  // };

  // const sendEmailVerificationFunc = () => {
  //   setLoading(true);
  //   return sendEmailVerification(auth?.currentUser);
  // };

  // const signInWithGithubPopupFunc = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, githubProvider);
  // };

  // const sendPasswordResetEmailFunc = (email) => {
  //   setLoading(true);
  //   return sendPasswordResetEmail(auth, email);
  // };

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileFunc = async (displayName, photoURL) => {
    try {
      setLoading(true);
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser({
        ...auth.currentUser,
        displayName,
        photoURL,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGooglePopupFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUserFunc = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signOutUserFunc,
    updateProfileFunc,
    signInWithGooglePopupFunc,
    signInWithEmailAndPasswordFunc,
    createUserWithEmailAndPasswordFunc,
    // sendEmailVerificationFunc,
    // signInWithGithubPopupFunc,
    // sendPasswordResetEmailFunc,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};
export default AuthProvider;
