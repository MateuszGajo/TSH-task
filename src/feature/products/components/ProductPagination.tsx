import { Box } from "@material-ui/core";
import Pagination from "app/components/Pagination/Pagination";
import React from "react";
import { ProductPaginationProps } from "../types/ProductPagination.types";

const ProductPagination = ({
  count,
  page,
  handlePageChange,
}: ProductPaginationProps) => {
  if (!count) return null;
  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={2}
      data-testid="product__pagination"
    >
      <Pagination
        hideNextButton={true}
        hidePrevButton={true}
        showFirstButton={true}
        showLastButton={true}
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={3}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductPagination;

