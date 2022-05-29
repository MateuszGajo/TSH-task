import { render } from "tests";
import { fireEvent } from "@testing-library/react";
import * as stores from "app/providers/RootStoreProvider";
import ProductLayout from "../components/ProductLayout";

const AUTH_STORE = {
  login: jest.fn(),
  user: {
    id: 1,
    username: "test123",
    avatar:
      "https://cdn.pixabay.com/photo/2020/05/09/13/29/photographer-5149664_640.jpg",
  },
  error: {
    status: false,
    type: "",
    message: "",
  },
  isUserLoading: false,
  getUser: jest.fn(),
  logout: jest.fn(),
};

describe("Navbar", () => {
  test("Displays all information", async () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <ProductLayout
        onSearch={() => {}}
        onActiveFilterChange={() => {}}
        onPromoFilterChange={() => {}}
      />
    );

    expect(getByText("join.tsh.io")).toBeInTheDocument();
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
    expect(getByLabelText("Active")).toBeInTheDocument();
    expect(getByLabelText("Promo")).toBeInTheDocument();
    expect(getByText("Log in")).toBeInTheDocument();
  });
  test("Item search", async () => {
    const sortMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <ProductLayout
        onSearch={sortMock}
        onActiveFilterChange={() => {}}
        onPromoFilterChange={() => {}}
      />
    );
    const productName = "abc";
    const searchInput = getByPlaceholderText("Search");
    const searchButton = getByTestId("navbar__product__search-button");
    fireEvent.change(searchInput, { target: { value: productName } });
    fireEvent.click(searchButton);

    expect(sortMock).toHaveBeenCalledTimes(1);
    expect(sortMock).toHaveBeenCalledWith(productName);
  });

  test("Items filtering", async () => {
    const activteFilterMock = jest.fn();
    const promoFilterMock = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <ProductLayout
        onSearch={() => {}}
        onActiveFilterChange={activteFilterMock}
        onPromoFilterChange={promoFilterMock}
      />
    );

    const filterActiveCheckbox = getByLabelText("Active");
    const filterPromoCheckbox = getByLabelText("Promo");
    fireEvent.click(filterActiveCheckbox);
    fireEvent.click(filterPromoCheckbox);

    expect(activteFilterMock).toHaveBeenCalledTimes(1);
    expect(activteFilterMock).toHaveBeenCalledWith(true);
    expect(promoFilterMock).toHaveBeenCalledTimes(1);
    expect(promoFilterMock).toHaveBeenCalledWith(true);

    fireEvent.click(filterActiveCheckbox);
    fireEvent.click(filterPromoCheckbox);

    expect(activteFilterMock).toHaveBeenCalledTimes(2);
    expect(activteFilterMock).toHaveBeenCalledWith(false);
    expect(promoFilterMock).toHaveBeenCalledTimes(2);
    expect(promoFilterMock).toHaveBeenCalledWith(false);
  });
  test("user logged in, there should be user avtar", () => {
    const authStore = {
      ...AUTH_STORE,
    };
    jest
      .spyOn(stores, "useAuthenticationStore")
      .mockImplementation(() => authStore);
    const { getByAltText } = render(
      <ProductLayout
        onSearch={() => {}}
        onActiveFilterChange={() => {}}
        onPromoFilterChange={() => {}}
      />
    );
    expect(getByAltText("user's avatar")).toBeInTheDocument();
  });
  test("Logout should fire store function", () => {
    const authStore = {
      ...AUTH_STORE,
    };
    jest
      .spyOn(stores, "useAuthenticationStore")
      .mockImplementation(() => authStore);
    const { getByAltText, getByText } = render(
      <ProductLayout
        onSearch={() => {}}
        onActiveFilterChange={() => {}}
        onPromoFilterChange={() => {}}
      />
    );
    fireEvent.click(getByAltText("user's avatar"));
    fireEvent.click(getByText(/logout/i));
    expect(authStore.logout).toHaveBeenCalledTimes(1);
  });
});
