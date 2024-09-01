"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@nextui-org/react";

function Prices() {
  return (
    <React.Fragment>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger><div className="font-semibold">Filtrar por precios</div></AccordionTrigger>
          <AccordionContent>
            <Slider
              label="."
              step={50}
              size="sm"
              minValue={0}
              maxValue={1000}
              defaultValue={[100, 500]}
              formatOptions={{ style: "currency", currency: "USD" }}
              classNames={{
                base: "max-w-md gap-3",
                filler: "bg-black",
                thumb: [
                  "transition-size",
                  "bg-black",
                ],
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  )
}

export default Prices
