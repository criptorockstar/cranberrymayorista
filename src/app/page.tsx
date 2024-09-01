import React from "react"
import Image from "next/image";
import { images } from "@/constants"
import { Navbar, Footer, Categories, Featured } from "@/components"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <React.Fragment>
      <Navbar />

      <div className="flex justify-center py-[60px]">
        <div className="w-full max-w-[1200px] flex">
          <Image src={images.banner} alt="" />
        </div>
      </div>

      <Categories />

      <Featured />

      <Footer />
    </React.Fragment>
  );
}
