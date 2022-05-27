import { fireEvent, render } from "tests";
import * as stores from "app/providers/RootStoreProvider";
import ProductDashboard from "../";

const sleep = (time: number) => new Promise((r) => setTimeout(r, time));

describe("product dashboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("expect component instantly fetch data using store", async () => {
    const productStore = {
      loadProducts: jest.fn(),
      isLoading: false,
      error: {
        status: false,
        type: "",
        message: "",
      },
      products: null,
    };
    jest
      .spyOn(stores, "useProductStore")
      .mockImplementation(() => productStore);
    render(<ProductDashboard />);
    expect(productStore.loadProducts).toHaveBeenCalledTimes(1);
  });

  test("expect component instantly fetch data using store", async () => {
    const productStore = {
      loadProducts: jest.fn(),
      isLoading: false,
      error: {
        status: false,
        type: "",
        message: "",
      },
      products: null,
    };
    jest
      .spyOn(stores, "useProductStore")
      .mockImplementation(() => productStore);
    const { getByLabelText } = render(<ProductDashboard />);
    fireEvent.click(getByLabelText("Active"));

    expect(productStore.loadProducts).toHaveBeenCalledTimes(2);
  });
});
