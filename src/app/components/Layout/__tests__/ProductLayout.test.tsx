import React from "react";
import { render } from "tests";
import { fireEvent } from "@testing-library/react";

import ProductLayout from "../components/ProductLayout";

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
});
