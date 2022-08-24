import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { mock } from "sinon";

import { preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string, ...args: any[]) => Promise.resolve(eventName)
};

describe("preloadObject", () => {
  it("pgstore.get exists", () => {
    assert(preloadObject.pgstore.get);
  });

  it("pgstore:get calling", async () => {
    const mocked = mock(ipcRenderer);
    const [
      connectionString,
      tableName,
      testId,
      mockedValue
    ] = [
      "dummy connection string",
      "mytable",
      "test id",
      { _id: "test id" }
    ];
    mocked
      .expects("invoke")
      .once()
      .withArgs(
        "electronade-pgstore:get",
        {
          connectionString,
          tableName,
          id: testId
        }
      )
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.pgstore.get.toString())
        (connectionString, tableName, testId)
        .then((result: any) => JSON.stringify(result)),
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
    const [
      connectionString,
      tableName,
      mockedValue
    ] = [
      "dummy connection string",
      "mytable",
      [{ _id: "test id" }]
    ];

    mocked
      .expects("invoke")
      .once()
      .withArgs(
        "electronade-pgstore:getall",
        {
          connectionString,
          tableName
        }
      )
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.pgstore.getAll.toString())
        (connectionString, tableName)
        .then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );

    mocked.verify();
    mocked.restore();
  });
});
