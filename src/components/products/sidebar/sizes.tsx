"use client"

import React, { useEffect, useState } from "react";
import type { Selection } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppSelector, useAppDispatch, RootState } from "@/store";
import { useProduct } from "@/store/hooks";

function Sizes() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));
  const [_, setSelectedSizes] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { fetchSizes } = useProduct();
  const sizes = useAppSelector((state: RootState) => state.product.sizes);

  useEffect(() => {
    fetchSizes();
  }, [dispatch, fetchSizes]);

  const handleCheckboxChange = (sizeId: string, isChecked: boolean) => {
    setSelectedSizes((prevSelected) => {
      const updatedSelection = isChecked
        ? [...prevSelected, sizeId]
        : prevSelected.filter(id => id !== sizeId);

      console.log("Selected Sizes:", updatedSelection);

      return updatedSelection;
    });
  };

  return (
    <React.Fragment>
      <Accordion isCompact
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Talles">
          <div className="flex flex-col">
            {sizes.map((size) => (
              <div key={size.id} className="pb-5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size.id}`}
                    onCheckedChange={(isChecked) => handleCheckboxChange(size.id, isChecked)}
                  />
                  <label
                    htmlFor={`size-${size.id}`}
                    className="text-sm font-semibold select-none leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size.name}
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

export default Sizes;
