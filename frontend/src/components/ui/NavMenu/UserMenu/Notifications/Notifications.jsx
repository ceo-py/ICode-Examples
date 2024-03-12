import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { linkIcons } from "../../../../utils/Icons/linkIcons";
import { DropDownMenuIcon } from "../../../DropDownMenuIcon/DropDownMenuIcon";
import { useEffect, useState } from "react";

let client;

export function Notifications() {
  const [receivedMessage, setReceivedMessage] = useState("");

  const connectWebSocket = () => {
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

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Received message:", data);
      setReceivedMessage(data.message); 
    };
    return () => {
      client.close();
    };
  };

  useEffect(() => {
    client = new WebSocket("ws://localhost:5001");
    connectWebSocket();
  }, []);

  const sendMessage = () => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ Message: "Hello from client" }));
    } else {
      console.log("WebSocket is not open. ReadyState:", client.readyState);
    }
  };

  return (
    <Tooltip
      showArrow={true}
      placement="bottom"
      key="notifications"
      content="Notifications"
      color="primary"
      closeDelay="0"
    >
      <div className="cursor-pointer flex relative rounded-full justify-center items-center hover:bg-default/40">
        <Badge
          content="1"
          aria-label="more than 10 notifications"
          color="danger"
          shape="circle"
          placement="top-right"
          size="md"
        >
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                className="ring-default bg-"
                as="button"
                size="sm"
                showFallback
                src={linkIcons("notification")}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="notifications"
              variant="flat"
              hideSelectedIcon={false}
            >
              {/* <DropdownSection title="New Tasks" showDivider>
                <DropdownItem
                  key="Notifications"
                  endContent={
                    <DropDownMenuIcon
                      alt="Notifications"
                      src={linkIcons("settings")}
                    />
                  }
                >
                  Notifications
                </DropdownItem>
              </DropdownSection> */}
              {/* <DropdownSection title="New Tasks" showDivider>
                <DropdownItem
                  key="task id..."
                  className="h-14 gap-2"
                  //   textValue="Details"
                >
                  Някакъв лист с задачите
                </DropdownItem>
              </DropdownSection> */}
              {/* <DropdownSection title="Comments" aria-label="notifications" hideSelectedIcon={false}> */}
              <DropdownItem
                key="notifications"
                textValue="notifications"
                className="h-14 gap-2"
                hideSelectedIcon={false}
                onClick={() => sendMessage()}
                //   textValue="Details"
              >
                Under Construction
              </DropdownItem>
              {/* <DropdownItem
                key="comment id ..."
                textValue="notifications"
                className="h-14 gap-2"
                hideSelectedIcon={false}
                //   textValue="Details"
              >
                Някакъв лист с задачите
              </DropdownItem> */}
              {/* </DropdownSection> */}
            </DropdownMenu>
          </Dropdown>
        </Badge>
      </div>
    </Tooltip>
  );
}
