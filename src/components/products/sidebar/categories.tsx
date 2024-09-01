"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

function Categories() {
  return (
    <React.Fragment>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Categorias</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="pb-5">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-semibold select-none leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Men
                  </label>
                </div>
              </div>

              <div className="mt4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms2" />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-semibold leading-none select-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Men
                  </label>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  )
}

export default Categories
