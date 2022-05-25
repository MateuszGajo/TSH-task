import axios from "axios";
import { ProductResponse } from "app/model/product";

axios.defaults.baseURL = "https://join-tsh-api-staging.herokuapp.com/";

const requests = {
  get: <T>(url: string, body?: {}) => axios.get<T>(url, body),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body),
  delete: <T>(url: string) => axios.delete<T>(url),
};

const Product = {
  list: (params: URLSearchParams) =>
    requests.get<ProductResponse>("products", { params }),
};

export default { Product };
