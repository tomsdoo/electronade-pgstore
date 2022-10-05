import { PgKvs } from "@tomsd/pgkvs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

export const handles = [
  {
    eventName: "electronade-pgstore:get",
    handler: async (
      event: any,
      {
        connectionString,
        tableName,
        id,
      }: {
        connectionString: string;
        tableName: string;
        id: string;
      }
    ) => await new PgKvs(connectionString, tableName).get(id),
  },
  {
    eventName: "electronade-pgstore:getall",
    handler: async (
      event: any,
      {
        connectionString,
        tableName,
      }: {
        connectionString: string;
        tableName: string;
      }
    ) => await new PgKvs(connectionString, tableName).getAll(),
  },
  {
    eventName: "electronade-pgstore:save",
    handler: async (
      event: any,
      {
        connectionString,
        tableName,
        item,
      }: {
        connectionString: string;
        tableName: string;
        item: object;
      }
    ) => await new PgKvs(connectionString, tableName).upsert(item),
  },
  {
    eventName: "electronade-pgstore:remove",
    handler: async (
      event: any,
      {
        connectionString,
        tableName,
        id,
      }: {
        connectionString: string;
        tableName: string;
        id: string;
      }
    ) => await new PgKvs(connectionString, tableName).remove(id),
  },
];

export const preloadObject = {
  pgstore: {
    get: async (connectionString: string, tableName: string, id: string) =>
      await ipcRenderer.invoke("electronade-pgstore:get", {
        connectionString,
        tableName,
        id,
      }),
    getAll: async (connectionString: string, tableName: string) =>
      await ipcRenderer.invoke("electronade-pgstore:getall", {
        connectionString,
        tableName,
      }),
    save: async (connectionString: string, tableName: string, item: object) =>
      await ipcRenderer.invoke("electronade-pgstore:save", {
        connectionString,
        tableName,
        item,
      }),
    remove: async (connectionString: string, tableName: string, id: string) =>
      await ipcRenderer.invoke("electronade-pgstore:remove", {
        connectionString,
        tableName,
        id,
      }),
  },
};
