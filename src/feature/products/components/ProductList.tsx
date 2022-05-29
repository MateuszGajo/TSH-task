import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import {
  ProductListErrorProps,
  ProductListProps,
  ProductLoadingWrapperProps,
} from "../types/ProductList.types";
import ProductListItem from "./ProductListItem";
import CircularProgress from "@mui/material/CircularProgress";
import clipboard from "assets/images/clipboard.png";
import ErrorIcon from "@mui/icons-material/Error";

const EmptyList = () => {
  return (
    <Box
      sx={{
        width: "600px",
        height: "345px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        mx: "auto",
      }}
    >
      <Box component="img" src={clipboard} />
      <Typography
        component="p"
        sx={{
          fontSize: "18px",
          mt: 2,
        }}
      >
        Oops... It's empty here
      </Typography>
      <Typography
        component="p"
        sx={(theme) => ({
          fontSize: "14px",
          color: theme.myColor.grey.dark,
        })}
      >
        There are no products on the list
      </Typography>
    </Box>
  );
};

const ErrorList = ({ message }: ProductListErrorProps) => {
  return (
    <Box
      sx={{
        width: "600px",
        height: "345px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        mx: "auto",
      }}
    >
      <Box>
        <ErrorIcon
          sx={(theme) => ({
            fontSize: "40px",
            color: theme.palette.error.main,
          })}
        />
      </Box>
      <Typography
        component="p"
        sx={(theme) => ({
          fontSize: "18px",
          mt: 2,
          color: theme.palette.error.main,
        })}
      >
        {message}
      </Typography>
    </Box>
  );
};

const LoadingWrapper = ({
  children,
  isLoading,
}: ProductLoadingWrapperProps) => {
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
          data-testid="product__loading"
        />
      ) : null}
      <Box sx={{ filter: isLoading ? "blur(4px)" : undefined }}>{children}</Box>
    </>
  );
};

const ProductsList = ({ products, error, isLoading }: ProductListProps) => {
  if (!products && isLoading)
    return (
      <CircularProgress
        sx={(theme) => ({
          color: theme.palette.primary.main,
          display: "flex",
          mx: "auto",
          mt: 2,
        })}
        data-testid="product__loading"
      />
    );
  if (error.status) return <ErrorList message={error.message} />;
  if (!products) return null;
  if (products.length === 0) return <EmptyList />;
  return (
    <Box sx={{ position: "relative" }}>
      <LoadingWrapper isLoading={isLoading}>
        <Grid container spacing={4} data-testid="product__list">
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
