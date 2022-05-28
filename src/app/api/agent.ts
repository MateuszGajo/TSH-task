import axios from "axios";
import { ProductResponse } from "app/model/Product";
import { Creds, LoginResponse } from "app/model/Auth";
import { User as IUser } from "app/model/User";
import { getToken } from "feature/auth/utils/token";

axios.defaults.baseURL = "https://join-tsh-api-staging.herokuapp.com/";

axios.interceptors.request.use((config) => {
  const token = getToken();
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});

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

const Authentication = {
  login: (creds: Creds) => requests.post<LoginResponse>("users/login", creds),
};

const User = {
  me: () => requests.get<IUser>("users/me"),
};

export default { Product, Authentication, User };
