"use client";

import React from "react";
import { Input } from "@/components";
import { Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

function PasswordResetForm({
  sentHandler,
}: any) {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors: formErrors } } = useForm({
    defaultValues: {
      password: "",
    },
    mode: 'onChange'
  });

  const [sent, setSent] = React.useState(false);

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data)
    setSent(true);
    sentHandler();
  });

  return (
    <React.Fragment>
      <div className={`
        max-w-[418px] mx-auto mb-4
        font-bold text-[50px] leading-[68px]
        text-center lg:text-left`
      }>
        <div className="lg:text-left max-w-[418px] hidden lg:block">
          {!sent ? (<span>Nueva clave</span>) : (
            <span>
              Todo salió bien
            </span>
          )}
        </div>
      </div>

      {!sent ? (
        <div className="max-w-[418px] mx-auto font-normal text-[18px] mb-4 text-center lg:text-left hidden lg:block">
          Vamos a completar unos pasos para restablecer tu contraseña.
        </div>
      ) : (
        <div className="max-w-[418px] mx-auto font-normal text-[18px] mb-4 mt-4 text-center hidden lg:block">
          ¡Su contraseña fué cambiada con éxito! Ya puede iniciar sesión con su nueva contraseña.
        </div>
      )}

      <div className="flex justify-center">
        <form className="w-full max-w-[408px]">
          <div className="w-full">
            {!sent && (
              <div className="mb-2 font-medium lg:text-[20px] xs:text-[18px]">Ingresa tu nueva contraseña</div>
            )}

            {!sent && (
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "* La contraseña no puede estar vacía",
                  minLength: {
                    value: 6,
                    message: "* Debe tener al menos 6 caracteres"
                  }
                }}
                render={({ field }) => (
                  <Input
                    error={formErrors.password ? formErrors.password.message : ''}
                    placeholder="Contraseña"
                    password={true}
                    {...field}
                  />
                )}
              />
            )}
          </div>

          {!sent ? (
            <div className="lg:w-full mt-12 xs:w-[200px] xs:mx-auto xs:mt-4">
              <Button
                onClick={onSubmit}
                className="bg-[#AADBC1] text-white w-full mt-8 mb-4 h-12 font-semibold text-[24px] py-8">
                Continuar
              </Button>
            </div>
          ) : (
            <div className="lg:w-full mt-0 lg:block hidden xl:block">
              <Button
                onClick={() => router.push("/iniciar-sesion")}
                className="bg-[#AADBC1] text-white w-full mt-8 mb-4 h-12 font-semibold text-[24px] py-8">
                Iniciar sesión
              </Button>
            </div>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}

export default PasswordResetForm;
