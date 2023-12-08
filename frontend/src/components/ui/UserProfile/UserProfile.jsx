import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Input,
  Button,
} from "@nextui-org/react";
import { GET_USER_DETAILS } from "../../../graphql/queries/userQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { numbersFormat } from "../../utils/numberFormat/numberFormat";
import { capitalizeWord } from "../../utils/capitalizeWord/capitalizeWord";
import { useNavigate } from "react-router-dom";
import { USER_UPDATE_MUTATION } from "../../../graphql/mutations/userUpdateDetails";

export function UserProfile() {
  const { loading, error, data, refetch } = useQuery(GET_USER_DETAILS);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [userUpdate] = useMutation(USER_UPDATE_MUTATION);

  const handleUserUpdate = async (userData) => {
    const updateFields = (userData) => {
      const [, , , , ...remainingKeys] = Object.keys(userData);
      const remainingObject = Object.fromEntries(
        Object.entries(userData).filter(([key]) => remainingKeys.includes(key))
      );
      return remainingObject;
    };
    try {
      await userUpdate({
        variables: {
          input: updateFields(userData),
        },
      });
      refetch();
    } catch (error) {
      console.error("User Update Error:", error.message);
    }
  };

  useEffect(() => {
    if (!loading && !error && data && data.getUser.status.code == 200) {
      setUser(data.getUser.userDetails);
    }
  }, [loading, error, data]);

  return (
    <Card className="grow">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            className="w-20 h-20 text-large"
            src="https://www.svgrepo.com/show/418032/user.svg"
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
                .slice(4)
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
      </CardFooter>
    </Card>
  );
}
