"use client"; //important

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useAppSelector } from "@/store";
import { useProduct } from "@/store/hooks";
import placeholderImage from "@/assets/images/logo_old.svg";
import Link from "next/link"

// Función para truncar el texto
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ITEMS_PER_PAGE = 9; // Número de productos por página

function Products() {
  const { fetchProducts } = useProduct();
  const products = useAppSelector((state) => state.product.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Calcula los índices de los productos a mostrar en la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <React.Fragment>
      <div className="max-w-[1200px] mx-auto">
        <div className="w-full max-w-[900px]">
          <div className="grid grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <Link href={`/productos/${product.slug}`} key={product.id} className="flex flex-col h-full relative bg-white rounded-md overflow-hidden">
                <div className="flex-grow relative">
                  <Image
                    src={product.image || placeholderImage}
                    alt={product.name || "Product Image"}
                    className="w-full h-[200px] object-cover"
                    width={115}
                    height={68}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-[4px] hidden" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-center text-white">
                      <Button className="bg-[#0a1d35] text-white rounded-[4px] px-8 hidden group-hover:block" data-hover={false}>
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="lg:text-[24px] xs:text-[16px] font-semibold mb-2">
                    {truncateText(product.name || "Title", 24)}
                  </div>
                  <div className="lg:text-[18px] xs:text-[14px] font-light mb-2">
                    {product.description}
                  </div>
                  <div className="mt-auto text-[24px] font-semibold">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Products;
