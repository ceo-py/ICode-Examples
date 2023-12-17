import { Accordion, AccordionItem } from "@nextui-org/react";

export function About({ about }) {
  return (
    <Accordion>
      <AccordionItem key="about user" aria-label="about user" title="About">
        {about}
      </AccordionItem>
    </Accordion>
  );
}
