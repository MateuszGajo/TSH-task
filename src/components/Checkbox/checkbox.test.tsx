import React from "react";
import { render } from "tests";
import { fireEvent } from "@testing-library/react";

import Checkbox from ".";

describe("checkbox", () => {
  test("displays all information", () => {
    const checkboxName = "name";
    const { getByLabelText } = render(
      <Checkbox onChange={() => {}} label={checkboxName} />
    );
    expect(getByLabelText(checkboxName)).toBeInTheDocument();
  });

  test("Click on label should change value", () => {
    const checkboxName = "name";
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <Checkbox onChange={onChangeMock} label={checkboxName} />
    );
    const checkbox = getByLabelText(checkboxName);
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  test("Render Checked checkbox", () => {
    const checkboxName = "name";
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <Checkbox onChange={onChangeMock} label={checkboxName} defaultChecked />
    );
    const checkbox = getByLabelText(checkboxName);
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });
});
