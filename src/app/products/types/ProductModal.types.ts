import { Product } from "../model";
export interface ProductModalProps {
  product: Product;
  closeModal: () => void;
}
