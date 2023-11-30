import { cn } from "@nextui-org/react";
import React from "react";

type typeButtonVariants =
  | "success"
  | "danger"
  | "default"
  | "primary"
  | "secondary";

type typeButtonProps = {
  variant?: typeButtonVariants;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type typeButtonColors = Array<{ type: typeButtonVariants; class: string }>;

export const buttonColors: typeButtonColors = [
  {
    type: "success",
    class: "bg-green-400",
  },
  {
    type: "danger",
    class: "bg-red-400",
  },
  {
    type: "default",
    class: "bg-slate-800",
  },
  {
    type: "primary",
    class: "bg-indigo-500",
  },
  {
    type: "secondary",
    class: "bg-blue-500",
  },
];

export default function Button(
  props: typeButtonProps & React.PropsWithChildren
) {
  const pickVariant = (variant?: typeButtonVariants) => {
    return buttonColors.find((btnColor) =>
      variant ? btnColor.type === variant : btnColor.type === "default"
    )?.class;
  };
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-md shadow-xl text-sm ${cn(
        pickVariant(props.variant)
      )}`}
    >
      {props.children}
    </button>
  );
}
