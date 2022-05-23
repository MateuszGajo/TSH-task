import { Product } from "app/model/product";
export interface ProductModalProps {
  product: Product;
  closeModal: () => void;
}
