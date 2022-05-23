import { render } from "tests";
import ProductModal from "../components/ProductModal";
import products from "../data/Products";
import { fireEvent } from "@testing-library/react";

describe("Poduct modal", () => {
  test("Displays all information", () => {
    const product = products[0];
    const { getByText, getByAltText } = render(
      <ProductModal product={product} closeModal={() => {}} />
    );
    expect(getByText(product.name)).toBeInTheDocument();
    expect(getByText(product.description)).toBeInTheDocument();
    expect(getByAltText(product.name)).toBeInTheDocument();
  });

  test("Click on close icon should close modal", () => {
    const product = products[0];
    const closeModalMock = jest.fn();

    const { getByTestId } = render(
      <ProductModal product={product} closeModal={closeModalMock} />
    );
    fireEvent.click(getByTestId("modal__product"));
    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});
