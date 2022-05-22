import { render } from "tests";
import ProductList from "../components/ProductList";
import products from "../data/Products";

describe("Product list", () => {
  test("Component should render list", () => {
    const { getByText, getByAltText } = render(
      <ProductList products={products} />
    );

    expect(getByText(products[0].name)).toBeInTheDocument();
    expect(getByText(products[1].description)).toBeInTheDocument();
    expect(getByAltText(products[2].name)).toBeInTheDocument();
  });
});
