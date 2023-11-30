import React from "react";
import { NavLink, To } from "react-router-dom";
import cn from "../../../utils/cn";
type BaseLinkProps = {
  to: To;
};
export default function BaseLink(
  props: BaseLinkProps & React.PropsWithChildren
) {
  return (
    <NavLink
      className={({ isActive }) => {
        return `flex items-center gap-1.5 text-sm text-slate-300 px-3 py-1.5  mb-1 rounded-full ${
          isActive ? cn("bg-slate-800/90 dark:bg-indigo-900/90") : ``
        }`;
      }}
      to={props.to}
    >
      {props.children}
    </NavLink>
  );
}
