"use client";

import React from 'react';
import Image from "next/image";
import { images } from '@/constants';
import { PasswordResetForm } from "@/components";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function PasswordReset() {
  const router = useRouter();
  const [send, setSend] = React.useState(false);

  const sentHandler = () => {
    setSend(true);
  };

  return (
    <React.Fragment>
      <div className="w-full mt-4 pb-2 lg:hidden xs:block z-20">
        <div className="flex justify-end mr-8">
          <p className="text-[#AADBC1] text-[24px]">
            {!send ? (<>restablecer clave</>) : (<>Todo salió bien</>)}
          </p>
          <Image src={images.lock} alt="" width={30} height={33} className="ml-1 mt-[3px]" />
        </div>

        {!send ? (
          <div className="mx-auto font-normal text-[18px] mb-4 mt-4 text-center xs:block lg:hidden">
            Vamos a completar unos pasos para restablecer tu contraseña.
          </div>
        ) : (
          <React.Fragment>
            <div className="max-w-[418px] mx-auto font-normal text-[18px] mt-4 text-center">
              ¡Su contraseña fué cambiada con éxito! Ya puede iniciar sesión con su nueva contraseña.
            </div>

            <div className="lg:w-full mt-0 mx-8 xs:mt-1">
              <Button
                onClick={() => router.push("/iniciar-sesion")}
                className="bg-[#AADBC1] text-white w-full mt-8 mb-4 h-12 font-semibold text-[24px] py-8">
                Iniciar sesión
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>

      <div className="flex lg:min-h-screen xs:min-h-[calc(100vh-320px)]">
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
            <PasswordResetForm sentHandler={sentHandler} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PasswordReset
