import { render } from "tests";
import AuthLayout from "../components/AuthLayout";

describe("Authentication layout", () => {
  test("Displays all information", () => {
    const { getByAltText, getByText } = render(<AuthLayout />);

    expect(getByAltText("mountain landscape")).toBeInTheDocument();
    expect(getByText("join.tsh.io")).toBeInTheDocument();
  });
});
