export interface ProductPaginationProps {
  count: number | undefined;
  page: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
}
