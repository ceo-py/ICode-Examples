import { Avatar, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";

const buttons = [
  {
    hoverContent: "Show Code",
    btnType: "codeOn",
    src: "https://www.svgrepo.com/show/418014/programming.svg",
  },
  {
    hoverContent: "Show Video",
    btnType: "videoOn",
    src: "https://www.svgrepo.com/show/418016/play-1.svg",
  },
];

export function CodeVideoButtons() {
  const [btnIsOn, setBtnIsOn] = useState({
    codeOn: true,
    videoOn: true,
  });

  return (
    <>
      {buttons.map((o) => (
        <Tooltip placement="bottom" key={o.src}>
          <Avatar
            isBordered={btnIsOn[o.btnType]}
            color="success"
            as="button"
            onClick={() =>
              setBtnIsOn({ ...btnIsOn, [o.btnType]: !btnIsOn[o.btnType] })
            }
            className="transition-transform bg-"
            size="xl"
            src={o.src}
          />
        </Tooltip>
      ))}
    </>
  );
}
