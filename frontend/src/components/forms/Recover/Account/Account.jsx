import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { RESET_PASSWORD } from "../../../../graphql/queries/resetPassword";
import { useLazyQuery } from "@apollo/client";

export default function Account() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [credentialMsg, setCredentialMsg] = useState();
  const [resetPassword, { loading, data }] = useLazyQuery(RESET_PASSWORD);

  const handleResetPassword = () => {
    if (username.trim() === "" || email.trim() === "") return;
    try {
      resetPassword({
        variables: {
          input: {
            username,
            email,
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
    if (data?.getUsernameAndEmail?.code !== 200) {
      setCredentialMsg(data?.getUsernameAndEmail?.message);
    } else if (data?.getUsernameAndEmail?.code === 200) {
      setUsername("");
      setEmail("");
    }
  }, [loading, data]);

  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <Card className="max-w-full w-[340px] h-[320px]">
        <CardBody className="overflow-hidden">
          <p className="flex flex-col items-center justify-center mb-2">
            Forgot your password
          </p>
          <form className="flex flex-col gap-4">
            <Input
              isRequired
              isInvalid={credentialMsg ? true : false}
              label="Username"
              value={username}
              onValueChange={(v) => setUsername(v)}
              placeholder="Enter your Username"
              onKeyDown={(e) =>
                e.key === "Enter" ? handleResetPassword() : null
              }
            />
            <Input
              classNames={{
                helperWrapper: "relative",
              }}
              isRequired
              label="Email"
              isInvalid={credentialMsg ? true : false}
              value={email}
              onValueChange={(v) => setEmail(v)}
              placeholder="Enter your Email Address"
              errorMessage={credentialMsg}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleResetPassword() : null
              }
            />
            {data?.getUsernameAndEmail?.code === 200 && (
              <p className="flex flex-col items-start justify-start mb-2 text-tiny text-green-500">
                {data?.getUsernameAndEmail?.message}
              </p>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                isLoading={loading}
                color="primary"
                onPress={() => {
                  handleResetPassword();
                }}
              >
                Reset password
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
