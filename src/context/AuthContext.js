import { Spin } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-app/config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [createdAtUser, setCreatedAtUser] = useState(
    JSON.parse(localStorage.getItem("isNewUser")) || []
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    // lưu thông tin currentUser
    const unsubscibed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        // setLoading(false)
        navigate("/");
        return;
      }
      // setUser({});
      setLoading(false);
      navigate("/login");
    });

    return () => {
      unsubscibed();
    };
  }, [navigate]);

  const value = { user, createdAtUser, setCreatedAtUser };
  // console.log(user);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Spin style={{ position: "fixed", inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
