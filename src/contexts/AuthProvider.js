import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/init";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [localUser, setLocalUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    async function fetchUserList() {
      let { data: users, error } = await supabase.from("users").select("*");
      setUserList(users);
    }
    if (loggedIn === true) {
      fetchUserList();
    }
    return;
  }, [loggedIn]);

  //login submit callback
  const handleLogin = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    setUser(user);
    setLoggedIn(true);
    // localStorage.setItem("user", user);
    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
    if (error) {
      //TODO: change window alert to friendlier helper text for better UX
      console.log(error.message);
      window.alert(error.message);
      setLoggedIn(false);
    }
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     const currentUser = localStorage.getItem("user");
  //     // const parsedLocalUser = JSON.parse(currentUser)
  //     setLocalUser(currentUser);
  //     console.log(localUser);
  //     console.log(user);
  //   }
  // });
  
//Register user
  const handleRegister = async (username, email, password) => {
    console.log(email);

    if (!username || !email || !password) {
      alert("Please complete all fields");
    } else {
      const { user, error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: {
            username: username,
          },
        }
      );
      alert("An email has been sent to you for verification");
      if (error) {
        console.log(error.message);
        window.alert(error.message);
      }
    }
  };
  //Reset Password
    const handleReset = async (email) => {
    let { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
    alert("A reset link has been sent to the email provided");
  };

  const value = {
    user,
    userList,
    onLogin: handleLogin,
    onRegister: handleRegister,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
