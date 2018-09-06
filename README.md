# Key-value store

POST http://key.wangriwu.com:4010/object

Body: `{ mykey : value1 }`

Response: `{ "key": "mykey", "value": "value1", "timestamp": time }`  
`time` is timestamp of the post request.

Returns status code `422` if request body does not contain exactly 1 key-value pair.

---

GET http://key.wangriwu.com:4010/object/mykey?timestamp=1440568980

Response: `{ "value": value1 }`  
`value1` is the matching entry with the largest `timestamp` that is less than or equal to the `timestamp` specified in query option.  
If query option is not specified, the matching entry with largest `timestamp` will be returned.

Returns status code `404` if no matching entry (that satisfies `timestamp` query option if specified) is found.

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
