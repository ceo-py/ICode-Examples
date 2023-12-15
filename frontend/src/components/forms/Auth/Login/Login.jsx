import { Input, Link, Button } from "@nextui-org/react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../../../graphql/mutations/loginMutation";
import { useState } from "react";
import { useAuth } from "../../../../AuthContext/AuthContext";

export default function Login({ setSelected }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuth();

  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: { username, password },
      });
      if (data.login.code === 200) {
        const iconUrl = data.login.iconUrl;
        dispatch({ type: "LOGIN", payload: { username, iconUrl } });
      }
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <Input
        isRequired
        label="Username"
        value={username}
        onValueChange={(v) => setUsername(v)}
        placeholder="Enter your username"
        type="username"
      />
      <Input
        isRequired
        label="Password"
        value={password}
        onValueChange={(v) => setPassword(v)}
        placeholder="Enter your password"
        type="password"
        autoComplete="new-password"
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
