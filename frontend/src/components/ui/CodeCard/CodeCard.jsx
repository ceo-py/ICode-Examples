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
import { ListComments } from "./ListComments/ListComments";
import { RateLimitReach } from "../RateLimitReach/RateLimitReach";

export function CodeCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [getTaskDetails, { data }] = useLazyQuery(TASK_DETAILS_QUERY);
  const [searchParams] = useSearchParams();
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    try {
      getTaskDetails({
        variables: {
          input: {
            id: searchParams.get("id"),
          },
        },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!data?.getTaskSingleDetails?.comments) return;
    setCommentsList(JSON.parse(data?.getTaskSingleDetails?.comments));
  }, [data]);


  const showPage = (result) => {
    if (!result) return <LoadingCircle />;
    if (result?.getTaskSingleDetails?.status?.code === 200)
      return (
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
              <p className="font-bold text-default-800 text-large">
                {commentsList.length}
              </p>
              <p className="font-bold text-default-800 text-large">Comments</p>
            </div>
          </CardFooter>
          <Card>
            <CreateComment
              taskId={data?.getTaskSingleDetails?.taskId}
              setCommentsList={setCommentsList}
              commentsList={commentsList}
              userDetails={data?.getTaskSingleDetails.userDetails}
            />
            {commentsList.length !== 0 &&
              commentsList.map((comment) => (
                <ListComments
                  key={comment.commentId}
                  commentData={comment}
                  setCommentsList={setCommentsList}
                  commentsList={commentsList}
                />
              ))}
          </Card>
        </Card>
      );
    return <RateLimitReach />;
  };

  return showPage(data);
}
