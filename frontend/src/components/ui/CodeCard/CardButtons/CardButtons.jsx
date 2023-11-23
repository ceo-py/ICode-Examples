import { useState } from "react";
import { Button, Tooltip,  } from "@nextui-org/react";
import { CardButtonsDropDownMenu } from "./CardButtonsDropDownMenu/CardButtonsDropDownMenu";
import { CardReportBtnModal } from "./CardReportBtnModal/CardReportBtnModal";

const buttons = [
  {
    btnText: "Follow",
    variant: { true: "bordered", false: "solid" },
    onPress: "isFollowed",
    hoverDesc: "Click to follow",
  },
  {
    btnText: "Like",
    hoverDesc: "Click to like",
  },
  {
    btnText: "Share",
    onPress: () => navigator.clipboard.writeText(window.location.href),
    hoverDesc: "Copy link",
  },
  {
    btnText: "Report",
    hoverDesc: "Click to report a problem",
    modalComponent: CardReportBtnModal,
  },
];

function CardButtons() {
  const [buttonData, setButtonData] = useState({
    Follow: true,
    Like: true,
  });

  return (
    <>
      <div className="sm:hidden">
        <CardButtonsDropDownMenu />
      </div>
      <div className="hidden sm:block">
        {buttons.map((x, i) => (
          <Tooltip
            showArrow={true}
            placement="bottom"
            key={x.btnText}
            content={x.hoverDesc}
            color="primary"
            isDisabled={buttonData[x.btnText]}
          >
            {i !== 3 ? (
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
                    : x.onPress
                }
              >
                {x.btnText}
              </Button>
            ) : < x.modalComponent/>}
          </Tooltip>
        ))}
      </div>
    </>
  );
}

export { CardButtons, buttons };
