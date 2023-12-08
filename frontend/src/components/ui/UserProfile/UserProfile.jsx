import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Input,
  Button,
  useDisclosure,
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

export function UserProfile() {
  const { loading, error, data, refetch } = useQuery(GET_USER_DETAILS);
  const [user, setUser] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userUpdate] = useMutation(USER_UPDATE_MUTATION);
  const { dispatch } = useAuth();

  const handleUserUpdate = async (userData) => {
    const updateFields = (userData) => {
      const [, , , ...remainingKeys] = Object.keys(userData);
      const remainingObject = Object.fromEntries(
        Object.entries(userData).filter(([key]) => remainingKeys.includes(key))
      );
      return remainingObject;
    };
    try {
      const { data } = await userUpdate({
        variables: {
          input: updateFields(userData),
        },
      });
      setUpdateMessage(
        data.updateUser.code == 200
          ? "User update successful"
          : "User update unsuccessful"
      );
      refetch();
      dispatch({ type: "LOGIN", payload: {username: user.username, iconUrl: user.icon} });
    } catch (error) {
      setUpdateMessage("User update unsuccessful");
      console.error("User Update Error:", error.message);
    }
    setTimeout(() => {
      setUpdateMessage("");
    }, 5000);
  };

  useEffect(() => {
    if (!loading && !error && data && data.getUser.status.code == 200) {
      setUser(data.getUser.userDetails);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
        <Card className="grow">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                className="w-20 h-20 text-large"
                src={
                  user.icon
                    ? user.icon
                    : "https://www.svgrepo.com/show/418032/user.svg"
                }
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <p className="text-small font-semibold leading-none text-default-600">
                  {numbersFormat(user.followers)} followers
                </p>
                <p className="text-small font-semibold leading-none text-default-600">
                  1K code solutions
                </p>
                <p className="text-small font-semibold leading-none text-default-600">
                  1K videos
                </p>
                <h5 className="text-small tracking-tight text-default-400">
                  @{user.username}
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-10 text-small text-default-400 bg-default">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 items-center">
                <p className="flex text-default-500 text-small justify-center">
                  User Profile Update
                </p>
                <div className="flex flex-col max-w-[600px] w-full items-end mb-6 md:mb-0 gap-4">
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
                </div>
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
                handleUserUpdate(user);
              }}
            >
              Update
            </Button>
            <Button
              radius="full"
              color="danger"
              size="lg"
              variant="bordered"
              onPress={onOpen}
            >
              Delete User
            </Button>
            <UserProfileDeleteModal {...{ isOpen, onOpenChange }} />
          </CardFooter>
          {updateMessage && (
            <p className="m-2 flex justify-center font-bold">{updateMessage}</p>
          )}
        </Card>
      )}
    </>
  );
}
