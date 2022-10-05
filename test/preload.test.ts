import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { mock } from "sinon";

import { preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string, ...args: any[]) => Promise.resolve(eventName),
};

let connectionString: string;
let tableName: string;
let testId: string;

describe("preloadObject", () => {
  before(() => {
    connectionString = "dummy connection string";
    tableName = "tablename";
    testId = "test-id";
  });

  it("pgstore.get exists", () => {
    assert(preloadObject.pgstore.get);
  });

  it("pgstore:get calling", async () => {
    const mocked = mock(ipcRenderer);
    const mockedValue = { _id: "test id" };

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-pgstore:get", {
        connectionString,
        tableName,
        id: testId,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.pgstore.get.toString())(
        connectionString,
        tableName,
        testId
      ).then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );

    mocked.verify();
    mocked.restore();
  });

  it("pgstore.getAll exists", () => {
    assert(preloadObject.pgstore.getAll);
  });

  it("pgstore.getAll calling", async () => {
    const mocked = mock(ipcRenderer);
    const mockedValue = [{ _id: "test id" }];

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-pgstore:getall", {
        connectionString,
        tableName,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.pgstore.getAll.toString())(
        connectionString,
        tableName
      ).then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );

    mocked.verify();
    mocked.restore();
  });

  it("pgstore.save exists", () => {
    assert(preloadObject.pgstore.save);
  });

  it("pgstore.save calling", async () => {
    const mocked = mock(ipcRenderer);
    const item = { name: "test" };
    const mockedValue = { _id: testId };

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-pgstore:save", {
        connectionString,
        tableName,
        item,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.pgstore.save.toString())(
        connectionString,
        tableName,
        item
      ).then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );

    mocked.verify();
    mocked.restore();
  });

  it("pgstore.remove exists", () => {
    assert(preloadObject.pgstore.remove);
  });

  it("pgstore.remove calling", async () => {
    const mocked = mock(ipcRenderer);
    const mockedValue = undefined;

    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-pgstore:remove", {
        connectionString,
        tableName,
        id: testId,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.pgstore.remove.toString())(
        connectionString,
        tableName,
        testId
      ),
      mockedValue
    );

    mocked.verify();
    mocked.restore();
  });
});
