## Task Management API Collection

This is a collection of API requests for the Task Management application.

### Dang-nhap

**Endpoint:** `POST /api/auth/login`

**Request:**

- Method: `POST`
- URL: `http://localhost:8080/api/auth/login`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: [Your Authorization Token]`
- Body:
  ```json
  {
      "Username": "thanh11",
      "Password": "123123123"
  }
