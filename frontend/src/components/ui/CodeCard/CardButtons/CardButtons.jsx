import { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { CardButtonsDropDownMenu } from "./CardButtonsDropDownMenu/CardButtonsDropDownMenu";
import { CardReportBtnModal } from "./CardReportBtnModal/CardReportBtnModal";
import { LIKE_TASK_MUTATION } from "../../../../graphql/mutations/likeTask";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER_MUTATION } from "../../../../graphql/mutations/followUser";

const buttons = [
  {
    btnText: "Follow",
    variant: { true: "bordered", false: "solid" },
    onPress: "isFollowed",
    hoverDesc: "Click to follow",
    src: "https://www.svgrepo.com/show/418021/user-plus.svg",
  },
  {
    btnText: "Like",
    hoverDesc: "Click to like",
    src: "https://www.svgrepo.com/show/418150/add.svg",
  },
  {
    btnText: "Share",
    onPress: () => navigator.clipboard.writeText(window.location.href),
    hoverDesc: "Copy link",
    src: "https://www.svgrepo.com/show/418110/send.svg",
  },
  {
    btnText: "Report",
    hoverDesc: "Click to report a problem",
    src: "https://www.svgrepo.com/show/418024/report.svg",
  },
];

function CardButtons({
  isOpen,
  onOpen,
  onOpenChange,
  follow,
  like,
  taskId,
  userToFollowId,
  likeCounter,
  refetch,
}) {
  const [buttonData, setButtonData] = useState({
    Follow: follow,
    Like: like,
  });

  const [likeTask] = useMutation(LIKE_TASK_MUTATION);
  const [followUser] = useMutation(FOLLOW_USER_MUTATION);

  const handleLikeTask = async (id) => {
    try {
      const { data } = await likeTask({
        variables: { input: { id } },
      });
      if (data?.likeTask?.code === 200) {
        setButtonData({
          ...buttonData,
          Like: !buttonData.Like,
        });
        refetch();
      }
    } catch (error) {
      console.error("Like Error:", error.message);
    }
  };

  const handleFollowUser = async (id) => {
    try {
      const { data } = await followUser({
        variables: { input: { id } },
      });

      if (data?.followUser?.code === 200) {
        setButtonData({
          ...buttonData,
          Follow: !buttonData.Follow,
        });
        refetch();
      }
    } catch (error) {
      console.error("Follow Error:", error.message);
    }
  };

  return (
    <>
      <div className="sm:hidden">
        <CardButtonsDropDownMenu onOpen={onOpen} />
      </div>
      <div className="hidden sm:flex gap-2">
        {buttons.map((x, i) => (
          <Tooltip
            showArrow={true}
            placement="bottom"
            key={x.btnText}
            content={x.hoverDesc}
            color="primary"
            isDisabled={buttonData[x.btnText]}
          >
            <Button
              className={`${
                buttonData[x.btnText]
                  ? "text-foreground"
                  : "bg-transparent text-foreground border-default-200"
              } `}
              color="success"
              radius="full"
              size="sm"
              variant="bordered"
              onPress={
                [0, 1].includes(i)
                  ? () => {
                      if (i === 1) {
                        handleLikeTask(taskId);
                      }
                      if (i === 0) {
                        handleFollowUser(userToFollowId);
                      }
                    }
                  : i === 3
                  ? onOpen
                  : x.onPress
              }
            >
              {/* {x.btnText} */}
              {![0, 1].includes(i)
                ? x.btnText
                : i === 0
                ? x.btnText
                : `${x.btnText} ${likeCounter}`}
              <CardReportBtnModal isOpen={isOpen} onOpenChange={onOpenChange} />
            </Button>
          </Tooltip>
        ))}
      </div>
    </>
  );
}

export { CardButtons, buttons };
