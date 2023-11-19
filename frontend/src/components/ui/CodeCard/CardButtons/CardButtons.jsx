import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { CardButtonsDropDownMenu } from "./CardButtonsDropDownMenu/CardButtonsDropDownMenu";

const buttons = [
  {
    btnText: "Follow",
    variant: { true: "bordered", false: "solid" },
    onPress: "isFollowed",
    hoverDesc: "I Follow",
  },
  {
    btnText: "Like",
    hoverDesc: "I like this",
  },
  {
    btnText: "Share",
    onPress: () => navigator.clipboard.writeText(window.location.href),
    onClickMsg: "Url",
    hoverDesc: "I share this",
  },
  {
    btnText: "Report",
    hoverDesc: "I report a problem",
  },
];

function CardButtons() {
  const [buttonData, setButtonData] = useState({
    Follow: true,
    Like: true,
  });
  return (
    <>
      <div className={"sm:hidden"}>
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
          >
            <Button
              key={x.btnText}
              className={`${
                buttonData[x.btnText]
                  ? "text-foreground"
                  : "bg-transparent text-foreground border-default-200"
              } `}
              color="success"
              radius="full"
              size="sm"
              variant="bordered"
              onPress={[0, 1].includes(i)? () => setButtonData({...buttonData, [x.btnText]: !buttonData[x.btnText]}): x.onPress}
            >
              {x.btnText}
            </Button>
          </Tooltip>
        ))}
      </div>
    </>
  );
}

export { CardButtons, buttons };
