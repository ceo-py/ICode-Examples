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
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

let client;

export function Notifications() {
  const { loading, data, refetch } = useQuery(REPORT_QUERY);
  const {
    loading: loadingComment,
    data: dataComment,
    refetch: refetchComment,
  } = useQuery(COMMENT_NOTIFICATION_QUERY);
  const [reports, setReports] = useState([]);
  const [comments, setComments] = useState([]);
  const [modal, setModal] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const connectWebSocket = () => {
    client = new WebSocket("ws://localhost:5001");
    if (!client) return;
    // client.onopen = () => {
    //   console.log("WebSocket Client Connected");
    // };

    // client.onerror = (error) => {
    //   console.error("WebSocket Error:", error);
    // };

    client.onclose = () => {
      console.log("WebSocket connection closed. Attempting to reconnect...");
      setTimeout(connectWebSocket, 5000);
    };

    client.onmessage = (m) => {
      const message = m.data;
      if (message.includes("Comment")) refetchComment();
      if (message.includes("Report")) refetch();
      if (message.includes("Follower")) console.log("Follower");
    };
    return () => {
      client.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, []);

  useEffect(() => {
    if (loading) return;
    setReports(JSON.parse(data?.getReport?.result));
  }, [data]);

  useEffect(() => {
    if (loadingComment) return;
    setComments(JSON.parse(dataComment?.getCommentNotification?.result));
  }, [dataComment]);

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
  const getNotReadNotification = (totalReports, totalComments) => {
    const reportsCounter = totalReports?.filter((r) => !r.isRead).length || 0;
    const commentsCounter = totalComments?.filter((r) => !r.isRead).length || 0;
    return reportsCounter + commentsCounter;
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex relative rounded-full justify-center items-center hover:bg-default/40">
            <Badge
              className={`${
                getNotReadNotification(reports, comments) === 0 ? "hidden" : ""
              }`}
              content={getNotReadNotification(reports, comments)}
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
