import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useState } from "react";

export default function Account() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [credentialMsg, setCredentialMsg] = useState();

  const handleResetPassword = () => {

    console.log(email)
    console.log(username)

    setCredentialMsg("");
  };

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
              onKeyDown={(e) => e.key === "Enter"? handleResetPassword(): null}
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
              onKeyDown={(e) => e.key === "Enter"? handleResetPassword(): null}
            />
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
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
