import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { CodeSnippet } from "./CodeSnippet/CodeSnippet";
import { CardButtons } from "./CardButtons/CardButtons";

export function CodeCard() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <Card>
        {/* <CardHeader className="justify-between sticky top-[4rem] bg-white z-40"> */}
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="	https://www.svgrepo.com/show/418032/user.svg"
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
          <CardButtons />
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
    </div>
  );
}
