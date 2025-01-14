"use client";

import React, { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export interface AccordionItemProps {
  key: string;
  value: ReactNode;
}
export interface AccordionSectionProps {
  items: AccordionItemProps[];
}

export default function AccordionSection({ items }: AccordionSectionProps) {
  return (
    <div className="mx-auto w-full max-w-md p-4">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`}>
            <AccordionTrigger>{item.key}</AccordionTrigger>
            <AccordionContent>{item.value}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
