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
    )
  }
};
