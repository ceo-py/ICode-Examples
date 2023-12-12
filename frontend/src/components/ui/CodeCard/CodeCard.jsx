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
import { TASK_DETAILS_QUERY } from "../../../graphql/queries/taskDetailsQuery";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import { CreateComment } from "./CreateComment/CreateComment";

export function CodeCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [getTaskDetails, { data }] = useLazyQuery(TASK_DETAILS_QUERY);
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

  const getTotalComments = (comments) => {
    if (!comments) return 0;
    return JSON.parse(comments).length;
  };

  return (
    <>
      {!data ? (
        <LoadingCircle />
      ) : (
        <Card className="grow">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={data.getTaskSingleDetails.icon}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {data.getTaskSingleDetails.taskName}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @{data.getTaskSingleDetails.userDetails.username}
                </h5>
              </div>
            </div>
            <CardButtons
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              follow={data.getTaskSingleDetails.follow}
              like={data.getTaskSingleDetails.like}
            />
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400 bg-default/40">
            <CodeSnippet code={data.getTaskSingleDetails.content} />
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                {getTotalComments(data?.getTaskSingleDetails?.comments)}
              </p>
              <p className="text-default-400 text-small">Comments</p>
            </div>
          </CardFooter>
          <Card>
            <CreateComment
              taskId={data?.getTaskSingleDetails?.taskId}
              icon={data?.getTaskSingleDetails?.icon}
            />
            {getTotalComments(data?.getTaskSingleDetails?.comments) !== 0 && (
              <p>ima komentari</p>
            )}
          </Card>
        </Card>
      )}
    </>
  );
}
