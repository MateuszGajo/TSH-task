import agent from "app/Api/agent";
import { ProductParams, ProductResponse } from "app/model/product";
import { convertToParams } from "feature/products/utils/Params";
import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    makeAutoObservable(this);
  }

  products: ProductResponse | null = null;

  loadProducts = async (params: ProductParams) => {
    const stringParams = convertToParams(params);
    console.log(stringParams.toString());
    try {
      const resp = await agent.Product.list(stringParams);
      const { data } = resp;
      this.products = data;
    } catch (error) {}
  };
}
