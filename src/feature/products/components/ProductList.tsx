import { Box, Grid } from "@mui/material";
import Pagination from "app/components/Pagination/Pagination";
import React, { useState } from "react";
import { ProductListProps } from "../types/ProductList.types";
import ProductListItem from "./ProductListItem";
import CircularProgress from "@mui/material/CircularProgress";

const EmptyList = () => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "200px",
      }}
    ></Box>
  );
};

const LoadingWrapper = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <CircularProgress
          sx={(theme) => ({
            color: theme.palette.primary.main,
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
          })}
        />
      ) : (
        <Box sx={{ filter: isLoading ? "blur(4px)" : undefined }}>
          {children}
        </Box>
      )}
    </>
  );
};

const ProductsList = ({ products }: ProductListProps) => {
  // const isLoading = true;
  if (!products) return <div></div>;
  return (
    <Box sx={{ position: "relative" }}>
      <LoadingWrapper isLoading={false}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
              <Box display="flex" justifyContent="center">
                <ProductListItem product={product} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </LoadingWrapper>
    </Box>
  );
};

export default ProductsList;
