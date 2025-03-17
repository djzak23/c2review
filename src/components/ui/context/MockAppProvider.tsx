import React, { ReactNode } from "react";
import { AppProvider } from "./AppContext";

/**
 * A wrapper component that provides the AppProvider context for storyboards and testing
 */
export const MockAppProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <AppProvider>{children}</AppProvider>;
};

export default MockAppProviderWrapper;
