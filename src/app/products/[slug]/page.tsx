
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector, RootState } from "@/store";
import { useProduct } from "@/store/hooks";
import Image from "next/image";
import placeholderImage from "@/assets/images/logo_old.svg";
import { Button } from "@nextui-org/react";

export default function ProductDetails() {
  const { slug } = useParams();
  const { fetchProducts } = useProduct();
  const products = useAppSelector((state: RootState) => state.product.products);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
  }, [fetchProducts]);

  useEffect(() => {
    // Find the product by slug
    if (products.length) {
      const foundProduct = products.find((p) => p.slug === slug);
      setProduct(foundProduct || null);
    }
  }, [products, slug]);

  if (!product) {
    return <div>Loading...</div>; // or a spinner, or an empty state message
  }

  return (
    <React.Fragment>
      <div className="py-10 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Column: Large Image */}
        <div className="flex justify-center items-center">
          <Image
            src={product.image || placeholderImage}
            alt={product.name || "Product Image"}
            className="w-full h-auto object-cover"
            width={500}
            height={500}
          />
        </div>

        {/* Second Column: Product Details */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg font-light">{product.description}</p>
          <div className="text-xl font-semibold">
            ${product.price.toFixed(2)}
          </div>
          {product.discount > 0 && (
            <div className="text-lg font-semibold text-red-500">
              Discount: {product.discount}%
            </div>
          )}

          {/* Colors and Sizes will be added here */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Colors:</h2>
            <div className="flex space-x-2 mt-2">
              {/* Loop through product.colors and display color options */}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Sizes:</h2>
            <div className="flex space-x-2 mt-2">
              {/* Loop through product.sizes and display size options */}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button className="mt-6 bg-blue-500 text-white rounded-md px-4 py-2">
            Add to Cart
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

