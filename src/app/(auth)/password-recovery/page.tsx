"use client";

import React from 'react';
import Image from "next/image";
import { images } from '@/constants';
import { PasswordRecoveryForm } from "@/components";

function PasswordRecovery() {
  const [send, setSend] = React.useState(false);

  const sentHandler = () => {
    setSend(true);
  };

  return (
    <React.Fragment>
      <div className="w-full mt-4 pb-2 lg:hidden xs:block z-20">
        <div className="flex justify-end mr-8">
          <p className="text-[#AADBC1] text-[24px]">Iniciar Sesion</p>
          <Image src={images.lock} alt="" width={30} height={33} className="ml-1 mt-[3px]" />
        </div>

        {!send ? (
          <div className="mx-auto font-normal text-[18px] mb-4 mt-4 text-center xs:block lg:hidden">
            Vamos a completar unos pasos para restablecer tu contraseña.
          </div>
        ) : (
          <div className="max-w-[418px] mx-auto font-normal text-[18px] mb-4 mt-4 text-center">
            Revisa tu bandeja de entrada (puede estar en spam).  Haz clic en el enlace del correo para restablecer tu contraseña.
          </div>
        )}
      </div>

      <div className="flex lg:min-h-screen xs:min-h-[calc(100vh-180px)]">
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
            <PasswordRecoveryForm sentHandler={sentHandler} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PasswordRecovery
