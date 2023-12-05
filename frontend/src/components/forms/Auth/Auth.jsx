import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";


export default function Auth() {
  const [selected, setSelected] = useState("login");

  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <Login setSelected={setSelected} />
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <SignUp setSelected={setSelected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
