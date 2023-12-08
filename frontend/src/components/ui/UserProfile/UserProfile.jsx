import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { GET_USER_DETAILS } from "../../../graphql/queries/userQuery";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { numbersFormat } from "../../utils/numberFormat/numberFormat";


export function UserProfile() {
  const { loading, error, data } = useQuery(GET_USER_DETAILS);
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!loading && !error && data && data.getUser.status.code == 200) {
      setUser(data.getUser.userDetails)
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
              1K video explanations
            </p>
            <h5 className="text-small tracking-tight text-default-400">
              @{user.username}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 bg-default/40">
        <p>test</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className="text-default-400 text-small">Comments</p>
        </div>
      </CardFooter>
    </Card>
  );
}
