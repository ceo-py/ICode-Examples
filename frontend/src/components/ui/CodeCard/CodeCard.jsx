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
import { useQuery } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import { CreateComment } from "./CreateComment/CreateComment";
import { ListComments } from "./ListComments/ListComments";
import { NoResultFound } from "../NoResultFound/NoResultFound";
import { numbersFormat } from "../../utils/numberFormat/numberFormat";

export function CodeCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loading, data, refetch } = useQuery(TASK_DETAILS_QUERY, {
    variables: {
      input: {
        id: searchParams.get("id"),
      },
    },
  });

  const [commentsList, setCommentsList] = useState([]);

  const navigateUser = (username) => {
    navigate(`/user?name=${username}`);
  };

  useEffect(() => {
    if (!data?.getTaskSingleDetails?.comments) return;
    setCommentsList(JSON.parse(data?.getTaskSingleDetails?.comments));
  }, [data]);

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : data?.getTaskSingleDetails?.status?.code === 200 ? (
        <Card className="grow">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                className="cursor-pointer transition-transform transform duration-300 ease-in-out hover:scale-110"
                isBordered
                radius="full"
                size="md"
                showFallback
                src={data.getTaskSingleDetails.icon}
                onClick={() =>
                  navigateUser(data.getTaskSingleDetails.userDetails.username)
                }
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none overflow-hidden overflow-ellipsis max-w-[200px] sm:max-w-[350px]">
                  {data.getTaskSingleDetails.taskName}
                </h4>
                <h4 className="text-small tracking-tight text-default-400">
                  {numbersFormat(data.getTaskSingleDetails.followCounter)}{" "}
                  followers
                </h4>
                <h5
                  className="text-small tracking-tight text-default-400 cursor-pointer"
                  onClick={() =>
                    navigateUser(data.getTaskSingleDetails.userDetails.username)
                  }
                >
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
              taskId={data.getTaskSingleDetails.taskId}
              userToFollowId={data.getTaskSingleDetails.userDetails.id}
              likeCounter={data.getTaskSingleDetails.likeCounter}
              userToFollowUsername={
                data.getTaskSingleDetails.userDetails.username
              }
              refetch={refetch}
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
              refetch={refetch}
            />
            {commentsList.length !== 0 &&
              commentsList.map((comment) => (
                <ListComments
                  key={comment.commentId}
                  commentData={comment}
                  setCommentsList={setCommentsList}
                  commentsList={commentsList}
                  refetch={refetch}
                  navigateUser={navigateUser}
                />
              ))}
          </Card>
        </Card>
      ) : (
        <NoResultFound />
      )}
    </>
  );
}
