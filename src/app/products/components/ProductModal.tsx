import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductModalProps } from "../types/ProductModal.types";
import CloseIcon from "@mui/icons-material/Close";

const ProductModal = ({ product }: ProductModalProps) => {
  return (
    <Modal open={true} onClose={() => {}}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box position="relative">
          <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Card
            sx={{ maxWidth: 600, borderRadius: "8px", position: "relative" }}
            elevation={0}
          >
            <CardMedia
              component="img"
              height="400"
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
          </Card>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
