import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles, preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string) => Promise.resolve(eventName),
};

let handleStore: {
  [key: string]: Function;
};

let connectionString: string;
let tableName: string;
let testId: string;
let item: object;

describe("preloadObject to handles", () => {
  before(() => {
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) => [eventName, handler])
    );

    connectionString = "connection string";
    tableName = "table name";
    testId = "test-id";
    item = { message: "test" };
  });

  it("electronade-pgstore:get", async () => {
    assert(
      (await eval(preloadObject.pgstore.get.toString())(
        connectionString,
        tableName,
        testId
      )) in handleStore
    );
  });

  it("electronade-pgstore:getall", async () => {
    assert(
      (await eval(preloadObject.pgstore.getAll.toString())(
        connectionString,
        tableName
      )) in handleStore
    );
  });

  it("electronade-pgstore:save", async () => {
    assert(
      (await eval(preloadObject.pgstore.save.toString())(
        connectionString,
        tableName,
        item
      )) in handleStore
    );
  });

  it("electronade-pgstore:remove", async () => {
    assert(
      (await eval(preloadObject.pgstore.remove.toString())(
        connectionString,
        tableName,
        testId
      )) in handleStore
    );
  });
});
