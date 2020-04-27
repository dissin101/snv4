import React from "react";
import { IsAuthRoutes, NoAuthRoutes } from "./components";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return <IsAuthRoutes />;
  }

  return <NoAuthRoutes />;
};
