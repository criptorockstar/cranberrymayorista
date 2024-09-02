"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector, RootState } from "@/store";
import { useProduct } from "@/store/hooks";
import Image from "next/image";
import placeholderImage from "@/assets/images/logo_old.svg";
import { Button } from "@nextui-org/react";
import { Input } from '@/components';
import { Icon } from "@/constants";
import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductDetails() {
  const { slug } = useParams();
  const { fetchProducts } = useProduct();
  const products = useAppSelector((state: RootState) => state.product.products);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Find the product by slug
    if (products.length) {
      const foundProduct = products.find((p) => p.slug === slug);
      setProduct(foundProduct || null);
    }
  }, [products, slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="py-8 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* First Column: Large Image */}
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src={product.images.length > 0 ? product.images[0].url : placeholderImage}
              alt={product.name || "Product Image"}
              className="object-cover max-w-[97%] ml-[3%] h-full rounded-xl"
              layout="fill"
            />
          </div>
        </div>

        {/* Second Column: Product Details */}
        <div className="flex flex-col space-y-4 pl-8 bg-white  lg:min-w-[400px] max-w-[650px]">
          <div>
            <h1 className="text-[30px] font-bold">{product.name}</h1>
            <p className="text-[20px] font-light">{product.description}</p>

            <div className="flex flex-row">
              {product.discount > 0 ? (
                <>
                  <div className="text-[24px] font-thin">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-[24px] font-thin ml-4 text-[#7D7D7D] line-through">
                    ${product.discount.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-[24px] font-thin">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>

            {/* Sizes */}
            <div className="mt-4">
              <h2 className="text-[20px] font-bold">Talle:</h2>
              <div className="flex space-x-2 mt-2">
                {product.sizes.length > 0 ? (
                  product.sizes.map((size: any) => (
                    <span
                      key={size.id}
                      className="px-4 py-2 border border-[#0A1D35] rounded-md font-thin"
                    >
                      {size.name}
                    </span>
                  ))
                ) : (
                  <p>Talle único</p>
                )}
              </div>
            </div>

            {/* Colors */}
            <div className="mt-4">
              <h2 className="text-[20px] font-bold">Color:</h2>
              <div className="flex space-x-2 mt-2">
                {product.colors.length > 0 ? (
                  product.colors.map((color: any) => (
                    <span
                      key={color.id}
                      className="px-4 py-2 border border-[#0A1D35] rounded-md"
                    >
                      {color.name}
                    </span>
                  ))
                ) : (
                  <p>No disponible</p>
                )}
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mt-4 flex justify-start">
              <div className="w-[160px]">
                <Input quantity={true} type="text" className="w-full" />
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6 flex justify-start">
            <Button
              className="bg-[#0A1D35] text-white rounded-md px-10 py-7 text-[20px]"
            >
              <Icon icon="icon-shopping_bag" className="text-[20px]" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Carousel for additional images */}
        <div className="w-full lg:max-w-[97%] lg:ml-[3%] mt-4">
          <Carousel className="w-full mx-auto">
            <CarouselContent className="flex -ml-1">
              {product.images.map((image: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="lg:pl-3 md:pl-3 xs:pl-1 md:basis-1/4 lg:basis-1/4 xs:basis-1/3"
                >
                  <div className="w-full max-w-[100%] relative mx-auto">
                    <Image
                      src={image.url || placeholderImage}
                      alt={product.name || "Additional Image"}
                      className="w-full h-auto rounded-[8px]"
                      width={115}
                      height={68}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[8px]" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto pt-10 px-4 pb-[70px]">
        <Carousel className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-row justify-between items-center mb-[60px] w-full pr-8">
            <div className="w-full max-w-[1100px] mx-auto">
              <div className="lg:text-[24px] font-semibold select-none h-[0px] xs:text-[18px] pt-[10px] lg:pt-[0px]">
                Otros productos
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
