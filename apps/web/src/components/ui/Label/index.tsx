import React from "react";

export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement> & React.PropsWithChildren
) {
  return (
    <label {...props} className="text-sm inline-block pl-1 mb-2">
      {props.children}
    </label>
  );
}
