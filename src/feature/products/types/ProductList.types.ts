import { CustomError } from "app/model/Error";
import { Product } from "app/model/Product";
export interface ProductListProps {
  products: Product[] | undefined;
  isLoading: boolean;
  error: CustomError;
}

export interface ProductListErrorProps {
  message: string;
}

export interface ProductLoadingWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
}
