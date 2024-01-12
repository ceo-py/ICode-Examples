import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { AuthProvider } from "./AuthContext/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ShareProvider } from "./MenuContext/MenuContext.jsx";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ShareProvider>
          <React.StrictMode>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </React.StrictMode>
        </ShareProvider>
      </AuthProvider>
    </ApolloProvider>
  </BrowserRouter>
);
