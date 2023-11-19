import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { CodeSnippet } from "../CodeSnippet/COdeSnippet";

export function CodeCard() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="w-[1534px]">
        {/* <CardHeader className="justify-between sticky top-[4rem] bg-white z-40"> */}
        <CardHeader className="justify-between relative">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="/avatars/avatar-1.png"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Test User
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @testuserdotcom
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Share" : "Share"}
          </Button>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 bg-default/40 overflow-x-auto">
        <CodeSnippet />
      </CardBody>
      {/* <div className="w-full pointer-events-auto overflow-x-scroll sticky bottom-0 h-17"></div> */}
      {/* <div className="overflow-x-scroll"></div> */}
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Comments</p>
        </div>
      </CardFooter>
    </Card>
  );
}