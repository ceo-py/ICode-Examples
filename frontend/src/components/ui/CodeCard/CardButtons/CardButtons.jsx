import { useState } from "react";
import { Button } from "@nextui-org/react";
import { CardButtonsDropDownMenu } from "./CardButtonsDropDownMenu/CardButtonsDropDownMenu";

const buttons = [
  {
    btnText: "Follow",
    variant: { true: "bordered", false: "solid" },
    onPress: "isFollowed",
  },
  {
    btnText: "Like",
  },
  {
    btnText: "Share",
    onPress: () => navigator.clipboard.writeText(window.location.href),
    onClickMsg: "Url",
  },
  {
    btnText: "Report",
  },
];

function CardButtons() {
  const [buttonData, setButtonData] = useState({
    isFollowed: true,
  });

  return (
    <>
      <div className={"sm:hidden"}>
        <CardButtonsDropDownMenu />
      </div>
      <div className="hidden sm:block">
        {buttons.map((x) => (
          <Button
            key={x.btnText}
            className={
              buttonData[x?.onPress]
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={buttonData[x?.onPress] ? "bordered" : "solid"}
            onPress={x.onPress}
            //   onPress={() => x?.onPress?
            //     setButtonData({
            //       ...buttonData,
            //       [x.onPress]: !buttonData[x.onPress],
            //     }): ''
            //   }
          >
            {x.btnText}
          </Button>
        ))}
      </div>
    </>
  );
}

export {
    CardButtons,
    buttons
}