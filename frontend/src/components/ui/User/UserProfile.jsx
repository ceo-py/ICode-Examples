import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  useDisclosure,
  Avatar,
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
import { useAuth } from "../../../AuthContext/AuthContext";
import serverError from "../../utils/serverError/serverError";
import { isValidUrl } from "../../utils/URLInputValidation/isValidUrl";
import { isValidEmail } from "../../utils/emailValidation/isValidEmail";

export function UserProfile() {
  const { loading, error, data, refetch } = useQuery(GET_USER_DETAILS);
  const [user, setUser] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userUpdate] = useMutation(USER_UPDATE_MUTATION);
  const { state, dispatch } = useAuth();
  const [correctURLS, setCorrectURLS] = useState({
    icon: false,
    email: false,
    youtube: false,
    github: false,
    linkedin: false,
    about: false,
  });

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

    setTimeout(() => {
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
        <Card className="grow">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                className="w-20 h-20 text-large"
                showFallback
                src={user.icon}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <p className="text-small font-semibold leading-none text-default-600">
                  {numbersFormat(user.followers)} followers
                </p>
                <h5 className="text-small tracking-tight text-default-400">
                  @{user.username}
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
                        value={user[key]}
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
            <p className="m-2 flex justify-center font-bold">{updateMessage}</p>
          )}
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
              onPress={() => {
                handleUserUpdate(user);
              }}
            >
              Update
            </Button>
            <Button
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
      )}
    </>
  );
}
