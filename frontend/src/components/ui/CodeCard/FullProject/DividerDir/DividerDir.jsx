import { Divider } from "@nextui-org/react";
import React from "react";

export function DividerDir({ dirs }) {

  return (
    <div className="flex h-5 items-center space-x-2 text-small">
      {dirs.map((x, i) => (
        <React.Fragment key={crypto.randomUUID()}>
          <div>{x}</div>
          <Divider orientation="vertical" />
        </React.Fragment>
      ))}
    </div>
  );
}
