"use client"

import React, { useEffect, useState } from "react";
import type { Selection } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppSelector, useAppDispatch, RootState } from "@/store";
import { useProduct } from "@/store/hooks";

function Colors() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));
  const [_, setSelectedColors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { fetchColors } = useProduct();
  const colors = useAppSelector((state: RootState) => state.product.colors);

  useEffect(() => {
    fetchColors();
  }, [dispatch, fetchColors]);

  const handleCheckboxChange = (colorId: any, isChecked: any) => {
    setSelectedColors((prevSelected) => {
      const updatedSelection = isChecked
        ? [...prevSelected, colorId]
        : prevSelected.filter(id => id !== colorId);

      console.log("Selected Colors:", updatedSelection);

      return updatedSelection;
    });
  };

  return (
    <React.Fragment>
      <Accordion isCompact
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Colores">
          <div className="flex flex-col">
            {colors.map((color) => (
              <div key={color.id} className="pb-5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.id}`}
                    onCheckedChange={(isChecked) => handleCheckboxChange(color.id, isChecked)}
                  />
                  <label
                    htmlFor={`color-${color.id}`}
                    className="text-sm font-semibold select-none leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {color.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  );
}

export default Colors;
