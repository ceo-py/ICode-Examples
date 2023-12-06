import { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = getCookie('token');
    console.log(token)
    if (token) {
      dispatch({ type: 'LOGIN', payload: { token } });
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log('get cookie',value)
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  
  // Your other context provider logic...

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
