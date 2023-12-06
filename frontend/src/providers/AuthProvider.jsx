import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  // signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import { getApi } from "../apis";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const url = "https://api.banglamartecommerce.com.bd";

const AuthProvider = ({ children }) => {
  const [language, setLanguage] = useState(true);

  const [user, setUser] = useState(null);
  // console.log(user);
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState(134);

  const [cart, setCart] = useState(null);
  const [cartUpdate, setCartUpdate] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    getApi("/cart/get", token)
      .then((res) => {
        setCart(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [userState, cartUpdate]);

  const createUser = async (route, data, token) =>
    axios.post(`${url}${route}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

  const currentUser = async (route, token) =>
    axios.get(`${url}${route}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  const signIn = async (route, data, token) =>
    axios.post(`${url}${route}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setUserState(345);
    setLoading(false);
    // return signOut(auth);
  };
  const updateUser = async (route, data, token) =>
    axios.put(`${url}${route}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

  useEffect(() => {
    setUserState(435);
    setUserState(4555);
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      currentUser("/auth/getUser", token)
        .then((res) => {
          setLoading(false);
          setUser(res.data.user);
        })
        .catch(() => {
          setLoading(false);

          setUser(null);
        });
    } else {
      // User is not authenticated
      setUser(null);
    }
  }, [userState]);
  const [conversationShow, setConversationShow] = useState(false);
  const [messages, setAllMessages] = useState(null);
  const [conversation, setConversation] = useState(null);

  const handleMessageShow = (conversation) => {
    setConversation(conversation)
    setConversationShow(!conversationShow);
    const token = localStorage.getItem("token");
    getApi(`/message/chats?conversationId=${conversation.id}`, token).then(
      (res) => {
        // const id = res.data.data.id;
        setAllMessages(res.data.data);

      }
    );
  };

  const authInfo = {
    user,
    setUserState,
    loading,
    createUser,
    signIn,
    cart,
    setCartUpdate,
    logOut,
    signInWithGoogle,
    updateUser,
    language, 
    setLanguage,
    handleMessageShow,
    conversationShow,
    messages,
    conversation,
    setConversationShow
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
