"use client"

import React from "react"

import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import { images } from "@/constants"

function Mobile() {
  return (
    <React.Fragment>
      <div className="mx-4">
        <Drawer direction="left">
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="w-full">
                <Image src={images.logo} width={115} height={68} alt="Logo" className="w-[115px] mx-auto" />
              </div>
            </DrawerHeader>
            some
          </DrawerContent>
        </Drawer>
      </div>
    </React.Fragment>
  )
}

export default Mobile
