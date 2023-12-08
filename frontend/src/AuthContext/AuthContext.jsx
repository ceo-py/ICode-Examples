import { createContext, useContext, useReducer, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FIND_TOKEN_QUERY } from "../graphql/queries/findTokenQuery";

const initialState = {
  isAuthenticated: false,
  username: null,
  iconUrl: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        username: action.payload.username,
        iconUrl: action.payload.iconUrl,
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
      const username = data.findToken.username;
      const iconUrl = data.findToken.iconUrl;
      if (username) {
        dispatch({ type: "LOGIN", payload: { username,  iconUrl} });
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
