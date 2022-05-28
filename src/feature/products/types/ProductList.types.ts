import { CustomError } from "app/model/Error";
import { Product } from "app/model/Product";
export interface ProductListProps {
  products: Product[] | undefined;
  isLoading: boolean;
  error: CustomError;
}
