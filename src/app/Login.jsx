import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    if (!onLogin) return;
  
    const result = await onLogin(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };
  
  // We automatically call the login after a successful registration
  const register = async () => {
    if (!onRegister) return;
  
    const result = await onRegister(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };
  

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
    {/* Поле Email */}
    <TextInput
      className="w-80 h-12 border border-gray-400 rounded-md px-3 mb-4"
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
    />

    {/* Поле Password */}
    <TextInput
      className="w-80 h-12 border border-gray-400 rounded-md px-3 mb-6"
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />

    {/* Кнопка Sign In */}
    <TouchableOpacity className="mb-4">
      <Text className="text-blue-600 text-lg font-semibold">Sign in</Text>
    </TouchableOpacity>

    {/* Кнопка Create Account */}
    <TouchableOpacity>
      <Text className="text-blue-600 text-lg font-semibold">Create Account</Text>
    </TouchableOpacity>
  </View>
);
};
  

export default Login;
