"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAppSelector } from "@/store";
import { useProduct } from "@/store/hooks";
import placeholderImage from "@/assets/images/logo_old.svg";
import Link from "next/link"

// Función para truncar el texto
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

function Featured() {
  const { fetchFeaturedProducts } = useProduct();
  const products = useAppSelector((state) =>
    state.product.products.filter(product => product.featured)
  );

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <React.Fragment>
      <div className="w-full max-w-[1100px] mx-auto pt-10 px-4 pb-[70px]">
        <Carousel className="w-full max-w-[900px] mx-auto">
          <div className="flex flex-row justify-between items-center mb-[60px] w-full px-8">
            <div>
              <div className="lg:text-[24px] font-semibold select-none h-[0px] xs:text-[18px] pt-[10px] lg:pt-[0px]">
                Productos populares
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
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="lg:pl-6 md:pl-3 xs:pl-1 md:basis-1/4 lg:basis-1/4 xs:basis-1/3 flex flex-col justify-between"
              >
                <Link href={`/productos/${product.slug}`} className="w-full lg:max-w-[220px] md:max-w-[220px] sm:max-w-[220px] xs:max-w-[150px] relative mx-auto mb-4">
                  <Image
                    src={product.image || placeholderImage}
                    alt={product.name || "Product Image"}
                    className="w-full h-auto"
                    width={115}
                    height={68}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-[4px]" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-center text-white">
                      {truncateText(product.name || "Unnamed Product", 18)}
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col flex-grow justify-between">
                  <Link href={`/productos/${product.slug}`} className="mt-4 lg:text-xl xs:text-[18px] font-semibold">
                    {product.name || "Title"}
                  </Link>
                  <div className="text-lg font-light mt-1 xs:text-[12px]">
                    {product.description || "Information about the item."}
                  </div>
                  <div className="mt-1 text-xl font-semibold">
                    ${product.price.toFixed(2)}
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

export default Featured;
