import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProductListItemProps } from "../types/ProductListItem.types";
import { Box, Rating } from "@mui/material";

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Card
      sx={{ maxWidth: 288, borderRadius: "8px", position: "relative" }}
      elevation={0}
    >
      {product.promo ? (
        <Box
          sx={(theme) => ({
            bgcolor: theme.myColor.orange.main,
            top: "15px",
            left: 0,
            position: "absolute",
            width: "75px",
            height: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Typography component="p" color="white" fontSize="14px">
            Promo
          </Typography>
        </Box>
      ) : null}

      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
      />
      <CardContent
        sx={{ height: "160px", display: "flex", flexDirection: "column" }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={(theme) => ({
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: theme.myColor.grey.dark,
            fontWeight: 600,
          })}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "baseline",
          padding: "16px",
        }}
      >
        <Box>
          <Rating
            value={2}
            size="small"
            sx={(theme) => ({
              "& .MuiRating-iconFilled": {
                color: theme.myColor.orange.main,
              },
              "& .MuiRating-iconEmpty": {
                color: theme.myColor.grey.main,
              },
              "& .MuiRating-icon": {
                pr: 0.8,
              },
            })}
            readOnly
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          disabled={!product.active}
          sx={(theme) => ({
            textTransform: "none",
            "&.Mui-disabled": {
              bgcolor: theme.myColor.grey.dark,
              color: "White",
            },
          })}
        >
          {product.active ? "Show details" : "Unavailable"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductListItem;
