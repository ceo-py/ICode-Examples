import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useState } from "react";
import { passwordValidation } from "../../../utils/passwordValidation/passwordValidation";

export default function Account() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credentialMsg, setCredentialMsg] = useState();

  const handleResetPassword = () => {
    const isPasswordValid = passwordValidation(password);
    const isPasswordTheSame = password === confirmPassword ? "" : "Enter the same password in both fields. ";

    if (isPasswordValid) {
      setCredentialMsg(`${isPasswordTheSame}${isPasswordValid}`);
      return;
    }

    setCredentialMsg("");
  };

  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <Card className="max-w-full w-[340px] h-[320px]">
        <CardBody className="overflow-hidden">
          <p className="flex flex-col items-center justify-center mb-2">
            Reset Password
          </p>
          <form className="flex flex-col gap-4">
            <Input
              isRequired
              isInvalid={credentialMsg ? true : false}
              label="Password"
              value={password}
              onValueChange={(v) => setPassword(v)}
              placeholder="New Password"
              type="Password"
            />
            <Input
              classNames={{
                helperWrapper: "relative",
              }}
              isRequired
              label="Confirm Password"
              isInvalid={credentialMsg ? true : false}
              value={confirmPassword}
              onValueChange={(v) => setConfirmPassword(v)}
              placeholder="Confirm New Password"
              type="Password"
              autoComplete="confirm-Password"
              errorMessage={credentialMsg}
            />
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                color="primary"
                onPress={() => {
                  handleResetPassword();
                }}
              >
                Reset Password
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
