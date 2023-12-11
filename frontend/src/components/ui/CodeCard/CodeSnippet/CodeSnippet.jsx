import React from "react";
import { Snippet } from "@nextui-org/react";

export function CodeSnippet({ code }) {
  return (
    <>
      <Snippet
        radius="sm"
        size="lg"
        hideSymbol="true"
        classNames={{
          base: "items-start bg-default/ ",
        }}
        tooltipProps={{
          color: "foreground",
          content: "Copy this snippet",
          disableAnimation: true,
          placement: "top",
          closeDelay: 0,
        }}
      >
        <pre>{code}</pre>
      </Snippet>
    </>
  );
}
