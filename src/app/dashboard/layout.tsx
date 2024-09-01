"use client"

import React from "react"
import { useMediaQuery, Navbar, Footer, Sidebar, Products } from "@/components"
import Image from "next/image"
import { images } from "@/constants"


function DashboardLayout() {
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  return (
    <React.Fragment>
      <div className="flex justify-center ">
        <div className="w-full flex">
          {/* Sidebar */}
          <div className="w-[250px] p-4 hidden lg:block">
            {isDesktop ? (
              <React.Fragment>
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <Image src={images.logo} alt="" />
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                Modil
              </React.Fragment>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 bg-[#f0f0f0] p-4">
            Content
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default DashboardLayout
