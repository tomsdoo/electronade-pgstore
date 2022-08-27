# electronade-pgstore

It's a package for electronade that provides stre feature using postgresql.

# Installation
``` shell
npm install electronade-pgstore
```

# What Exposed
``` typescript
electronade: {
  pgstore: {
    get: (
      connectionString: string,
      tableName: string,
      id: string
    ) => Promise<any>;

    getAll: (
      connectionString: string;
      tableName: string;
    ) => Promise<any[]>;

    save: (
      connectionString: string;
      tableName: string;
      item: object
    ) => Promise<any>;

    remove: (
      connectionString: string;
      tableName: string;
      id: string
    ) => Promise<any>;
  }
}
```

# Usage
See electronade usage for details.

``` javascript
const [
  connectionString,
  tableName,
] = [
  "dummy connection string",
  "dummyTable"
];

const item = await electronade.pgstore
  .save(
    connectionString,
    tableName,
    { message: "hello" }
  );

assert.equal(
  await electronade.pgstore
    .get(
      connectionString,
      tableName,
      item._id
    )
    .then(({ message }) => message),
  item.message
);

```
