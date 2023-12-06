import React, { useState } from "react";

export interface UiValueContextType {
  sidebar: React.MutableRefObject<any>;
  handleSidebar: (ref: React.MutableRefObject<any>) => void;
}

export const UiContext = React.createContext<UiValueContextType>({
  sidebar: { current: null },
  handleSidebar: () => {},
});
export function UiContextProvider(props: React.PropsWithChildren) {
  const [sidebar, setSidebar] = useState<React.MutableRefObject<any>>({
    current: null,
  });

  const handleSidebar = (ref: React.MutableRefObject<any>) => {
    setSidebar(ref);
  };

  return (
    <UiContext.Provider value={{ sidebar, handleSidebar }}>
      {props.children}
    </UiContext.Provider>
  );
}
