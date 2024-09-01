"use client";

import React from 'react';
import Image from "next/image";
import { images } from '@/constants';
import { SignInForm } from "@/components";

function SignIn() {
  return (
    <React.Fragment>
      <div className="w-full mt-4 pb-2 lg:hidden xs:block z-20">
        <div className="flex justify-end mr-8">
          <p className="text-[#0A1D35] text-[24px]">Iniciar Sesion</p>
          <Image src={images.lock} alt="" width={30} height={33} className="ml-1 mt-[3px] text-[#0A1D35]" />
        </div>
      </div>

      <div className="flex lg:min-h-screen xs:min-h-[calc(100vh-60px)]">
        <div className="relative hidden lg:block w-[100%]">
          <Image
            src={images.auth}
            alt=""
            className="w-full h-full object-cover rounded-tr-[20px] rounded-br-[20px]"
            style={{ objectPosition: 'center top' }}
            layout="fill"
          />
        </div>

        <div className={`flex flex-col justify-center py-6 xs:py-0 xs:mb-3 bg-white rounded-2xl 
          mx-auto px-4 
          lg:min-w-[400px] max-w-[650px]
          lg:w-full lg:mx-0 
        `}>
          <div className="pt-12 xs:pt-0">
            <SignInForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SignIn
