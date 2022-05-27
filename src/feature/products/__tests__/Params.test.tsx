import { render } from "@testing-library/react";
import { ProductParams } from "app/model/product";

import { convertToParams, convertToObjectParams } from "../utils/Params";

describe("product params utils", () => {
  test("Convert to params should return url object", () => {
    const params: ProductParams = {
      active: true,
    };

    const paramsObj = convertToParams(params);
    expect(paramsObj).toBeInstanceOf(URLSearchParams);
  });
  test("Convert to params should have parameter properties ", () => {
    const params: ProductParams = {
      active: true,
      promo: true,
      page: 2,
      limit: 2,
      search: "abc",
    };

    const paramsObj = convertToParams(params);
    expect(paramsObj.toString()).toContain("active=true");
    expect(paramsObj.toString()).toContain("promo=true");
    expect(paramsObj.toString()).toContain("page=2");
    expect(paramsObj.toString()).toContain("limit=2");
    expect(paramsObj.toString()).toContain("search=abc");
  });
  test("Convert to params should be empty ", () => {
    const params: ProductParams = {};

    const paramsObj = convertToParams(params);
    expect(paramsObj.toString()).toBe("");
  });

  test("Convert to object params should be an object", () => {
    const urlSearchParams = new URLSearchParams("active=true");

    const objectParams = convertToObjectParams(urlSearchParams);
    expect(objectParams).toBeInstanceOf(Object);
  });

  test("Convert to object params should have urlSearchParams properties ", () => {
    const urlSearchParams = new URLSearchParams(
      "active=true&promo=true&page=2&search=abc&limit=8"
    );

    const objectParams = convertToObjectParams(urlSearchParams);

    expect(objectParams).toHaveProperty("active");
    expect(objectParams["active"]).toBe(true);
    expect(objectParams).toHaveProperty("promo");
    expect(objectParams["promo"]).toBe(true);
    expect(objectParams).toHaveProperty("page");
    expect(objectParams["page"]).toBe(2);
    expect(objectParams).toHaveProperty("search");
    expect(objectParams["search"]).toBe("abc");
    expect(objectParams).toHaveProperty("limit");
    expect(objectParams["limit"]).toBe(8);
  });

  test("Convert to object params shouldn't convert property that are not in product params type", () => {
    const urlSearchParams = new URLSearchParams(
      "active=true&promo=true&page=2&search=abc&limit=8&test=2"
    );

    const objectParams = convertToObjectParams(urlSearchParams);

    expect(objectParams).not.toHaveProperty("test");
  });

  test("Convert to object params should be empty", () => {
    const urlSearchParams = new URLSearchParams();

    const objectParams = convertToObjectParams(urlSearchParams);

    expect(Object.keys(objectParams).length).toBe(0);
  });
});
