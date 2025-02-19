import * as SecureStore from "expo-secure-store";
import { useState, createContext, useContext, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import PropTypes from "prop-types";
import axios from "axios";

const AuthProps = {
  authState: PropTypes.shape({
    token: PropTypes.string,
    authenticated: PropTypes.bool,
  }),
  onRegister: PropTypes.func,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://vlad-back.vercel.app/v1/api";
const AuthContext = createContext < AuthProps > {};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] =
    useState <
    {
      token: PropTypes.string,
      authenticated: PropTypes.bool,
    } >
    ({
      token: null,  
      authenticated: null,
    });
    useEffect(() => {
        const loadToken = async () => {
          const token = await SecureStore.getItemAsync(TOKEN_KEY);
          console.log('stored:', token);
      
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
            setAuthState({
              token: token,
              authenticated: true,
            });
          }
        };
      
        loadToken();
      }, []);
      

  const register = async (email, password) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return { error: true, msg: e.response?.data?.msg };
    }
  };
  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, { email, password });
      console.log("🚀 ~ file: AuthContext.tsx:41 ~ login ~ result:", result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return result;
    } catch (e) {
      return { error: true, msg: e.response?.data?.msg };
    }
  };
  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  
    // Update HTTP Headers
    axios.defaults.headers.common['Authorization'] = '';
  
    // Reset auth state
    setAuthState({
      token: null,
      authenticated: false
    });
  };
  

  const value = {
    onRegister: register,
    onLogin : login,
    onLogout: logout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
