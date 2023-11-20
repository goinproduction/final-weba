import { createContext, useReducer } from 'react';
import axios from 'axios';
import { userReducer } from '../reducers/UserReducer';
import {
  LoginPayload,
  RegisterPayload,
  UpdatePayload,
  UserContextType,
} from '../interfaces/User';
import { apiUrl } from './const';

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    username: null,
    userId: null,
    fullName: null,
  });

  const login = async (payload: LoginPayload) => {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, payload);
      if (response.data.accessToken) {
        localStorage.setItem('LOCAL_STORAGE_TOKEN', response.data.accessToken);
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            userId: response.data.id,
            username: response.data.username,
            fullName: response.data.fullName,
          },
        });
      }
      return response.data;
    } catch (error) {
      return {
        isError: true,
        message: error.response.data.message,
      };
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const response = await axios.post(`${apiUrl}/user/register`, payload);
      return response.data;
    } catch (error) {
      return {
        isError: true,
        message: error.response.data.message,
      };
    }
  };

  const update = async (payload: UpdatePayload) => {
    try {
      const accessToken = localStorage.getItem('LOCAL_STORAGE_TOKEN');
      const response = await axios.put(
        `${apiUrl}/user/${payload.userId}`,
        payload,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return {
        isError: true,
        message: error.response.data.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('LOCAL_STORAGE_TOKEN');
    dispatch({
      type: 'REMOVE_AUTH',
      payload: {
        isAuthenticated: false,
        username: null,
        userId: null,
        fullName: null,
      },
    });
  };

  const contextValue = { login, userState, register, update, logout };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
