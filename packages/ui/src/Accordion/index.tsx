import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export interface AccordionItem {
  key: string;
  value: string;
}
export interface AccordionSectionProps {
  items: AccordionItem[];
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
