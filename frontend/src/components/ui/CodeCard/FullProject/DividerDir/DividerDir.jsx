import { Divider } from "@nextui-org/react";
import React from "react";

export function DividerDir({ dirs, setDirs, navigate, taskName }) {
  // ''
  return (
    <div className="flex flex-wrap min-h-full items-center space-x-2 text-small">
      <React.Fragment key={crypto.randomUUID()}>
        <div
          className={"cursor-pointer hover:underline text-primary"}
          onClick={() => {
            const urlWithoutFileParam =
              window.location.search.split("&file=")[0];
            navigate(urlWithoutFileParam);
            setDirs([]);
          }}
        >
          {taskName}
        </div>
        {dirs.length > 0 && <Divider className="h-5" orientation="vertical" />}
      </React.Fragment>
      {dirs.map((x, i) => (
        <React.Fragment key={crypto.randomUUID()}>
          <div
            className={`${
              i < dirs.length - 1
                ? "cursor-pointer hover:underline text-primary"
                : ""
            }`}
            onClick={() => {
              if (i < dirs.length - 1) {
                const newDirs = dirs.slice(0, i + 1);
                const urlWithoutFileParam =
                  window.location.search.split("&file=")[0];
                navigate(urlWithoutFileParam);
                setDirs(newDirs);
              }
            }}
          >
            {x}
          </div>
          {i < dirs.length - 1 && (
            <Divider className="h-5" orientation="vertical" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
