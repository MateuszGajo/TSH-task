import { render, fireEvent } from "tests";
import ProductPagination from "../components/ProductPagination";

describe("Product pagination", () => {
  test("displays all information", () => {
    const { getByText } = render(
      <ProductPagination count={6} page={1} handlePageChange={() => {}} />
    );
    for (let i = 0; i < 6; i++) {
      expect(getByText(String(i + 1))).toBeInTheDocument();
    }
    expect(getByText(/first/i)).toBeInTheDocument();
    expect(getByText(/last/i)).toBeInTheDocument();
  });

  test("next previous buttons shouldn't be rendered", () => {
    const { queryByText } = render(
      <ProductPagination count={6} page={1} handlePageChange={() => {}} />
    );
    expect(queryByText(/next/i)).toBe(null);
    expect(queryByText(/previous/i)).toBe(null);
  });

  test("on page change callback should fire", () => {
    const handlePageChangeMock = jest.fn();
    const { getByText } = render(
      <ProductPagination
        count={6}
        page={1}
        handlePageChange={handlePageChangeMock}
      />
    );

    fireEvent.click(getByText("2"));
    expect(handlePageChangeMock).toHaveBeenCalledTimes(1);
    expect(handlePageChangeMock).toHaveBeenCalledWith(expect.anything(), 2);
  });

  test("Should render first 3 pages, dots and last three", () => {
    const handlePageChangeMock = jest.fn();
    const count = 20;
    const { getByText } = render(
      <ProductPagination
        count={count}
        page={1}
        handlePageChange={handlePageChangeMock}
      />
    );

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("…")).toBeInTheDocument();
    expect(getByText(String(count))).toBeInTheDocument();
    expect(getByText(String(count - 1))).toBeInTheDocument();
    expect(getByText(String(count - 2))).toBeInTheDocument();
  });
});
