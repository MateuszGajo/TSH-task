import { Product } from "app/model/product";
export interface ProductListProps {
  products: Product[];
  openModal: (product: Product) => void;
}
