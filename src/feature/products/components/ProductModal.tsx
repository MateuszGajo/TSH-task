import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductModalProps } from "../types/ProductModal.types";

const ProductModal = ({ product }: ProductModalProps) => {
  return (
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
  );
};

export default ProductModal;
