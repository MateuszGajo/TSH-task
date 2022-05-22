import { ProductLayout } from "components/Layout";
import React from "react";
import { Link } from "react-router-dom";

import { AppRoute } from "routing/AppRoute.enum";

export const Products = () => {
  return (
    <ProductLayout
      onSearch={() => {}}
      onActiveFilterChange={() => {}}
      onPromoFilterChange={() => {}}
    >
      <h2>Products page</h2>
      <Link to={AppRoute.Login}> Login </Link>
    </ProductLayout>
  );
};
