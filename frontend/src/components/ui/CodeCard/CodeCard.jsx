import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import { CodeSnippet } from "./CodeSnippet/CodeSnippet";
import { CardButtons } from "./CardButtons/CardButtons";
import { CodeComments } from "./CodeComment/CodeComments";
import { TASK_DETAILS_QUERY } from "../../../graphql/queries/taskDetailsQuery";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

export function CodeCard() {
  const [isFollowed, setIsFollowed] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [getTaskDetails, { data }] = useLazyQuery(TASK_DETAILS_QUERY);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    try {
      getTaskDetails({
        variables: {
          input: {
            id: searchParams.get("task_details"),
          },
        },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!data?.getTaskGlobal?.result) return;
    setSearchResults(JSON.parse(data?.getTaskGlobal?.result));
  }, [data]);

  console.log(data);
  return (
    <Card className="grow">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://www.svgrepo.com/show/418032/user.svg"
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
        <CardButtons
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 bg-default/40">
        {data?.getTaskSingleDetails?.content && <CodeSnippet code={data.getTaskSingleDetails.content}/>}
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className="text-default-400 text-small">Comments</p>
        </div>
      </CardFooter>
      <CodeComments actionName={"Comment"} display={true} />
      <CodeComments
        {...{
          isOpen,
          onOpen,
          onOpenChange,
          display: false,
          actionName: "Edit",
        }}
      />
    </Card>
  );
}
