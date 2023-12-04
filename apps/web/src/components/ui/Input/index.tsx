import React, { forwardRef } from "react";
import cn from "../../../utils/cn";

const Input = forwardRef<
  any,
  React.InputHTMLAttributes<HTMLInputElement> & {
    errors?: string;
  }
>((props, ref) => {
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={`p-2 border mb-2 outline-none rounded-lg w-full placeholder:text-sm ${cn(
          props.className
        )}`}
      />
      {props.errors && <p className="text-red-500 text-sm">{props.errors}</p>}
    </>
  );
});
export default Input;
