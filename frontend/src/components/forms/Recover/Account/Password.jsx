import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { passwordValidation } from "../../../utils/passwordValidation/passwordValidation";
import { RESET_PASSWORD_MUTATION } from "../../../../graphql/mutations/resetPassword";
import { useMutation } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

export default function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credentialMsg, setCredentialMsg] = useState();
  const [searchParams] = useSearchParams();
  const [resetPassword, { loading, data }] = useMutation(
    RESET_PASSWORD_MUTATION
  );

  const handleResetPassword = async () => {
    const token = searchParams.get("account");
    if (!token) return;
    const isPasswordValid = passwordValidation(password);
    const isPasswordTheSame =
      password === confirmPassword
        ? ""
        : "Enter the same password in both fields. ";

    if (isPasswordValid || isPasswordTheSame) {
      setCredentialMsg(
        `${isPasswordTheSame}${isPasswordValid ? isPasswordValid : ""}`
      );
      return;
    }

    try {
      await resetPassword({
        variables: {
          input: {
            token,
            password,
          },
        },
      });
    } catch (error) {
      serverError();
    }
    setCredentialMsg("");
  };

  useEffect(() => {
    if (loading && !data) return;
    if (data?.resetPassword?.code !== 200) {
      setCredentialMsg(data?.resetPassword?.message);
    } else if (data?.resetPassword?.code === 200) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [loading, data]);

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
              label="New Password"
              value={password}
              onValueChange={(v) => setPassword(v)}
              placeholder="New Password"
              type="Password"
              onKeyDown={(e) =>
                e.key === "Enter" ? handleResetPassword() : null
              }
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
              onKeyDown={(e) =>
                e.key === "Enter" ? handleResetPassword() : null
              }
            />
            {data?.resetPassword?.code === 200 && (
              <p className="flex flex-col items-start justify-start mb-2 text-tiny text-green-500">
                {data?.resetPassword?.message}
              </p>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                color="primary"
                isLoading={loading}
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
