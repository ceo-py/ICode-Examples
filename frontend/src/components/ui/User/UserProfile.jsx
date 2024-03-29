import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  useDisclosure,
  Avatar,
  Progress,
} from "@nextui-org/react";
import { GET_USER_DETAILS } from "../../../graphql/queries/userQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { numbersFormat } from "../../utils/numberFormat/numberFormat";
import { capitalizeWord } from "../../utils/capitalizeWord/capitalizeWord";
import { useNavigate } from "react-router-dom";
import { USER_UPDATE_MUTATION } from "../../../graphql/mutations/userUpdateDetails";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import UserProfileDeleteModal from "./UserProfileDeleteModal/UserProfileDeleteModal";
import { useAuth } from "../../../ContextGlobal/AuthContext";
import serverError from "../../utils/serverError/serverError";
import { isValidUrl } from "../../utils/URLInputValidation/isValidUrl";
import { isValidEmail } from "../../utils/emailValidation/isValidEmail";
import { zoomAndClick } from "../../utils/css/zoomAndClick";
import DOMPurify from "dompurify";
import { MetaTags } from "../MetaTags/MetaTags";

export function UserProfile() {
  const { loading, error, data, refetch } = useQuery(GET_USER_DETAILS);
  const [user, setUser] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userUpdate, { loading: userUpdateLoading }] =
    useMutation(USER_UPDATE_MUTATION);
  const { state, dispatch } = useAuth();
  const [correctURLS, setCorrectURLS] = useState({
    icon: false,
    email: false,
    youtube: false,
    github: false,
    linkedin: false,
    about: false,
  });
  const [progressBarValue, setProgressBarValue] = useState(0);

  const updateCount = () => {
    setProgressBarValue((v) => v + 20);
  };

  const isInputFieldsValid = () => {
    return {
      email: user.email.trim() ? !isValidEmail(user.email) : false,
      youtube: user.youtube.trim()
        ? !isValidUrl("youtube", user.youtube)
        : false,
      github: user.github.trim() ? !isValidUrl("github", user.github) : false,
      linkedin: user.linkedin.trim()
        ? !isValidUrl("linkedin", user.linkedin)
        : false,
    };
  };

  const handleUserUpdate = async (userData) => {
    const validateFields = isInputFieldsValid();
    setCorrectURLS({ ...correctURLS, ...validateFields });
    if (Object.values(validateFields).every((x) => x === false)) {
      const updateFields = (userData) => {
        const [, , , ...remainingKeys] = Object.keys(userData);
        const remainingObject = Object.fromEntries(
          Object.entries(userData).filter(([key]) =>
            remainingKeys.includes(key)
          )
        );
        return remainingObject;
      };
      try {
        const { data } = await userUpdate({
          variables: {
            input: updateFields(userData),
          },
        });
        setUpdateMessage(data.updateUser.message);
        refetch();
        if (userData.icon !== state.iconUrl) {
          dispatch({
            type: "LOGIN",
            payload: { username: user.username, iconUrl: user.icon },
          });
        }
      } catch (error) {
        serverError();
      }
    } else {
      setUpdateMessage("Incorrect fields");
    }

    setProgressBarValue(20);
    const intervalId = setInterval(updateCount, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      setUpdateMessage("");
    }, 5000);
  };

  useEffect(() => {
    if (!loading && !error && data && data.getUser.status.code == 200) {
      setUser(data.getUser.userDetails);
    }
  }, [loading, error, data]);

  useEffect(() => {
    setUser({});
    refetch();
  }, []);
  return (
    <>
      {Object.keys(user).length == 0 ? (
        <LoadingCircle />
      ) : (
        <>
          <MetaTags
            title={`${data.getUser.userDetails.username} Profile Update`}
            description="Update your profile information on iCode Example. Keep your profile up-to-date with our easy-to-use profile editing tools. Personalize your account settings, manage preferences, and enhance your user experience."
            keywords="icode example, Update profile, Profile editing, Edit profile information, Modify profile, Manage account settings"
          />
          <Card className="grow">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  className={`w-20 h-20 text-large ${zoomAndClick()}`}
                  showFallback
                  src={user.icon}
                  onClick={() =>
                    navigate(`/user?name=${data.getUser.userDetails.username}`)
                  }
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <p className="text-small font-semibold leading-none text-default-600">
                    {numbersFormat(user.followers)} followers
                  </p>
                  <h5 className="text-small tracking-tight text-default-400">
                    @{DOMPurify.sanitize(user.username)}
                  </h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-10 text-small text-default-400 border-t-1 border-b-1">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center">
                  <p className="flex text-default-500 text-large justify-center">
                    User Profile Update
                  </p>
                  <div className="flex flex-col max-w-[600px] w-full items-end m-6 md:mb-0 gap-4">
                    {Object.keys(user)
                      .slice(3)
                      .map((key) => (
                        <Input
                          key={key}
                          type={key}
                          isInvalid={correctURLS[key]}
                          label={`Change ${capitalizeWord(key)}`}
                          labelPlacement="outside"
                          value={DOMPurify.sanitize(user[key])}
                          onValueChange={(v) =>
                            key !== "about"
                              ? setUser({ ...user, [key]: v })
                              : v.length <= 100
                              ? setUser({ ...user, [key]: v })
                              : null
                          }
                          description={
                            key === "about"
                              ? `${100 - user[key].length} characters remaining`
                              : ""
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
                  color={
                    updateMessage.includes("Incorrect") ? "danger" : "success"
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
                isLoading={userUpdateLoading}
                onPress={() => {
                  handleUserUpdate(user);
                }}
              >
                Update
              </Button>
              <Button
                className="hover:bg-default/40"
                radius="full"
                color="danger"
                size="sm"
                variant="bordered"
                onPress={onOpen}
              >
                Delete User
              </Button>
              <UserProfileDeleteModal {...{ isOpen, onOpenChange }} />
            </CardFooter>
          </Card>
        </>
      )}
    </>
  );
}
