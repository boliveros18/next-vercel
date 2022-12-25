import { FC, useReducer, useEffect, ReactNode } from 'react';
import { AuthContext, authReducer } from './';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

import { entriesApi } from '../../apis';
import { User } from '../../interfaces';

export interface AuthState {
    isLoggedIn: boolean;
    user?: User;
}


interface Props {
    children?: ReactNode;
  }

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<Props> = ({ children }) => {
    const router = useRouter();
    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {

        try {
            const { data } = await entriesApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await entriesApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await entriesApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Failed to create user - try again'
            }
        }
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        router.reload();
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
};