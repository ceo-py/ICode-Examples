import { Input, Link, Button } from "@nextui-org/react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../../../graphql/mutations/loginMutation";
import { useState } from "react";
import { useAuth } from "../../../../AuthContext/AuthContext";
import serverError from "../../../utils/serverError/serverError";
import { useNavigate } from "react-router-dom";

export default function Login({ setSelected }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialMsg, setCredentialMsg] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    setCredentialMsg("");
    try {
      const { data } = await login({
        variables: { username, password },
      });
      if (data.login.code === 200) {
        const iconUrl = data.login.iconUrl;
        dispatch({ type: "LOGIN", payload: { username, iconUrl } });

        navigate(-1);
      } else if (data?.login?.code) {
        setCredentialMsg(data.login.message);
      }
    } catch (error) {
      serverError();
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <Input
        isRequired
        isInvalid={credentialMsg ? true : false}
        label="Username"
        value={username}
        onValueChange={(v) => setUsername(v)}
        placeholder="Enter your username"
        type="username"
        onKeyDown={(e) => e.key === "Enter"? handleLogin(): null}
      />
      <Input
        isRequired
        label="Password"
        isInvalid={credentialMsg ? true : false}
        value={password}
        onValueChange={(v) => setPassword(v)}
        placeholder="Enter your password"
        type="password"
        autoComplete="new-password"
        errorMessage={credentialMsg}
        onKeyDown={(e) => e.key === "Enter"? handleLogin(): null}
      />
      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("sign-up")}
        >
          Sign up
        </Link>
      </p>
      <p className="text-center text-small">
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => navigate('/recover-account')}
        >
          Forgot password
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color="primary"
          onPress={() => {
            handleLogin();
          }}
        >
          Login
        </Button>
      </div>
    </form>
  );
}
