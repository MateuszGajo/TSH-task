import { Product } from "../model";
export interface ProductListProps {
  products: Product[];
  openModal: (product: Product) => void;
}
