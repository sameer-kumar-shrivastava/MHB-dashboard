// auth-context.js

import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRouter } from 'next/router';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user
        ? {
          isAuthenticated: true,
          isLoading: false,
          user,
        }
        : {
          isLoading: false,
        }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    console.log("signing out working")
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const isAuthenticated = () => {
    return Boolean(user);
  };

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      console.log('Is Authenticated:', isAuthenticated);
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      try {
        const idToken = localStorage.getItem('idToken');

        const response = await axios.get('https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/users/getUsers', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const users = response.data['AWS-result'];

        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: users,
        });
      } catch (error) {
        console.error('Error fetching user information:', error);
        // Handle error fetching user information if needed
      }
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io',
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signIn = async (email, password) => {
    console.log('Signing in...');
    try {
      const response = await axios.post('https://gbfgs2m6df.execute-api.us-west-1.amazonaws.com/dev/api/v1/public/signin', {
        email,
        password,
      });

      // Assuming your API response structure has a 'success' property
      if (response.data.success) {
        // You may need to adapt this based on the actual structure of your API response
        const user = response.data.data.AuthenticationResult;

        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user,
        });

        window.sessionStorage.setItem('authenticated', 'true');
      } else {
        // Handle unsuccessful login
        console.error('Authentication failed:', response.data.error);
        throw new Error('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred while processing the request:', error);
      throw new Error('An error occurred while processing your request.');
    }
  };


  const signUp = async (email, name, password) => {
    // Implementation for sign-up can be added here if needed
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    localStorage.removeItem('idToken');
    window.sessionStorage.clear();
    dispatch({
      type: HANDLERS.SIGN_OUT,
      payload: null,
    });
    router.push('/auth/login')
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        skip,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
