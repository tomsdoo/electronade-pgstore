import { PgKvs } from "@tomsd/pgkvs";

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
