"use client";

import React, { forwardRef, useState } from "react";
import { Input as NextInput, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/constants";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  suffix?: React.ReactNode;
  error?: any;
  password?: boolean;
  quantity?: boolean; // Nueva propiedad para controlar la funcionalidad de cantidad
  className?: string; // Añadido para aceptar className
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  suffix,
  error,
  name,
  placeholder,
  type = "text",
  value = "",
  onChange,
  password = false,
  quantity = false, // Default a false
  className = "", // Default a una cadena vacía
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [quantityValue, setQuantityValue] = useState(1); // Estado para el valor de cantidad

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleIncrement = () => {
    setQuantityValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantityValue(prev => (prev > 1 ? prev - 1 : 1)); // Asegura que el valor no baje de 1
  };

  return (
    <React.Fragment>
      <NextInput
        ref={ref}
        name={name}
        type={password ? (showPassword ? "text" : "password") : type}
        value={quantity ? quantityValue.toString() : typeof value === 'string' ? value : ''}
        onChange={quantity ? undefined : onChange} // Evita el manejo de cambio si es un campo de cantidad
        isInvalid={!!error}
        placeholder={placeholder}
        startContent={
          quantity ? (
            <div className="flex items-center">
              <Button
                disableRipple={true}
                isIconOnly={true}
                onClick={handleDecrement}
                className="p-0 text-gray-600 bg-[transparent]"
              >
                <FontAwesomeIcon icon={faMinus} className="text-[20px]" />
              </Button>
            </div>
          ) : suffix ? (
            suffix
          ) : undefined
        }
        endContent={
          password ? (
            <div
              className="cursor-pointer bg-[transparent] text-gray-900 text-[20px] p-2 w-[40px] relative"
              onClick={toggleShowPassword}
            >
              {showPassword ?
                <Icon icon="icon-eye" className="text-[20px]" />
                :
                <Icon icon="icon-eyeoff" className="text-[20px]" />}
            </div>
          ) : quantity ? (
            <div className="flex items-center">
              <Button
                disableRipple={true}
                isIconOnly={true}
                onClick={handleIncrement}
                className="p-0 text-gray-600 bg-[transparent]"
              >
                <FontAwesomeIcon icon={faPlus} className="text-[20px]" />
              </Button>
            </div>
          ) : undefined
        }
        fullWidth={false}
        classNames={{
          input: [
            "bg-white",
            "placeholder:text-[#7D7D7D]",
            "!hover:bg-white",
            "text-center",
            quantity ? "text-[20px]" : "",
            className
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "h-[60px]",
            "rounded-[8px]",
            "border 2px border-[#0A1D35]",
            "shadow-sm",
            "bg-white",
            "dark:bg-white",
            "group-data-[focus=true]:bg-white",
            "!cursor-text",
            className
          ]
        }}
        style={{ backgroundColor: '#fff !important' }}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </React.Fragment>
  );
});

Input.displayName = 'Input';

export default Input;
