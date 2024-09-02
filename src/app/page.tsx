import React from "react"
import Image from "next/image";
import { images } from "@/constants"
import { Navbar, Footer, Categories, Featured } from "@/components"

export default function Home() {
  return (
    <React.Fragment>
      <Navbar />

      <div className="flex justify-center pt-4">
        <div className="w-full max-w-[1200px] flex">
          <Image src={images.banner} alt="" width={1200} className="w-full max-w-[1180px] mx-auto pl-[13px]" />
        </div>
      </div>

      <Categories />
      <Featured />

      <Footer />
    </React.Fragment>
  );
}
