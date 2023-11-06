import React from "react";
import { Snippet } from "@nextui-org/react";

export function CodeSnippet() {
  return (
    <>
      <Snippet
        symbol=""
        className="custom-snippet"
        tooltipProps={{
          color: "foreground",
          content: "Copy this snippet",
          disableAnimation: true,
          placement: "top",
          closeDelay: 0,
        }}
      >
        <span>npm install @nextui-org/react</span>
        <span>npm install @nextui-org/react</span>
        <span>npm install @nextui-org/react</span>
        <span>npm install @nextui-org/react</span>
      </Snippet>
    </>
  );
}
