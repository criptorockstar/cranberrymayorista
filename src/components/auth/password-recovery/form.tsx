"use client";

import React from "react";
import { Input } from "@/components";
import { Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/store/hooks";

interface ServerErrors {
  email?: string;
  password?: string;
}

function PasswordRecoveryForm({
  sentHandler,
}: any) {
  const { passwordRecovery, loading } = useAuth();
  const { control, handleSubmit, formState: { errors: formErrors }, setError } = useForm({
    defaultValues: {
      email: "",
    },
    mode: 'onChange'
  });

  const [sent, setSent] = React.useState(false);

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      await passwordRecovery(data.email);
      setSent(true);
      sentHandler();
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const serverErrors = error.response.data.errors as ServerErrors;
        for (const [field, message] of Object.entries(serverErrors)) {
          if (field) {
            setError(field as keyof typeof formErrors, {
              type: "manual",
              message: message || '',
            });
          }
        }
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
    }
  });

  return (
    <React.Fragment>
      <div className={`
        max-w-[418px] mx-auto mb-4
        font-bold text-[50px] leading-[68px]
        text-center lg:text-left`
      }>
        <div className="lg:text-left max-w-[418px] hidden lg:block">
          Recuperar clave
        </div>
      </div>

      {!sent ? (
        <div className="max-w-[418px] mx-auto font-normal text-[18px] mb-4 text-center lg:text-left hidden lg:block">
          Vamos a completar unos pasos para restablecer tu contraseña.
        </div>
      ) : (
        <div className="max-w-[418px] mx-auto font-normal text-[18px] mb-4 mt-4 text-center hidden lg:block">
          Revisa tu bandeja de entrada (puede estar en spam).  Haz clic en el enlace del correo para restablecer tu contraseña.
        </div>
      )}

      {!sent && (
        <div className="flex justify-center">
          <form className="w-full max-w-[408px]">
            <div className="w-full">
              <div className="mb-2 font-medium lg:text-[20px] xs:text-[18px]">Ingrese su correo electrónico</div>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "* El correo no puede estar vacío",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "* Debe ser un correo válido"
                  }
                }}
                render={({ field }) => (
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    error={formErrors.email ? formErrors.email.message : ''}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="lg:w-full mt-12 xs:w-[200px] xs:mx-auto xs:mt-4">
              <Button
                disabled={loading}
                onClick={onSubmit}
                className="bg-[#AADBC1] text-white w-full mt-8 mb-4 h-12 font-semibold text-[24px] py-8">
                {!loading ? "Siguiente" : "Cargando..."}
              </Button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default PasswordRecoveryForm;
