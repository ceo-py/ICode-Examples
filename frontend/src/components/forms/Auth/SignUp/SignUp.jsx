import { Input, Link, Button } from "@nextui-org/react";
import { useMutation } from "@apollo/client";

import { useState } from "react";
import { SIGNUP_MUTATION } from "../../../../graphql/mutations/signUpMutation";

export default function SignUp({ setSelected }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signUp] = useMutation(SIGNUP_MUTATION);

  const handleSignUP = async () => {
    try {
      const { data } = await signUp({
        variables: {
          input: {
            username,
            password,
          },
        },
      });

      console.log("SignUp Successful:", data.register.code);
    } catch (error) {
      console.error("SignUp Error:", error.message);
    }
  };
  return (
    <form className="flex flex-col gap-4 h-[300px]">
      <Input
        isRequired
        label="Username"
        placeholder="Enter your username"
        value={username}
        onValueChange={(v) => setUsername(v)}
        type="username"
      />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        value={password}
        onValueChange={(v) => setPassword(v)}
        type="password"
        autoComplete="new-password"
      />
      <p className="text-center text-small">
        Already have an account?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("login")}
        >
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color="primary"
          onClick={() => {
            handleSignUP();
          }}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}