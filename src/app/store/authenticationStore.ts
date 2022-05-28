import agent from "app/api/agent";
import { Creds } from "app/model/Auth";
import { CustomError } from "app/model/Error";
import { User } from "app/model/User";
import axios from "axios";
import { getToken, removeToken, saveToken } from "feature/auth/utils/token";
import { makeAutoObservable, runInAction } from "mobx";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);

    this.getUser();
  }

  error: CustomError = {
    status: false,
    type: "",
    message: "",
  };
  user: User | null = null;
  isUserLoading = true;

  getUser = async () => {
    const token = getToken();
    if (!token) {
      this.isUserLoading = false;
      return;
    }

    try {
      const { data } = await agent.User.me();
      this.user = data;
    } catch (err) {
      removeToken();
    } finally {
      this.isUserLoading = false;
    }
  };

  login = async (creds: Creds) => {
    this.error = {
      status: false,
      type: "",
      message: "",
    };
    try {
      const { data } = await agent.Authentication.login(creds);
      runInAction(() => {
        this.user = data.user;
        saveToken(data.access_token);
      });
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        this.error = {
          status: true,
          type: "login",
          message: "There was a problem connecting to server",
        };
        return;
      }

      const status = err.response?.status;
      const data = err.response?.data as any;
      const message = data.message || "";

      if (status === 401 && message === "Invalid user or password")
        this.error = { status: true, type: "login", message };
      else if (status === 404 && message === "No user found")
        this.error = { status: true, type: "username", message };
      else
        this.error = {
          status: true,
          type: "login",
          message: "There was a problem connecting to server",
        };
    }
  };

  logout = () => {
    removeToken();
    this.user = null;
  };
}
