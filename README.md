# Key-value store

## Endpoints

`POST` https://a.wangriwu.com:4010/object

Body: `{ mykey : value1 }`

Response: `{ key: "mykey", value: "value1", timestamp: time }`  
`time` is timestamp of the post request.

Error response status code:

- `422`: request body does not contain exactly 1 key-value pair
- `409`: there is already an entry with the same key and timestamp (could happen when receiving multiple requests within 1 sec)

---

`GET` https://a.wangriwu.com:4010/object/mykey?timestamp=1440568980

Response: `{ value: value1 }`  
`value1` is the matching entry with the largest `timestamp` that is less than or equal to the `timestamp` query option.  
If the query option is not specified, the matching entry with largest `timestamp` will be returned.

Error response status code:

- `404`: no matching entry (that satisfies the `timestamp` query option if specified) is found.

## Setup

- Install node version >= 8
- `yarn install`
- Setup database: `schema.sql`
- Setup environment variables

  - `MYSQL_HOST`
  - `MYSQL_USER`
  - `MYSQL_PORT`
  - `MYSQL_PASSWORD`

## Development

- `yarn start`

## Test

- `yarn test`

## Deploy

- `node bin/www`

## Future work

- Avoid inserting new entry if the latest (largest timestamp) matching entry (same key) has the same value, as the record will be redundant.  
  **Drawback**: `POST` request will be slightly slower due to the need to check existing entries.
- Use ORM
- Add more tests (mock database)
