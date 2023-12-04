import { cn } from "@nextui-org/react";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type typeButtonVariants =
  | "success"
  | "danger"
  | "default"
  | "primary"
  | "secondary";

type typeButtonProps = {
  variant?: typeButtonVariants;
  loading?: boolean;
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
    class: "bg-slate-800 dark:bg-neutral-600",
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
      disabled={props.loading}
      className={`px-3 py-2 rounded-md shadow-xl text-sm text-white ${cn(
        pickVariant(props.variant),
        props.loading && `disabled:opacity-75 cursor-wait`,
        props.className
      )}`}
    >
      {props.loading && (
        <AiOutlineLoading className="animate-spin inline-block mr-2" />
      )}
      {props.children}
    </button>
  );
}
