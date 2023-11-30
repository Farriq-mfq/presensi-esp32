import React from "react";
import { Link, To } from "react-router-dom";
import cn from "../../../utils/cn";
type BaseLinkProps = {
  to: To;
  active?: boolean;
};
export default function BaseLink(
  props: BaseLinkProps & React.PropsWithChildren
) {
  return (
    <Link
      className={`flex items-center gap-1.5 text-sm text-slate-300 px-3 py-1.5  mb-1 xp rounded-full ${cn(
        props.active && "bg-slate-800/90 dark:bg-indigo-800/90"
      )}`}
      to={props.to}
    >
      {props.children}
    </Link>
  );
}
