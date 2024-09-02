"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAppSelector } from "@/store";
import { useProduct } from "@/store/hooks";
import { Button } from "@nextui-org/react";
import placeholderImage from "@/assets/images/logo_old.svg";
import Link from "next/link"

function Featured() {
  const { fetchProducts } = useProduct();
  const products = useAppSelector((state) =>
    state.product.products.filter(product => product.featured)
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <React.Fragment>
      <div className="w-full max-w-[1200px] mx-auto pt-10 px-4 pb-[70px]">
        <Carousel className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-row justify-between items-center mb-[60px] w-full pr-8">
            <div className="w-full max-w-[1100px] mx-auto">
              <div className="lg:text-[24px] font-semibold select-none h-[0px] xs:text-[18px] pt-[10px] lg:pt-[0px]">
                Productos populares
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
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="lg:pl-3 md:pl-3 xs:pl-1 md:basis-1/4 lg:basis-1/4 xs:basis-1/3 flex flex-col justify-between"
              >
                <div className="w-full max-w-[100%] relative mx-auto mb-4 group">
                  <Link href={`/productos/${product.slug}`} >
                    <div className="relative w-full max-w-[100%] aspect-w-4 aspect-h-3 overflow-hidden"> {/* Contenedor con relación de aspecto */}
                      <Image
                        src={product.images[0]?.url || placeholderImage}
                        alt={product.name || "Product Image"}
                        className="object-cover"
                        layout="responsive" // Ajusta la imagen al contenedor
                        width={115} // Ajusta el ancho según tus necesidades
                        height={68} // Ajusta la altura según tus necesidades
                      />
                    </div>
                    <div className="absolute inset-0 hover-group:bg-black bg-black bg-opacity-20 rounded-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <Button
                      onClick={() => console.log("asd")}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0a1d35] text-white rounded-md px-8 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      data-hover={false}
                    >
                      Add to cart
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-col flex-grow justify-between">
                  <Link href={`/productos/${product.slug}`} className="mt-4 lg:text-xl xs:text-[16px] font-semibold">
                    {product.name || "Title"}
                  </Link>
                  <div className="text-lg font-light mt-1 xs:text-[12px] leading-4 xs:max-w-[100px] lg:max-w-full">
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
