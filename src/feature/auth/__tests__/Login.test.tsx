import { act, render, fireEvent } from "tests";
import Login from "../components/Login";
import * as stores from "app/providers/RootStoreProvider";

describe("Login", () => {
  test("Displays all information", () => {
    const { getByText, getByLabelText } = render(<Login />);

    expect(getByText(/login/i)).toBeInTheDocument();
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByText(/log in/i)).toBeInTheDocument();
  });

  test("Enter empty data into input field should result with fields' error and disabled button", async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(<Login />);
    const usernameInput = getByPlaceholderText(/enter username/i);
    const passwordInput = getByPlaceholderText(/enter password/i);
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "1" } });
      fireEvent.change(usernameInput, { target: { value: "" } });

      fireEvent.change(passwordInput, { target: { value: "1" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
    });

    expect(getAllByText("This field is required")).toHaveLength(2);
    expect(getByText(/log in/i)).toHaveAttribute("disabled");
  });

  test("invalid one field, expect that field to have error state", async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(<Login />);
    const usernameInput = getByPlaceholderText(/enter username/i);
    const passwordInput = getByPlaceholderText(/enter password/i);
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "1" } });
      fireEvent.change(usernameInput, { target: { value: "" } });
    });

    expect(getAllByText("This field is required")).toHaveLength(1);
    expect(getByText(/log in/i)).toHaveAttribute("disabled");
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "1" } });
    });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "1" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
    });
    expect(getAllByText("This field is required")).toHaveLength(1);
    expect(getByText(/log in/i)).toHaveAttribute("disabled");
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "1" } });
    });
  });

  test("Valid form, shouldn't be an error or disabled button", async () => {
    const { getByText, queryAllByText, getByPlaceholderText } = render(
      <Login />
    );
    const usernameInput = getByPlaceholderText(/enter username/i);
    const passwordInput = getByPlaceholderText(/enter password/i);
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "1" } });
      fireEvent.change(passwordInput, { target: { value: "1" } });
    });
    expect(getByText(/log in/i)).not.toHaveAttribute("disabled");
    expect(queryAllByText("This field is required")).toHaveLength(0);
  });

  test("Store should be fire with creds", async () => {
    const authStore = {
      login: jest.fn(),
      user: null,
      error: {
        status: false,
        type: "",
        message: "",
      },
      isUserLoading: false,
      getUser: jest.fn(),
      logout: jest.fn(),
    };
    jest
      .spyOn(stores, "useAuthenticationStore")
      .mockImplementation(() => authStore);

    const { getByText, getByPlaceholderText } = render(<Login />);

    const creds = {
      username: "user12345",
      password: "securePassword1234",
    };

    const usernameInput = getByPlaceholderText(/enter username/i);
    const passwordInput = getByPlaceholderText(/enter password/i);

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: creds.username } });
      fireEvent.change(passwordInput, { target: { value: creds.password } });
    });
    await act(async () => {
      fireEvent.click(getByText(/log in/i));
    });

    expect(authStore.login).toHaveBeenCalledTimes(1);
    expect(authStore.login).toHaveBeenCalledWith(creds);
  });
});
