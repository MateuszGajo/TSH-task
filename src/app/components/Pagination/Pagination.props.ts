export interface PaginationProps {
  count: number;
  page: number;
  boundaryCount?: number;
  siblingCount?: number;
  onChange: (ev: React.ChangeEvent<unknown>, page: number) => void;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
}
