import { cn } from "@nextui-org/react";
import React from "react";

export default function Card(
  props: React.HTMLAttributes<HTMLDivElement> & React.PropsWithChildren
) {
  return (
    <div
      className={`block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ${cn(
        props.className
      )}`}
    >
      {props.children}
    </div>
  );
}
