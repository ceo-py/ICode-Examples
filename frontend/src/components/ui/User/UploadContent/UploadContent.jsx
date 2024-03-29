import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import { selectedCourseSignal } from "../../SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "../../SelectMenu/SelectMenu";
import { useNavigate } from "react-router-dom";
import { capitalizeWord } from "../../../utils/capitalizeWord/capitalizeWord";
import { DropDownMenuIcon } from "../../DropDownMenuIcon/DropDownMenuIcon";
import { useState } from "react";
import { areAllValuesFilled } from "../../../utils/areAllValuesFilled/areAllValuesFilled";
import { useMutation } from "@apollo/client";
import { TASK_CREATE_MUTATION } from "../../../../graphql/mutations/taskCreateMutation";
import serverError from "../../../utils/serverError/serverError";
import { checkValidGithubAddress } from "../../../utils/URLInputValidation/isValidGitHubUrl";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet";

const uploadFields = [
  {
    source: "task",
    description: "*Task name for the solution",
    iconUrl: "https://www.svgrepo.com/show/418007/edit-1.svg",
    urlStart: "",
    required: true,
  },
  {
    source: "video",
    description: "*Bring your solution to life with a video explanation link",
    urlStart: "",
    iconUrl: "https://www.svgrepo.com/show/418154/video.svg",
    required: false,
  },
  {
    source: "github",
    description: "*Show your code with a GitHub link",
    urlStart: "https://github.com/",
    iconUrl: "https://www.svgrepo.com/show/475654/github-color.svg",
    required: true,
  },
];

export function UploadContent() {
  const [inputFields, setInputFields] = useState({
    video: "",
    task: "",
    github: "",
  });
  const [isProject, setIsProject] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();
  const [taskCreate, { loading }] = useMutation(TASK_CREATE_MUTATION);
  const [progressBarValue, setProgressBarValue] = useState(0);

  const canUpload = () => {
    return (
      !selectedCourseSignal.value?.selectedModule ||
      !areAllValuesFilled(
        Object.fromEntries(
          Object.entries(inputFields).filter(([key]) => key !== "video")
        )
      )
    );
  };

  const updateCount = () => {
    setProgressBarValue((v) => v + 20);
  };

  const resetMessage = () => {
    setProgressBarValue(20);
    const intervalId = setInterval(updateCount, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      setUpdateMessage("");
    }, 5000);
  };

  const getFilledReqFields = () => {
    let counter = 0;
    if (inputFields.task.trim()) counter += 1;
    if (inputFields.github.trim()) counter += 1;
    if (selectedCourseSignal.value?.selectedModule) counter += 1;
    if (selectedCourseSignal.value?.selectedCourse) counter += 1;
    if (selectedCourseSignal.value?.modules) counter += 1;
    return counter;
  };

  const handleUserUpdate = async (userData) => {
    if (!isProject) {
      const isValid = await checkValidGithubAddress(userData.github);
      if (!isValid) {
        setUpdateMessage("Provided GitHub URL seems to be invalid.");
        resetMessage();
        return;
      }
    }

    try {
      const { data } = await taskCreate({
        variables: {
          input: {
            taskName: userData.task,
            language: selectedCourseSignal.value?.name.language,
            course: selectedCourseSignal.value?.selectedCourse,
            module: selectedCourseSignal.value?.selectedModule,
            videoLink: userData.video,
            githubLink: userData.github.replace("https://github.com/", ""),
            project: isProject,
          },
        },
      });
      setUpdateMessage(data.uploadTask.message);
      setInputFields({ video: "", task: "", github: "" });
    } catch (error) {
      serverError();
      setUpdateMessage("Task upload unsuccessful");
    }
    resetMessage();
  };

  return (
    <>
      <Helmet>
        <title>Upload Solution - iCode Example</title>
      </Helmet>
      <Card className="grow">
        <CardHeader className="justify-between">
          <SelectMenu menu={selectedCourseSignal} />
        </CardHeader>
        <CardBody className="px-3 py-10 text-small text-default-400 border-t-1 border-b-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
              <p className="flex text-default-500 text-large justify-center text-center">
                Easily upload your task by first selecting your language,
                course, and module through our select menu above.
              </p>
              <p className="text-center">
                *Share your solution visually—include a video explanation and/or
                upload the task code itself to offer a well-rounded perspective
                of your work.
              </p>
              <p
                className={`${
                  getFilledReqFields() === 5 ? "text-green-500" : "text-red-500"
                } text-center`}
              >
                {`**To upload your task solution, kindly complete 5 / ${getFilledReqFields()} required fields as indicated.`}
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
                    value={DOMPurify.sanitize(inputFields[o.source])}
                    onValueChange={(v) =>
                      setInputFields({ ...inputFields, [o.source]: v })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </CardBody>
        {updateMessage && (
          <div className="flex flex-col">
            <p className="m-2 flex justify-center font-bold">{updateMessage}</p>{" "}
            <Progress
              aria-label="Loading..."
              size="sm"
              value={progressBarValue}
              color={
                updateMessage.includes("invalid") ||
                updateMessage.includes("Error")
                  ? "danger"
                  : "success"
              }
              className="flex"
            />
          </div>
        )}
        <CardFooter className="gap-10 flex justify-center">
          <Button
            className="hover:bg-default/40"
            radius="full"
            size="sm"
            variant="bordered"
            onPress={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            className="hover:bg-default/40"
            radius="full"
            size="sm"
            variant="bordered"
            color={canUpload() ? "" : "success"}
            isLoading={loading}
            onPress={() => handleUserUpdate(inputFields)}
            isDisabled={canUpload()}
          >
            Upload
          </Button>
          <Tooltip
            showArrow={true}
            placement="top"
            key="FullProject"
            content="Uploads a solution for a single task, comprising multiple files and directories. [URL to Main Folder]*"
            color="primary"
          >
            <div>
              <Checkbox
                radius="full"
                size="sm"
                onValueChange={(e) => setIsProject(e)}
              >
                Full Project*
              </Checkbox>
            </div>
          </Tooltip>
        </CardFooter>
      </Card>
    </>
  );
}
