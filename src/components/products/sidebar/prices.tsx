"use client"

import React from "react"
import type { Selection } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";

function Prices() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["1"]));
  const handleChange = (value: number | number[]) => {
    console.log(value);
  };

  return (
    <React.Fragment>
      <Accordion isCompact
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Filtrar por precios">
          <Slider
            label="."
            step={50}
            minValue={0}
            maxValue={1000}
            defaultValue={[100, 500]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md py-4"
            onChange={handleChange}
            classNames={{
              label: "invisible",
              value: "font-medium text-default-500 text-small",
            }}
          />
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  )
}

export default Prices
