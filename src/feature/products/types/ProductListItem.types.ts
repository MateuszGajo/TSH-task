import { Product } from "app/model/product";
export interface ProductListItemProps {
  product: Product;
  openModal: (product: Product) => void;
}