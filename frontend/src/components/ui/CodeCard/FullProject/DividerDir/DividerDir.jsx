import { Divider } from "@nextui-org/react";
import React from "react";

export function DividerDir({ dirs, setDirs }) {
  return (
    <div className="flex h-5 items-center space-x-2 text-small">
      {dirs.map((x, i) => (
        <React.Fragment key={crypto.randomUUID()}>
          <div
            className={`${
              i < dirs.length - 1
                ? "cursor-pointer hover:underline text-primary"
                : ""
            }`}
            onClick={() =>
              i < dirs.length - 1 ? setDirs(dirs.slice(0, i + 1)) : null
            }
          >
            {x}
          </div>
          {i < dirs.length - 1 && <Divider orientation="vertical" />}
        </React.Fragment>
      ))}
    </div>
  );
}
