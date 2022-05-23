import { createContext, useContext } from "react";
import ProductStore from "app/store/ProductStore";
import AuthenticationStore from "app/store/AuthenticationStore";

interface Store {
  productStore: ProductStore;
  authenticationStore: AuthenticationStore;
}

export const store: Store = {
  productStore: new ProductStore(),
  authenticationStore: new AuthenticationStore(),
};

export const StoreContext = createContext<Store>(store);

const useStore = () => {
  return useContext(StoreContext);
};

export const useProductStore = () => {
  const { productStore } = useStore();
  return productStore;
};

export const useAuthenticationStore = () => {
  const { authenticationStore } = useStore();
  return authenticationStore;
};
