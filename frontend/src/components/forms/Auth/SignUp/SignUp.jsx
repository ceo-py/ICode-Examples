import { Input, Link, Button } from "@nextui-org/react";
import { useMutation } from "@apollo/client";

import { useState } from "react";
import { SIGNUP_MUTATION } from "../../../../graphql/mutations/signUpMutation";
import { useAuth } from "../../../../AuthContext/AuthContext";
import serverError from "../../../utils/serverError/serverError";
import { passwordValidation } from "../../../utils/passwordValidation/passwordValidation";
import { usernameValidation } from "../../../utils/usernameValidation/usernameValidation";
import { useNavigate } from "react-router-dom";
import { MetaTags } from "../../../ui/MetaTags/MetaTags";

export default function SignUp({ setSelected }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION);

  const handleSignUP = async () => {
    const isPasswordValid = passwordValidation(password);
    const isUsernameValid = usernameValidation(username);
    if (isPasswordValid || isUsernameValid) {
      setPasswordMsg(isPasswordValid);
      setUsernameMsg(isUsernameValid);
      return;
    }
    setPasswordMsg("");
    setUsernameMsg("");
    try {
      const { data } = await signUp({
        variables: {
          input: {
            username,
            password,
          },
        },
      });
      if (data.register.code === 200) {
        const iconUrl = data.register.iconUrl;
        dispatch({ type: "LOGIN", payload: { iconUrl, username } });
        navigate(-1);
      } else if (data?.register?.code) {
        setUsernameMsg(data.register.message);
      }
    } catch (error) {
      serverError();
    }
  };
  return (
    <>
      <MetaTags
        title="Sign Up"
        description="Unlock the full potential of iCode Example by signing up. With your account, you can upload, edit, and delete problem solutions, and engage with others through comments. Join now and become part of our vibrant coding community!"
        keywords={`icode example, Sign up, Register, Create account, New user registration`}
      />
      <form className="flex flex-col gap-4 h-[300px]">
        <Input
          classNames={{
            helperWrapper: "relative",
          }}
          isRequired
          isInvalid={usernameMsg ? true : false}
          label="Username"
          placeholder="Enter your username"
          value={username}
          onValueChange={(v) => setUsername(v)}
          type="username"
          errorMessage={usernameMsg}
          onKeyDown={(e) => (e.key === "Enter" ? handleSignUP() : null)}
        />
        <Input
          classNames={{
            helperWrapper: "relative",
          }}
          isRequired
          isInvalid={passwordMsg ? true : false}
          label="Password"
          placeholder="Enter your password"
          value={password}
          onValueChange={(v) => setPassword(v)}
          type="password"
          autoComplete="new-password"
          errorMessage={passwordMsg}
          onKeyDown={(e) => (e.key === "Enter" ? handleSignUP() : null)}
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
            isLoading={loading}
            onClick={() => {
              handleSignUP();
            }}
          >
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
}
