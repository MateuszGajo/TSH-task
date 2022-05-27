import { ProductParams } from "app/model/product";

export const convertToParams = (params: ProductParams) => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      urlSearchParams.append(key, String(value));
    }
  }
  return urlSearchParams;
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
  return productParams;
};
