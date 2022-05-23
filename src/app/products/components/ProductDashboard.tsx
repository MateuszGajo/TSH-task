import { ProductLayout } from "components/Layout";
import { Box, Container } from "@mui/material";
import { Product } from "../model";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";
import { useState } from "react";
import products from "../data/Products";

const ProductDashboard = () => {
  const [productModal, setProductModal] = useState<null | Product>(null);

  const openModal = (product: Product) => {
    setProductModal(product);
  };
  const closeModal = () => setProductModal(null);
  return (
    <>
      {productModal ? (
        <ProductModal product={productModal} closeModal={closeModal} />
      ) : null}
      <ProductLayout
        onSearch={() => {}}
        onActiveFilterChange={() => {}}
        onPromoFilterChange={() => {}}
      >
        <Box my={4}>
          <Container maxWidth="xl">
            <ProductList products={products} openModal={openModal} />
          </Container>
        </Box>
      </ProductLayout>
    </>
  );
};

export default ProductDashboard;
