"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/store";
import { useCategory } from "@/store/hooks";
import placeholderImage from "@/assets/images/logo_old.svg";
import Link from "next/link"

const truncateText = (text: any, maxLength: any) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

function Categories() {
  const { fetchCategories } = useCategory();
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <React.Fragment>
      <div className="w-full max-w-[1100px] mx-auto lg:pt-10 px-4">
        <Carousel className="w-full max-w-[900px] mx-auto">
          <div className="flex flex-row justify-between items-center mb-[60px] w-full px-8">
            <div>
              <div className="lg:text-[24px] font-semibold select-none h-[0px] xs:text-[18px] pt-[10px] lg:pt-[0px]">
                Categorias
              </div>
            </div>

            <div className="relative">
              <div className="absolute h-[42px] flex space-x-2 -ml-5">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>

          <CarouselContent className="flex -ml-1">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="lg:pl-6 md:pl-3 xs:pl-1 md:basis-1/4 lg:basis-1/4 xs:basis-1/3"
              >
                <div className="w-full lg:max-w-[220px] md:max-w-[220px] sm:max-w-[220px] xs:max-w-[150px] relative mx-auto">
                  <Image
                    src={category.image || placeholderImage} // Usar imagen de respaldo si `category.image` es `undefined`
                    alt={category.name || "Category"} // Asegurarse de que `alt` siempre tenga un valor
                    className="w-full h-auto"
                    width={115}
                    height={68}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-[4px]" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-center text-white">{truncateText(category.name, 25) || "Unnamed Category"}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </React.Fragment>
  );
}

export default Categories;
