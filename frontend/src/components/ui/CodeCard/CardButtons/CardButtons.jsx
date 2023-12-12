import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { CardButtonsDropDownMenu } from "./CardButtonsDropDownMenu/CardButtonsDropDownMenu";
import { CardReportBtnModal } from "./CardReportBtnModal/CardReportBtnModal";

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

function CardButtons({ isOpen, onOpen, onOpenChange, follow, like }) {
  const [buttonData, setButtonData] = useState({
    Follow: follow,
    Like: like,
  });

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
                  ? () =>
                      setButtonData({
                        ...buttonData,
                        [x.btnText]: !buttonData[x.btnText],
                      })
                  : i === 3
                  ? onOpen
                  : x.onPress
              }
            >
              {x.btnText}
              <CardReportBtnModal isOpen={isOpen} onOpenChange={onOpenChange} />
            </Button>
          </Tooltip>
        ))}
      </div>
    </>
  );
}

export { CardButtons, buttons };
