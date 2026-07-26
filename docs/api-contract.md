# قرارداد API مورد استفاده

Base URL:

```text
https://wholesaler-core-v2.paraf.app/api
```

## Authentication

### POST `/users/login`

Request:

```json
{
  "phone": "989xxxxxxxxx",
  "password": "******"
}
```

Response:

```json
{
  "success": true,
  "result": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

درخواست‌های بعدی:

```http
Authorization: Bearer ACCESS_TOKEN
```

## Dashboard user scope

- `GET /users/me`
- `GET /users/vitrin/all-user`
- `GET /levels`
- `GET /customer-club/summary`

## Dashboard vitrin scope

- `GET /users/me`
- `GET /users/vitrin/all-user`
- `GET /levels`
- `GET /users/vitrin/{userVitrinId}`
- `GET /customer-club/summary-user-vitrin/{userVitrinId}`

## Recent activities

### GET `/recent-activities`

Query parameters:

- `offset`
- `size`
- `type`
- `userVitrinId` فقط در حالت ویترین

Supported types:

- `BOTH`
- `COIN`
- `SCORE`
- `SPENTCOIN`
- `TRANSFERCOIN`
