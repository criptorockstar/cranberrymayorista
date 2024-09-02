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

function Categories() {
  const { fetchCategories } = useCategory();
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <React.Fragment>
      <div className="w-full max-w-[1200px] mx-auto lg:pt-10 px-4">
        <Carousel className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-row justify-between items-center mb-[60px] w-full pr-8">
            <div className="w-full max-w-[1100px] mx-auto">
              <div className="lg:text-[24px] font-semibold select-none h-[0px] xs:text-[18px] pt-[10px] lg:pt-[0px]">
                Categorias
              </div>
            </div>

            <div className="relative">
              <div className="absolute h-[42px] flex space-x-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>

          <CarouselContent className="flex -ml-1">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="lg:pl-3 md:pl-3 xs:pl-1 md:basis-1/4 lg:basis-1/4 xs:basis-1/3"
              >
                <div className="w-full max-w-[100%] relative mx-auto">
                  <Link href="/">
                    <Image
                      src={category.image || placeholderImage}
                      alt={category.name || "Category"}
                      className="w-full h-auto"
                      width={115}
                      height={68}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[4px]" />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="text-center select-none text-white font-semibold">{category.name || "Unnamed Category"}</div>
                    </div>
                  </Link>
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
