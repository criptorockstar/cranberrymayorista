import React, { forwardRef } from "react";
import { Input as NextInput, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/constants"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  suffix?: React.ReactNode;
  error?: any;
  password?: boolean;
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
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <React.Fragment>
      <NextInput
        ref={ref}
        name={name}
        type={password ? (showPassword ? "text" : "password") : type}
        value={typeof value === 'string' ? value : ''}
        onChange={onChange}
        isInvalid={!!error}
        placeholder={placeholder}
        startContent={suffix ? suffix : undefined}
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
          ) : undefined
        }
        fullWidth={true}
        classNames={{
          input: [
            "bg-white",
            "placeholder:text-[#7D7D7D]",
            "!hover:bg-white",
            "w-full",
          ],
          innerWrapper: "bg-transparent w-full",
          inputWrapper: [
            "h-[60px]",
            "rounded-[8px]",
            "border 2px border-[#0A1D35]",
            "shadow-sm",
            "bg-white",
            "dark:bg-white",
            "group-data-[focus=true]:bg-white",
            "!cursor-text",
            "w-full",
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
