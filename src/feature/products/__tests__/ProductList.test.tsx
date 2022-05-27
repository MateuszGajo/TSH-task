import { render } from "tests";
import ProductList from "../components/ProductList";
import products from "../data/Products";

describe("Product list", () => {
  test("Component should render list", () => {
    const { getByText, getByAltText } = render(
      <ProductList
        products={products}
        isLoading={false}
        error={{
          status: false,
          message: "",
          type: "",
        }}
      />
    );

    expect(getByText(products[0].name)).toBeInTheDocument();
    expect(getByText(products[1].description)).toBeInTheDocument();
    expect(getByAltText(products[2].name)).toBeInTheDocument();
  });
  test("Empty list", () => {
    const { getByText } = render(
      <ProductList
        products={[]}
        isLoading={false}
        error={{
          status: false,
          message: "",
          type: "",
        }}
      />
    );

    expect(getByText("There are no products on the list")).toBeInTheDocument();
  });

  test("Initial load, list's fetching", () => {
    const { getByTestId } = render(
      <ProductList
        products={undefined}
        isLoading={true}
        error={{
          status: false,
          message: "",
          type: "",
        }}
      />
    );

    expect(getByTestId("product__loading")).toBeInTheDocument();
  });

  test("products were loaded, load new data, indicator should shows in front of old items", () => {
    const { getByTestId, getByText, getByAltText } = render(
      <ProductList
        products={products}
        isLoading={true}
        error={{
          status: false,
          message: "",
          type: "",
        }}
      />
    );

    expect(getByTestId("product__loading")).toBeInTheDocument();
    expect(getByText(products[0].name)).toBeInTheDocument();
    expect(getByText(products[1].description)).toBeInTheDocument();
    expect(getByAltText(products[2].name)).toBeInTheDocument();
  });
});
