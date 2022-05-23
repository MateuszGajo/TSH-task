import { Product } from "../model";
export interface ProductListItemProps {
  product: Product;
  openModal: (product: Product) => void;
}
