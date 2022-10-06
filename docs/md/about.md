# electronade-pgstore

It's a package for [electronade](https://electronade.netlify.app/) that provides store feature using postgresql.

![npm](https://img.shields.io/npm/v/electronade-pgstore)
![NPM](https://img.shields.io/npm/l/electronade-pgstore)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/electronade-pgstore)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/electronade-pgstore)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

[![](https://nodei.co/npm/electronade-pgstore.svg?mini=true)](https://www.npmjs.com/package/electronade-pgstore)

## installation

``` shell
npm install electronade-pgstore
```

## interfaces

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

# usage
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
