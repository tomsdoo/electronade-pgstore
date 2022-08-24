import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles } from "../src/";

let handleStore: {
  [key: string]: Function;
};

describe("handles", () => {
  before(() => {
    handleStore = Object.fromEntries(
      handles.map(
        ({ eventName, handler }) => [ eventName, handler ]
      )
    );
  });

  it("electronade-pgstore:get eventName exists", () => {
    assert(
      "electronade-pgstore:get" in handleStore
    );
  });
});