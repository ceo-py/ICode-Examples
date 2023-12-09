import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { selectedCourseSignal } from "../../SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "../../SelectMenu/SelectMenu";
import { useNavigate } from "react-router-dom";
import { capitalizeWord } from "../../../utils/capitalizeWord/capitalizeWord";
import { DropDownMenuIcon } from "../../DropDownMenuIcon/DropDownMenuIcon";
import { useState } from "react";
import { areAllValuesFilled } from "../../../utils/areAllValuesFilled/areAllValuesFilled";

const uploadFields = [
  {
    source: "task",
    description: "*Task name for the solution",
    iconUrl: "https://www.svgrepo.com/show/418007/edit-1.svg",
    urlStart:"",
    required: true,
  },
  {
    source: "video",
    description: "*Bring your solution to life with a video explanation link",
    urlStart:"",
    iconUrl: "https://www.svgrepo.com/show/418154/video.svg",
    required: false
  },
  {
    source: "github",
    description: "*Show your code with a GitHub link",
    urlStart: "https://github.com/",
    iconUrl: "https://www.svgrepo.com/show/475654/github-color.svg",
    required: true
  },
];

export function UploadContent() {
  const [input, setInput] = useState({
    video: "",
    task: "",
    github: "",
  });
  const navigate = useNavigate();

  const canUpload = () => {
    return (
      !selectedCourseSignal.value?.selectedModule ||
      !areAllValuesFilled(
        Object.fromEntries(
          Object.entries(input).filter(([key]) => key !== "video")
        )
      )
    );
  };

  return (
    <>
      <Card className="grow">
        <CardHeader className="justify-between">
          <SelectMenu menu={selectedCourseSignal} />
        </CardHeader>
        <CardBody className="px-3 py-10 text-small text-default-400 border-t-1 border-b-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
              <p className="flex text-default-500 text-large justify-center">
                Easily upload your task solution by first selecting your
                language, course, and module through our select menu above.
              </p>
              <p>
                *Share your solution visually—include a video explanation and/or
                upload the task code itself to offer a well-rounded perspective
                of your work.
                {console.log(selectedCourseSignal.value?.selectedModule)}
              </p>
              <div className="flex flex-col max-w-[600px] w-full items-end m-6 md:mb-0 gap-6">
                {uploadFields.map((o) => (
                  <Input
                    key={o.source}
                    type={o.source}
                    label={`${capitalizeWord(o.source)}`}
                    labelPlacement="outside"
                    description={o.description}
                    isRequired={o.required}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          {o?.urlStart}
                        </span>
                      </div>
                    }
                    endContent={
                      <DropDownMenuIcon alt={o.source} src={o?.iconUrl} />
                    }
                    value={input[o.source]}
                    onValueChange={(v) => setInput({ ...input, [o.source]: v })}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="gap-10 flex justify-center">
          <Button
            radius="full"
            size="sm"
            variant="bordered"
            onPress={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            radius="full"
            size="sm"
            variant="bordered"
            color={canUpload() ? "" : "success"}
            onPress={() => {
              console.log("test");
            }}
            isDisabled={canUpload()}
          >
            Upload
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
