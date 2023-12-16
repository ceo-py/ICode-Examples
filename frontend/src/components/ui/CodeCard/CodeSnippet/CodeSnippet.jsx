import React from "react";
import { Snippet } from "@nextui-org/react";
import DOMPurify from "dompurify";

export function CodeSnippet({ code }) {
  const cleanCode = DOMPurify.sanitize(code);

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
        <pre>
          <code dangerouslySetInnerHTML={{ __html: cleanCode }} />
        </pre>
      </Snippet>
    </>
  );
}
