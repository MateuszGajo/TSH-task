import { ProductLayout } from "app/components/Layout";
import { Box, Container } from "@mui/material";
import { Product, ProductParams } from "app/model/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import products from "../data/Products";
import Pagination from "app/components/Pagination/Pagination";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { convertToObjectParams, convertToParams } from "../utils/Params";
import { useProductStore } from "app/providers/RootStoreProvider";
import { observer } from "mobx-react-lite";

const DEFAULT_ITEM_LIMIT = 8;

const ProductDashboard = () => {
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);

  const [filters, setFilters] = useState<ProductParams | null>(null);
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const { loadProducts, products } = useProductStore();

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setFilters({ ...filters, page });
    setPage(page);
  };

  const handleActiveFilterChange = (active: boolean) => {
    setFilters({ ...filters, active });
  };

  const handlePromoFilterChange = (promo: boolean) => {
    setFilters({ ...filters, promo });
  };

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  useEffect(() => {
    if (!filters) return;

    const stringParams = convertToParams({ ...filters });
    history.push("?" + stringParams.toString());

    loadProducts({ limit: DEFAULT_ITEM_LIMIT, ...filters });
  }, [filters]);

  useEffect(() => {
    const objectParams = convertToObjectParams(params);
    setFilters(objectParams);
  }, []);

  return (
    <ProductLayout
      onSearch={handleSearch}
      defaultSearchValue={params.get("search") || ""}
      onActiveFilterChange={handleActiveFilterChange}
      onPromoFilterChange={handlePromoFilterChange}
      defaultActiveValue={!!params.get("active")}
      defaultPromoValue={!!params.get("promo")}
    >
      <Box my={4}>
        <Container maxWidth="xl">
          <ProductList products={products?.items} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              hideNextButton={true}
              hidePrevButton={true}
              showFirstButton={true}
              showLastButton={true}
              count={products?.meta.totalPages || 0}
              page={page}
              siblingCount={1}
              boundaryCount={3}
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
    </ProductLayout>
  );
};

export default observer(ProductDashboard);
