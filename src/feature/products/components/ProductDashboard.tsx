import { ProductLayout } from "app/layout";
import { Box, Container } from "@mui/material";
import { ProductParams } from "app/model/Product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { convertToObjectParams, convertToParams } from "../utils/Params";
import { useProductStore } from "app/providers/RootStoreProvider";
import { observer } from "mobx-react-lite";
import ProductPagination from "./ProductPagination";

const DEFAULT_ITEM_LIMIT = 8;

const ProductDashboard = () => {
  const location = useLocation();
  const history = useHistory();

  const initialParams = new URLSearchParams(location.search);

  const [params, setParams] = useState<ProductParams | null>(null);
  const [page, setPage] = useState(Number(initialParams.get("page")) || 1);

  const { loadProducts, products, isLoading, error } = useProductStore();

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setParams({ ...params, page });
    setPage(page);
  };

  const handleActiveFilterChange = (active: boolean) => {
    setParams({ ...params, active });
  };

  const handlePromoFilterChange = (promo: boolean) => {
    setParams({ ...params, promo });
  };

  const handleSearch = (value: string) => {
    setParams({ ...params, search: value });
  };

  useEffect(() => {
    if (!params) return;

    const stringParams = convertToParams({
      ...params,
      page: page > 1 ? page : undefined,
    });
    history.push("?" + stringParams.toString());
    loadProducts({ limit: DEFAULT_ITEM_LIMIT, ...params });
  }, [params]);

  useEffect(() => {
    const objectParams = convertToObjectParams(initialParams);
    setParams(objectParams);
  }, []);

  return (
    <ProductLayout
      onSearch={handleSearch}
      defaultSearchValue={initialParams.get("search") || ""}
      onActiveFilterChange={handleActiveFilterChange}
      onPromoFilterChange={handlePromoFilterChange}
      defaultActiveValue={!!initialParams.get("active")}
      defaultPromoValue={!!initialParams.get("promo")}
    >
      <Box my={4}>
        <Container maxWidth="xl">
          <ProductList
            products={products?.items}
            isLoading={isLoading}
            error={error}
          />
          <ProductPagination
            count={products?.meta.itemCount}
            handlePageChange={handlePageChange}
            page={page}
          />
        </Container>
      </Box>
    </ProductLayout>
  );
};

export default observer(ProductDashboard);
