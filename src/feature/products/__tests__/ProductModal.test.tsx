import { render } from "tests";
import ProductModal from "../components/ProductModal";
import products from "../data/Products";
import { fireEvent } from "@testing-library/react";

describe("Poduct modal", () => {
  test("Displays all information", () => {
    const product = products[0];
    const { getByText, getByAltText } = render(
      <ProductModal product={product} />
    );
    expect(getByText(product.name)).toBeInTheDocument();
    expect(getByText(product.description)).toBeInTheDocument();
    expect(getByAltText(product.name)).toBeInTheDocument();
  });
});
