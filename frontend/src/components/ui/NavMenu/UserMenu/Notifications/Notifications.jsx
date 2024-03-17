import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { linkIcons } from "../../../../utils/Icons/linkIcons";
import { useEffect, useState } from "react";
import { REPORT_QUERY } from "../../../../../graphql/queries/getReportsQuery";
import { ModalNotifications } from "./ModalNotifications/ModalNotifications";
import { COMMENT_NOTIFICATION_QUERY } from "../../../../../graphql/queries/getCommentNotificationQuery";
import { FOLLOW_NOTIFICATION_QUERY } from "../../../../../graphql/queries/getFollowNotification";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  connectWebSocket,
  refetchHandler,
  client,
} from "../../../../utils/webSocketClient/webSocketClient";
import { LIKE_NOTIFICATION_QUERY } from "../../../../../graphql/queries/getLikeNotification";

export function Notifications() {
  const { loading, data, refetch } = useQuery(REPORT_QUERY);

  const {
    loading: loadingFollow,
    data: dataFollow,
    refetch: refetchFollow,
  } = useQuery(FOLLOW_NOTIFICATION_QUERY);

  const {
    loading: loadingComment,
    data: dataComment,
    refetch: refetchComment,
  } = useQuery(COMMENT_NOTIFICATION_QUERY);

  const {
    loading: loadingLike,
    data: dataLike,
    refetch: refetchLike,
  } = useQuery(LIKE_NOTIFICATION_QUERY);

  const [reports, setReports] = useState([]);
  const [comments, setComments] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [modal, setModal] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    connectWebSocket();
    refetchHandler.Comment = refetchComment;
    refetchHandler.Follow = refetchFollow;
    refetchHandler.Report = refetch;
    refetchHandler.Like = refetchLike;
  }, []);

  useEffect(() => {
    if (loading) return;
    setReports(JSON.parse(data?.getReport?.result));
  }, [data]);

  useEffect(() => {
    if (loadingComment) return;
    setComments(JSON.parse(dataComment?.getCommentNotification?.result));
  }, [dataComment]);

  useEffect(() => {
    if (loadingFollow) return;
    setFollowers(JSON.parse(dataFollow?.getFollowNotification?.result));
  }, [dataFollow]);

  useEffect(() => {
    if (loadingLike) return;
    setLikes(JSON.parse(dataLike?.getLikeNotification?.result));
  }, [dataLike]);

  const openModal = (report) => {
    const modalRespond = {
      content: report.content,
      taskId: report.taskId,
      reportId: report.reportId,
      reportType: report.reportType,
    };
    if (report?.comment) modalRespond.comment = report.comment;
    setModal(modalRespond);
    onOpen();
  };

  const sendMessage = (message) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  };
  const getNotReadNotification = (
    totalReports,
    totalComments,
    totalFollowers,
    totalLikes
  ) => {
    const reportsCounter = totalReports?.filter((r) => !r.isRead).length || 0;
    const commentsCounter = totalComments?.filter((r) => !r.isRead).length || 0;
    const followersCounter =
      totalFollowers?.filter((r) => !r.isRead).length || 0;
    const likesCounter = totalLikes?.filter((r) => !r.isRead).length || 0;
    return reportsCounter + commentsCounter + followersCounter + likesCounter;
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex relative rounded-full justify-center items-center hover:bg-default/40">
            <Badge
              className={`${
                getNotReadNotification(reports, comments, followers, likes) ===
                0
                  ? "hidden"
                  : ""
              }`}
              content={getNotReadNotification(
                reports,
                comments,
                followers,
                likes
              )}
              aria-label="Total Notifications"
              color="danger"
              shape="circle"
              placement="top-right"
              size="md"
            >
              <Avatar
                className="ring-default bg-"
                as="button"
                size="md"
                showFallback
                src={linkIcons("notification")}
              />
            </Badge>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Notifications Items"
          className="max-h-64 overflow-y-auto"
          emptyContent="No Notifications"
        >
          {reports &&
            reports.map((report) => (
              <DropdownItem
                key={crypto.randomUUID()}
                shortcut={report.user.name}
                startContent={
                  !report.isRead && (
                    <img
                      className="max-h-5 max-w-5"
                      src={linkIcons("send")}
                    ></img>
                  )
                }
                description={`Report ${report.reportType}`}
                onClick={() => openModal(report)}
              >
                {report.content.length > 27
                  ? report.content.slice(0, 24) + "..."
                  : report.content}
              </DropdownItem>
            ))}
          {comments &&
            comments.map((comment) => (
              <DropdownItem
                key={crypto.randomUUID()}
                shortcut={
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      sendMessage(`deleteComment ${comment.notificationId}`);
                    }}
                  >
                    <img
                      className="max-h-5 max-w-5"
                      src={linkIcons("delete")}
                    ></img>
                  </span>
                }
                startContent={
                  !comment.isRead && (
                    <img
                      className="max-h-5 max-w-5"
                      src={linkIcons("send")}
                    ></img>
                  )
                }
                description={`${comment.user.name} Commented: `}
                onClick={() => {
                  sendMessage(`makeReadComment ${comment.notificationId}`);
                  navigate(`/solution?id=${comment.taskId}`);
                }}
              >
                {comment.content.length > 27
                  ? comment.content.slice(0, 24) + "..."
                  : comment.content}
              </DropdownItem>
            ))}
          {followers &&
            followers.map((follower) => (
              <DropdownItem
                key={crypto.randomUUID()}
                shortcut={
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      sendMessage(`deleteFollow ${follower.followId}`);
                    }}
                  >
                    <img
                      className="max-h-5 max-w-5"
                      src={linkIcons("delete")}
                    ></img>
                  </span>
                }
                startContent={
                  !follower.isRead && (
                    <img
                      className="max-h-5 max-w-5"
                      src={linkIcons("send")}
                    ></img>
                  )
                }
                description="New Follower:"
                onClick={() => {
                  sendMessage(`makeReadFollow ${follower.followId}`);
                  navigate(`/user?name=${follower.follower}`);
                }}
              >
                {follower.follower}
              </DropdownItem>
            ))}
          {likes &&
            likes.map((like) => (
              <DropdownItem
                key={crypto.randomUUID()}
                shortcut={
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      sendMessage(`deleteLike ${like.likeId}`);
                    }}
                  >
                    <img
                      className="max-h-5 max-w-5"
                      src={linkIcons("delete")}
                    ></img>
                  </span>
                }
                startContent={
                  !like.isRead && (
                    <img
                      className="max-h-5 max-w-5"
                      src={linkIcons("send")}
                    ></img>
                  )
                }
                description={`Like from ${like.liker}`}
                onClick={() => {
                  sendMessage(`makeReadLike ${like.likeId}`);
                  navigate(`/solution?id=${like.taskId}`);
                }}
              >
                {like.taskName}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
      <ModalNotifications
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modal={modal}
        sendMessageToBackEnd={sendMessage}
        navigate={navigate}
      />
    </>
  );
}
