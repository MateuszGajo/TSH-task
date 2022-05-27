import { CustomError } from "app/model/error";
import { Product } from "app/model/product";
export interface ProductListProps {
  products: Product[] | undefined;
  isLoading: boolean;
  error: CustomError;
}
