"use client";

import React from "react";
import Image from "next/image";
import { images, Icon } from "@/constants";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Info, useMediaQuery, Select } from "@/components";
import { RootState, useAppSelector } from "@/store";

// Function to determine the select options based on user role
const getSelectOptions = (user: any) => {
  // Hardcoded admin check
  if (!user.isAdmin) {
    return ["Administrar", "Cerrar sesión"];
  }
  return ["Cerrar sesión"];
};

function Navbar() {
  const user = useAppSelector((state: RootState) => state.user);
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const router = useRouter();

  const onSelectChange = (value: string) => {
    console.log(value);
    if (value === "Cerrar sesión") {
      // Add your logout logic here
    }

    if (value === "Administrar") {
      router.push("/dashboard");
    }
  };

  const selectOptions = getSelectOptions(user);

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="max-w-screen-lg mx-auto py-4">
          {isDesktop ?
            <div className="flex flex-row justify-between items-center max-w-screen-lg mx-auto">
              <div>
                <Image src={images.logo} width={130} height={68} alt="Logo" />
              </div>

              <div className="flex flex-row gap-8">
                <Link href="/" className="text-[#1D1D1D] font-bold text-[20px]">Inicio</Link>
                <Link href="/productos" className="text-[#1D1D1D] font-bold text-[20px]">Productos</Link>
                <Link href="/encuentranos" className="text-[#1D1D1D] font-bold text-[20px]">Encúentranos</Link>
              </div>

              <div className="flex flex-row gap-8">
                <Button isIconOnly href="#" className="rounded-full bg-[transparent]">
                  <Icon icon="icon-shopping_bag" color="black" className="text-[26px]" />
                </Button>
                {!user.email ? (
                  <Button
                    onClick={() => router.push("/iniciar-sesion")}
                    className="bg-[#AADBC1] text-white rounded-[4px] text-[20px]"
                    radius="none"
                  >
                    <span className="pl-2 pr-2">Login</span>
                  </Button>
                ) : (
                  <Select
                    value="Mi cuenta"
                    options={selectOptions}
                    updateValue={onSelectChange}
                    className="z-20 bg-[#0a1d35] capitalize hover:cursor-pointer"
                    textColor="text-white"
                  />
                )}
              </div>
            </div>
            :
            <div className="flex flex-row justify-between mx-6">
              <div>
                <Button isIconOnly href="#" className="rounded-full" size="lg">
                  <Icon icon="icon-shopping_bag" color="black" className="text-[24px]" />
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <Image src={images.logo} width={80} height={40} alt="Logo" className="mt-[-17px]" />
              </div>

              <div>
                <Button isIconOnly href="#" className="rounded-full" size="lg">
                  <Icon icon="icon-user" color="black" className="text-[24px]" />
                </Button>
              </div>
            </div>
          }
        </div>
      </div>

      {!isDesktop &&
        (
          <div className="fixed bottom-4 left-0 right-0 z-10">
            <div className="bg-[#1d1d1d] max-w-[300px] mx-auto rounded-[40px] px-6 py-2">
              <div className="w-[250px] mx-auto">
                <div className="flex flex-row justify-between">
                  <div>
                    <Button isIconOnly href="#" className="rounded-full bg-black" size="lg">
                      <Icon icon="icon-home" color="white" className="text-[24px]" />
                    </Button>
                  </div>

                  <div>
                    <Button isIconOnly href="#" className="rounded-full bg-black" size="lg">
                      <Icon icon="icon-store_outline" color="white" className="text-[24px]" />
                    </Button>
                  </div>

                  <div>
                    <Button isIconOnly href="#" className="rounded-full bg-black" size="lg">
                      <Icon icon="icon-location_outline" color="white" className="text-[24px]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <Info />
    </React.Fragment>
  );
}

export default Navbar;
