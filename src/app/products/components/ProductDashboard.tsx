import { ProductLayout } from "components/Layout";
import { Box, Container } from "@mui/material";
import { Product } from "../model";
import ProductList from "./ProductList";

const ProductDashboard = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Keyboard",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod laboriosam labore deserunt voluptatum velit? Ipsam hic totam enim laudantium! Debitis neque eius dolores porro ut temporibus necessitatibus deleniti soluta eum?m",
      rating: 2,
      image:
        "https://cdn.pixabay.com/photo/2018/04/25/18/24/no-one-3350206_640.jpg",
      promo: false,
      active: false,
    },
    {
      id: 2,
      name: "Gaming mouse",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod laboriosam labore deserunt voluptatum velit? Ipsam hic totam enim laudantium! Debitis neque eius dolores porro ut temporibus necessitatibus deleniti soluta eum?m",
      rating: 1,
      image:
        "https://cdn.pixabay.com/photo/2017/05/24/21/33/workplace-2341642_640.jpg",
      promo: true,
      active: false,
    },
    {
      id: 3,
      name: "phone",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod laboriosam labore deserunt voluptatum velit? Ipsam hic totam enim laudantium! Debitis neque eius dolores porro ut temporibus necessitatibus deleniti soluta eum?m",
      rating: 4,
      image:
        "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_640.jpg",
      promo: false,
      active: false,
    },
    {
      id: 4,
      name: "micrphone",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod laboriosam labore deserunt voluptatum velit? Ipsam hic totam enim laudantium! Debitis neque eius dolores porro ut temporibus necessitatibus deleniti soluta eum?m",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2020/06/25/17/57/microphone-5340340_640.jpg",
      promo: false,
      active: true,
    },
    {
      id: 5,
      name: "cup",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod laboriosam labore deserunt voluptatum velit? Ipsam hic totam enim laudantium! Debitis neque eius dolores porro ut temporibus necessitatibus deleniti soluta eum?m",
      rating: 2,
      image:
        "https://cdn.pixabay.com/photo/2017/07/06/15/23/sky-2478361_640.jpg",
      promo: true,
      active: false,
    },
  ];
  return (
    <ProductLayout
      onSearch={() => {}}
      onActiveFilterChange={() => {}}
      onPromoFilterChange={() => {}}
    >
      <Box my={4}>
        <Container maxWidth="xl">
          <ProductList products={products} />
        </Container>
      </Box>
    </ProductLayout>
  );
};

export default ProductDashboard;
