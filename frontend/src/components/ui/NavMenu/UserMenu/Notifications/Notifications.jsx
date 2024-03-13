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
import { useQuery } from "@apollo/client";
import { REPORT_QUERY } from "../../../../../graphql/queries/getReportsQuery";
import { ModalNotifications } from "./ModalNotifications/ModalNotifications";

let client;

export function Notifications() {
  const { loading, error, data, refetch } = useQuery(REPORT_QUERY);
  const [reports, setReports] = useState([]);
  const [modal, setModal] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const connectWebSocket = () => {
    client = new WebSocket("ws://localhost:5001");
    if (!client) return;
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    client.onclose = () => {
      console.log("WebSocket connection closed. Attempting to reconnect...");
      setTimeout(connectWebSocket, 5000);
    };

    client.onmessage = (m) => {
      console.log(m);
      refetch();
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

  const getNotReadReports = () => {
    return reports?.filter((r) => !r.isRead);
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex relative rounded-full justify-center items-center hover:bg-default/40">
            <Badge
              content={
                reports?.length > 0 &&
                getNotReadReports()?.length > 0 &&
                getNotReadReports()?.length
              }
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
            reports.map((report, i) => (
              <DropdownItem
                key={i}
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
        </DropdownMenu>
      </Dropdown>
      <ModalNotifications
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modal={modal}
        sendMessageToBackEnd={sendMessage}
      />
    </>
  );
}
