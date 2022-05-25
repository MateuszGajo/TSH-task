import { ProductParams } from "app/model/product";

export const convertToParams = (filters: ProductParams) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    console.log(key);
    console.log(value);
    if (value) {
      params.append(key, String(value));
    }
  }
  return params;
};

export const convertToObjectParams = (params: URLSearchParams) => {
  const productParams: ProductParams = Object.assign(
    {},
    !!params.get("promo") ? { promo: Boolean(params.get("promo")) } : null,
    !!params.get("active") ? { active: Boolean(params.get("active")) } : null,
    !!params.get("limit") ? { limit: Number(params.get("limit")) } : null,
    !!params.get("page") ? { page: Number(params.get("page")) } : null,
    !!params.get("search") ? { search: params.get("search") } : null
  );
  console.log("intial");
  console.log(productParams);
  return productParams;
};
