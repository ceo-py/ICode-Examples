import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { selectedCourseSignal } from "../../SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "../../SelectMenu/SelectMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { capitalizeWord } from "../../../utils/capitalizeWord/capitalizeWord";
import { DropDownMenuIcon } from "../../DropDownMenuIcon/DropDownMenuIcon";
import { useEffect, useState } from "react";
import { areAllValuesFilled } from "../../../utils/areAllValuesFilled/areAllValuesFilled";
import { useLazyQuery, useMutation } from "@apollo/client";
import serverError from "../../../utils/serverError/serverError";
import { checkValidGithubAddress } from "../../../utils/URLInputValidation/isValidGitHubUrl";
import { TASK_UPDATE_MUTATION } from "../../../../graphql/mutations/taskUpdateMutation";
import { TASK_DETAILS_FOR_UPDATE_QUERY } from "../../../../graphql/queries/getTaskDetailsForUpdate";
import { LoadingCircle } from "../../LoadingCIrcle/LoadingCircle";
import { NotFound } from "../../NotFound/NotFound";
import { languages } from "../../SelectMenu/SelectLanguage/data";
import DeleteTaskModal from "./DeleteTaskModal/DeleteTaskModal";

const uploadFields = [
  {
    source: "task",
    description: "*Update Task name",
    iconUrl: "https://www.svgrepo.com/show/418007/edit-1.svg",
    urlStart: "",
    required: true,
  },
  {
    source: "video",
    description: "*Update your video link",
    urlStart: "",
    iconUrl: "https://www.svgrepo.com/show/418154/video.svg",
    required: false,
  },
  {
    source: "github",
    description: "*Update your GitHub link",
    urlStart: "https://github.com/",
    iconUrl: "https://www.svgrepo.com/show/475654/github-color.svg",
    required: true,
  },
];

export function EditTask() {
  const [inputFields, setInputFields] = useState({
    video: "",
    task: "",
    github: "",
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();
  const [taskUpdate] = useMutation(TASK_UPDATE_MUTATION);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [taskDetails, { loading, data, refetch }] = useLazyQuery(
    TASK_DETAILS_FOR_UPDATE_QUERY
  );
  const [selectMenu, setSelectMenu] = useState({});
  const [searchParams] = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const canEdit = () => {
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
    const isValid = await checkValidGithubAddress(userData.github);
    setUpdateMessage("Task details updated successfully");
    if (!isValid) {
      setUpdateMessage("Error provided GitHub URL seems to be invalid.");
      resetMessage();
      return;
    }
    try {
      const { data } = await taskUpdate({
        variables: {
          input: {
            taskName: userData.task,
            language: selectedCourseSignal.value?.name.language,
            course: selectedCourseSignal.value?.selectedCourse,
            module: selectedCourseSignal.value?.selectedModule,
            videoLink: userData.video,
            githubLink: userData.github.replace("https://github.com/", ""),
            taskId: searchParams.get("id"),
          },
        },
      });
    } catch (error) {
      serverError();
      setUpdateMessage("Error task edit unsuccessful");
    }
    resetMessage();
  };

  const getTaskLangModuleCourse = (language, module, course) => {
    const languageData = Object.values(languages).find(
      (y) => y?.name?.language === language
    );
    setSelectMenu({
      ...languageData,
      ...{ module: languageData.modules[course] },
      ...{ selectedCourse: course },
      ...{ selectedModule: module },
    });
  };

  useEffect(() => {
    selectedCourseSignal.value = selectMenu;
  }, [selectMenu]);

  useEffect(() => {
    if (!searchParams.get("id")) return;
    try {
      taskDetails({
        variables: {
          input: {
            id: searchParams.get("id"),
          },
        },
      });
    } catch (error) {
      serverError();
    }
  }, []);

  useEffect(() => {
    if (data?.getTaskDetailsForUpdate?.status?.code === 200) {
      getTaskLangModuleCourse(
        data.getTaskDetailsForUpdate.language,
        data.getTaskDetailsForUpdate.module,
        data.getTaskDetailsForUpdate.course
      );
      setInputFields({
        video: data.getTaskDetailsForUpdate.videoLink,
        github: data.getTaskDetailsForUpdate.githubLink,
        task: data.getTaskDetailsForUpdate.taskName,
      });
    }
  }, [data?.getTaskDetailsForUpdate]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : data?.getTaskDetailsForUpdate?.status?.code !== 200 ? (
        <NotFound />
      ) : (
        <Card className="grow">
          <CardHeader className="justify-between">
            {(selectedCourseSignal.value?.name ||
              !selectedCourseSignal.value) && (
              <SelectMenu menu={selectedCourseSignal} />
            )}
          </CardHeader>
          <CardBody className="px-3 py-10 text-small text-default-400 border-t-1 border-b-1">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 items-center">
                <p className="flex text-default-500 text-large justify-center">
                  Easily edit your task.
                </p>
                <p
                  className={
                    getFilledReqFields() === 5
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {`**To edit your task solution, kindly complete 5 / ${getFilledReqFields()} required fields as indicated.`}
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
                      value={inputFields[o.source]}
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
              <p className="m-2 flex justify-center font-bold">
                {updateMessage}
              </p>{" "}
              <Progress
                aria-label="Loading..."
                size="sm"
                value={progressBarValue}
                color={updateMessage.includes("Error") ? "danger" : "success"}
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
              color={canEdit() ? "" : "success"}
              onPress={() => {
                handleUserUpdate(inputFields);
              }}
              isDisabled={canEdit()}
            >
              Edit
            </Button>
            <Button
              className="hover:bg-default/40"
              radius="full"
              size="sm"
              variant="bordered"
              color={"danger"}
              onPress={onOpen}
            >
              Delete task
            </Button>
            <DeleteTaskModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </CardFooter>
        </Card>
      )}
    </>
  );
}
