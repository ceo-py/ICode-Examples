import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { selectedCourseSignal } from "../../SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "../../SelectMenu/SelectMenu";
import { useNavigate } from "react-router-dom";

export function UploadContent() {
  const navigate = useNavigate();

  return (
    <>
      <Card className="grow">
        <CardHeader className="justify-between">
          <SelectMenu menu={selectedCourseSignal} />
        </CardHeader>
        <CardBody className="px-3 py-10 text-small text-default-400 bg-default">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
              <p className="flex text-default-500 text-small justify-center">
                User Profile Update
              </p>
              <p>Push the tempo</p>
              {/* <div className="flex flex-col max-w-[600px] w-full items-end mb-6 md:mb-0 gap-4">
                  {Object.keys(user)
                    .slice(3)
                    .map((key) => (
                      <Input
                        key={key}
                        type={key}
                        label={`Change ${capitalizeWord(key)}`}
                        labelPlacement="outside"
                        value={user[key]}
                        onValueChange={(v) => setUser({ ...user, [key]: v })}
                      />
                    ))}
                </div> */}
            </div>
          </div>
        </CardBody>
        <CardFooter className="gap-10 flex justify-center">
          <Button
            radius="full"
            size="lg"
            variant="bordered"
            onPress={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            radius="full"
            size="lg"
            variant="bordered"
            onPress={() => {
              console.log("test");
            }}
          >
            Upload
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
