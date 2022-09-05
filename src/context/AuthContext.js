import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-app/config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [createdAtUser, setCreatedAtUser] = useState(
    JSON.parse(localStorage.getItem("isNewUser")) || []
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //lưu thông tin currentUser
    const unsubscibed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // let { displayName, email, uid, photoURL } = user;
        setUser(user);
        navigate("/");
        return;
      }
      navigate("/login");
    });

    return () => {
      unsubscibed();
    };
  }, [navigate]);
  useEffect(() => {

  }, [])
  const value = { user, createdAtUser, setCreatedAtUser };
  // console.log(user);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
