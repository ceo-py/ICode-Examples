import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { CardButtonsDropDownMenu } from "./CardButtonsDropDownMenu/CardButtonsDropDownMenu";
import { CardReportBtnModal } from "./CardReportBtnModal/CardReportBtnModal";
import { LIKE_TASK_MUTATION } from "../../../../graphql/mutations/likeTask";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER_MUTATION } from "../../../../graphql/mutations/followUser";
import { useAuth } from "../../../../ContextGlobal/AuthContext";
import { useNavigate } from "react-router-dom";
import { EditTaskBtn } from "./EditTaskBtn/EditTaskBtn";
import serverError from "../../../utils/serverError/serverError";

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
  userToFollowUsername,
  likeCounter,
  refetch,
  navigateEditTask,
}) {
  const [buttonData, setButtonData] = useState({
    Follow: follow,
    Like: like,
  });
  const { state } = useAuth();
  const navigate = useNavigate();

  const [likeTask, { loading: loadingLike }] = useMutation(LIKE_TASK_MUTATION);
  const [followUser, { loading: loadingFollow }] =
    useMutation(FOLLOW_USER_MUTATION);

  const canFollow = (logUsername, userToFollowUsername) => {
    return logUsername === userToFollowUsername;
  };

  const handleLikeTask = async (id) => {
    if (!state.isAuthenticated) {
      navigate("/login");
      return;
    }
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
      serverError();
    }
  };

  const handleFollowUser = async (id) => {
    if (!state.isAuthenticated) {
      navigate("/login");
      return;
    }
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
      serverError();
    }
  };

  const handleReportUser = () => {
    if (!state.isAuthenticated) {
      navigate("/login");
      return;
    }
    onOpen();
  };

  return (
    <>
      <div className="sm:hidden">
        <CardButtonsDropDownMenu
          handleReportUser={handleReportUser}
          follow={follow}
          like={like}
          taskId={taskId}
          userToFollowId={userToFollowId}
          likeCounter={likeCounter}
          canFollow={canFollow(state.username, userToFollowUsername)}
          handleLikeTask={handleLikeTask}
          handleFollowUser={handleFollowUser}
          navigateEditTask={navigateEditTask}
        />
      </div>
      <div className="hidden sm:flex gap-2">
        {canFollow(state.username, userToFollowUsername) && (
          <EditTaskBtn navigateEditTask={navigateEditTask} />
        )}
        {buttons
          .slice(!canFollow(state.username, userToFollowUsername) ? 0 : 1)
          .map((x, i) => (
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
                    : "bg-transparent text-foreground border-default-200 hover:bg-default/40"
                } `}
                color="success"
                radius="full"
                size="sm"
                variant="bordered"
                isLoading={
                  x.btnText === "Follow"
                    ? loadingFollow
                    : x.btnText === "Like"
                    ? loadingLike
                    : false
                }
                onPress={() => {
                  if (x.btnText === "Follow") {
                    handleFollowUser(userToFollowId);
                  } else if (x.btnText === "Like") {
                    handleLikeTask(taskId);
                  } else if (x.btnText === "Share") {
                    x.onPress();
                  } else if (x.btnText === "Report") {
                    handleReportUser();
                  }
                }}
              >
                {x.btnText === "Like"
                  ? `${x.btnText} ${likeCounter}`
                  : x.btnText}
                <CardReportBtnModal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  typeReport={"TaskSolution"}
                  idReportType={taskId}
                />
              </Button>
            </Tooltip>
          ))}
      </div>
    </>
  );
}

export { CardButtons, buttons };
