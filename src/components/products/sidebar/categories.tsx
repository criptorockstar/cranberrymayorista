"use client"

import React, { useEffect, useState } from "react"
import { Accordion, AccordionItem } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSelector, useAppDispatch } from "@/store"
import { useCategory } from "@/store/hooks"

function Categories() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));
  const [_, setSelectedCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { fetchCategories } = useCategory();
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    fetchCategories();
  }, [dispatch, fetchCategories]);

  const handleCheckboxChange = (categoryId: any, isChecked: any) => {
    setSelectedCategories((prevSelected) => {
      const updatedSelection = isChecked
        ? [...prevSelected, categoryId]
        : prevSelected.filter(id => id !== categoryId);

      console.log("Selected Categories:", updatedSelection);

      return updatedSelection;
    });
  };

  return (
    <React.Fragment>
      <Accordion isCompact
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Categorías">
          <div className="flex flex-col">
            {categories.map((category) => (
              <div key={category.id} className="pb-5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    onCheckedChange={(isChecked) => handleCheckboxChange(category.id, isChecked)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-semibold select-none leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
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

export default Categories;
