import React, { useEffect, useState } from "react";
import { Snippet } from "@nextui-org/react";
import DOMPurify from "dompurify";

export function CodeSnippet({ code }) {
  const cleanCode = DOMPurify.sanitize(code);
  const [rows, setRows] = useState();

  useEffect(() => {
    const preElement = document.querySelector("pre");
    const style = window.getComputedStyle(preElement);
    const lineHeight = parseInt(style.lineHeight, 10);
    const containerHeight = preElement.clientHeight;
    setRows(Math.round(containerHeight / lineHeight));
  }, [cleanCode]);

  return (
    <>
      <div className="flex">
        <Snippet
          radius="sm"
          size="lg"
          hideSymbol="true"
          classNames={{
            base: "items-start bg-default/ ",
          }}
          disableCopy={true}
          hideCopyButton={true}
        >
          {Array.from({ length: rows }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </Snippet>

        <Snippet
          radius="sm"
          size="lg"
          hideSymbol="true"
          classNames={{
            base: "items-start bg-default/ grow",
          }}
          tooltipProps={{
            color: "primary",
            content: "Copy this snippet",
            disableAnimation: true,
            placement: "bottom",
            closeDelay: 0,
          }}
        >
          <pre className="flex overflow-x-auto">
            <code dangerouslySetInnerHTML={{ __html: cleanCode }} />
          </pre>
        </Snippet>
      </div>
    </>
  );
}
