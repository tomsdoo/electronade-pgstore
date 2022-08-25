import { PgKvs } from "@tomsd/pgkvs";
const { ipcRenderer } = require("electron");

export const handles = [
  {
    eventName: "electronade-pgstore:get",
    handler: (
      event: any,
      {
        connectionString,
        tableName,
        id
      }: {
        connectionString: string;
        tableName: string;
        id: string;
      }
    ) => new PgKvs(connectionString, tableName).get(id)
  },
  {
    eventName: "electronade-pgstore:getall",
    handler: (
      event: any,
      {
        connectionString,
        tableName
      }: {
        connectionString: string;
        tableName: string;
      }
    ) => new PgKvs(connectionString, tableName).getAll()
  },
  {
    eventName: "electronade-pgstore:save",
    handler: (
      event:any,
      {
        connectionString,
        tableName,
        item
      }: {
        connectionString: string;
        tableName: string;
        item: object;
      }
    ) => new PgKvs(connectionString, tableName).upsert(item)
  },
  {
    eventName: "electronade-pgstore:remove",
    handler: (
      event: any,
      {
        connectionString,
        tableName,
        id
      }: {
        connectionString: string;
        tableName: string;
        id: string;
      }
    ) => new PgKvs(connectionString, tableName).remove(id)
  }
];

export const preloadObject = {
  pgstore: {
    get: (
      connectionString: string,
      tableName: string,
      id: string
    ) => ipcRenderer.invoke(
      "electronade-pgstore:get",
      {
        connectionString,
        tableName,
        id
      }
    ),
    getAll: (
      connectionString: string,
      tableName: string
    ) => ipcRenderer.invoke(
      "electronade-pgstore:getall",
      {
        connectionString,
        tableName
      }
    ),
    save: (
      connectionString: string,
      tableName: string,
      item: object
    ) => ipcRenderer.invoke(
      "electronade-pgstore:save",
      {
        connectionString,
        tableName,
        item
      }
    ),
    remove: (
      connectionString: string,
      tableName: string,
      id: string
    ) => ipcRenderer.invoke(
      "electronade-pgstore:remove",
      {
        connectionString,
        tableName,
        id
      }
    )
  }
};
