import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";

export function About({ about }) {
  return (
    <Accordion hideIndicator={true}>
      <AccordionItem
        key="about user"
        aria-label="about user"
        title={
          <Avatar
            classNames={{
              base: "bg- cursor-pointer",
            }}
            src=""
          />
        }
      >
        {about}
      </AccordionItem>
    </Accordion>
  );
}
