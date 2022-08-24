import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles, preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string) => Promise.resolve(eventName)
}

let handleStore: {
  [key: string]: Function;
};

describe("preloadObject to handles", () => {
  before(() => {
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) => [ eventName, handler ])
    );
  });

  it("electronade-pgstore:get", async () => {
    const [
      connectionString,
      tableName,
      testId
    ] = [
      "connection string",
      "mytable",
      "test id"
    ];

    assert(
      await eval(preloadObject.pgstore.get.toString())
        (connectionString, tableName, testId)
      in handleStore
    );
  });

});
