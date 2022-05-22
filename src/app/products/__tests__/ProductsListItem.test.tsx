import { render } from "tests";
import ProductListItem from "../components/ProductListItem";
import products from "../data/Products";

describe("Product item", () => {
  test("Displays all information", async () => {
    const product = { ...products[0], active: true };
    const { container, getByText, getByAltText, getByLabelText, getByRole } =
      render(<ProductListItem product={product} />);

    expect(getByText(product.name)).toBeInTheDocument();
    expect(getByText(product.description)).toBeInTheDocument();
    expect(getByAltText(product.name)).toBeInTheDocument();
    expect(getByText("Show details")).toBeInTheDocument();
    expect(getByLabelText("2 Stars")).toBeInTheDocument();
  });

  test("Product unavailable button should be disabled", () => {
    const product = {
      ...products[0],
      active: false,
    };
    const { container, getByText } = render(
      <ProductListItem product={product} />
    );
    const button = getByText("Unavailable");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
  });

  test("Rating, stars should be filled", () => {
    const product = {
      ...products[0],
      rating: 2,
    };
    const { container } = render(<ProductListItem product={product} />);

    expect(
      container.getElementsByClassName("MuiRating-iconFilled")
    ).toHaveLength(product.rating);
    expect(
      container.getElementsByClassName("MuiRating-iconEmpty")
    ).toHaveLength(5 - product.rating);
  });

  test("Promo item should have badge", () => {
    const product = {
      ...products[0],
      promo: true,
    };
    const { getByText } = render(<ProductListItem product={product} />);

    expect(getByText("Promo")).toBeInTheDocument();
  });
});
