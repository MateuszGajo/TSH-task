import agent from "app/api/agent";
import { CustomError } from "app/model/Error";
import { ProductParams, ProductResponse } from "app/model/Product";
import { convertToParams } from "feature/products/utils/Params";
import { makeAutoObservable, runInAction } from "mobx";

export default class ProductStore {
  constructor() {
    makeAutoObservable(this);
  }

  products: ProductResponse | null = null;
  isLoading = false;
  error: CustomError = {
    status: false,
    type: "",
    message: "",
  };

  loadProducts = async (params: ProductParams) => {
    this.error = {
      status: false,
      type: "",
      message: "",
    };

    const stringParams = convertToParams(params);

    this.isLoading = true;
    try {
      const resp = await agent.Product.list(stringParams);
      const { data } = resp;
      runInAction(() => {
        this.products = data;
        this.isLoading = false;
      });
    } catch (error) {
      this.isLoading = false;
      this.error = {
        status: true,
        type: "loading",
        message: "Product loading error",
      };
    }
  };
}
