import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductModalProps } from "../types/ProductModal.types";
import CloseIcon from "@mui/icons-material/Close";

const ProductModal = ({ product, closeModal }: ProductModalProps) => {
  const handleModalClose = () => {
    closeModal();
  };

  return (
    <Modal
      open={!!product}
      onClose={handleModalClose}
      sx={{
        "&": {
          background: "rgba(0,0,0,0.65)",
        },
      }}
    >
      <Box
        position="absolute"
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <IconButton
          sx={(theme) => ({
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: 2,
            color: theme.myColor.black.main,
          })}
          onClick={handleModalClose}
          data-testid="modal__product"
        >
          <CloseIcon sx={{ fontSize: "26px" }} />
        </IconButton>
        <Card
          sx={{
            maxWidth: 600,
            borderRadius: "8px",
            position: "relative",
            width: {
              xs: "90vw",
            },
          }}
          elevation={0}
        >
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.name}
          />
          <CardContent
            sx={{ height: "180px", display: "flex", flexDirection: "column" }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: 600,
                fontSize: "26px",
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
    </Modal>
  );
};

export default ProductModal;
