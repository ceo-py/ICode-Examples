import { createContext, useContext, useReducer, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FIND_TOKEN_QUERY } from "../graphql/queries/findTokenQuery";

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { loading, error, data } = useQuery(FIND_TOKEN_QUERY);

  useEffect(() => {
    if (!loading && !error && data) {
      const token = data.findToken.token;
      console.log(token)
      if (token) {
        dispatch({ type: "LOGIN", payload: { token } });
      }
    }
  }, [loading, error, data]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
