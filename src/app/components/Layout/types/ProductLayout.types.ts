import React, { ReactNode } from "react";

export interface MainLayoutNavbarProps {
  onSearch: (value: string) => void;
  onActiveFilterChange: (value: boolean) => void;
  onPromoFilterChange: (value: boolean) => void;
}

export interface MainLayoutProps extends MainLayoutNavbarProps {
  children?: ReactNode | ReactNode[];
}
