import { renderHook } from "@testing-library/react-hooks";
import usePagination from "./usePagination";

//We use pagination hook from material ui library, tests are focus on implementation that was changed

describe("pagination login tests", () => {
  it("render all elements", () => {
    const { result } = renderHook(() =>
      usePagination({
        count: 6,
        siblingCount: 1,
        page: 1,
        hideNextButton: true,
        hidePrevButton: true,
        boundaryCount: 3,
      })
    );
    const { items } = result.current;
    expect(items).toHaveLength(6);
    items.forEach((item, key) => {
      expect(item.page).toBe(key + 1);
    });
  });

  it("render few pages and elipsis", () => {
    const { result } = renderHook(() =>
      usePagination({
        count: 20,
        siblingCount: 1,
        page: 1,
        hideNextButton: true,
        hidePrevButton: true,
        boundaryCount: 3,
      })
    );
    const { items } = result.current;
    expect(items).toHaveLength(7);
    expect(items[3].type).toBe("end-ellipsis");
  });

  it("boundary only changes on end side", () => {
    const pageNumber = 20;
    const { result } = renderHook(() =>
      usePagination({
        count: pageNumber,
        siblingCount: 1,
        page: 1,
        hideNextButton: true,
        hidePrevButton: true,
        boundaryCount: 2,
      })
    );
    const { items } = result.current;
    expect(items).toHaveLength(6);
    expect(items[0].page).toBe(1);
    expect(items[1].page).toBe(2);
    expect(items[2].page).toBe(3);

    expect(items[items.length - 1].page).toBe(pageNumber);
    expect(items[items.length - 2].page).toBe(pageNumber - 1);
    expect(items[items.length - 3].type).toBe("end-ellipsis");
  });

  it("no sibling should render only 1 on start side", () => {
    const pageNumber = 20;
    const { result } = renderHook(() =>
      usePagination({
        count: pageNumber,
        siblingCount: 0,
        page: 1,
        hideNextButton: true,
        hidePrevButton: true,
        boundaryCount: 3,
      })
    );
    const { items } = result.current;
    expect(items).toHaveLength(5);
    expect(items[0].page).toBe(1);
    expect(items[1].type).toBe("end-ellipsis");
  });
});
