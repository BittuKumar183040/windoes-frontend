import React, { useMemo, useState } from "react";
import { FileManagerContext } from "./FileManagerContextState";
import type { Node } from "./types/node";

export const FileManagerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [location, setLocation] = useState<Node[] | null>(null);

  const value = useMemo(
    () => ({
      location,
      setLocation,
    }),
    [location]
  );

  return (
    <FileManagerContext.Provider value={value}>
      {children}
    </FileManagerContext.Provider>
  );
};
