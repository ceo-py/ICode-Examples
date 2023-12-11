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
          color: "primary",
          content: "Copy this snippet",
          disableAnimation: true,
          placement: "bottom",
          closeDelay: 0,
        }}
      >
        <pre>{code}</pre>
      </Snippet>
    </>
  );
}
