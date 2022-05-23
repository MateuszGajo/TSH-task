import { Box, Grid } from "@mui/material";
import React from "react";
import { ProductListProps } from "../types/ProductList.types";
import ProductListItem from "./ProductListItem";

const ProductsList = ({ products, openModal }: ProductListProps) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
          <Box display="flex" justifyContent="center">
            <ProductListItem product={product} openModal={openModal} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
