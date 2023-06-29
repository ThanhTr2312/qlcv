## Task Management API Collection

This is a collection of API requests for the Task Management application.

# Login API

This API allows users to log in to the application.

## Login User

- Method: POST
- URL: `http://localhost:8080/api/auth/login`

Logs in a user and retrieves an access token.

### Request

- Method: POST
- Headers:
  - Content-Type: application/json (disabled)
  - Authorization: (disabled)

- Body (urlencoded):
  - Username: thanh11
  - Password: 123123123

### Response

- Body:
```json
{
    "id": "ND1687946914579",
    "Username": "thanh11",
    "MaLoaiNguoiDung": "03",
    "Role": "manager",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYU5ndW9pRHVuZyI6Ik5EMTY4Nzk0NjkxNDU3OSIsIlVzZXJuYW1lIjoidGhhbmgxMSIsIk1hTG9haU5ndW9pRHVuZyI6IjAzIiwiUm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2ODgwMjIxMDYsImV4cCI6MTY4ODEwODUwNn0.QrSjjUwvX3bkphHyQHdige6rLtt1oBFNod4Fv_60mWo"
}
```

# Job (CongViec) API

Provide information about the APIs related to "CongViec" (Job).

### 1. Get all Jobs

- URL: `http://localhost:8000/api/congviec`
- Method: `GET`

### 2. Get a specific Job

- URL: `http://localhost:8000/api/congviec/24062023195822330244`
- Method: `GET`

### 3. Create a new Job

- URL: `http://localhost:8000/api/congviec/DA1687249796172`
- Method: `POST`
- Body:
    ```json
    {
        "TenCongViec": "TEST by Huynh Anh",
        "MoTaCongViec": "Test by Huynh Anh",
        "NgayBatDau": "2023-06-29",
        "NgayKetThuc": "2023-07-29",
        "TrangThai": 0,
        "UuTien": 1
    }
    ```

### 4. Upload a file for a Job

- URL: `http://localhost:8000/api/congviecfile/DA1687249796172`
- Method: `POST`
- Body: Form Data
    - `files` (file): `/D:/Downloads/testCV.xlsx`

### 5. Search for Jobs

- URL: `http://localhost:8000/api/timCongViec?search=Test`
- Method: `GET`

### 6. Get Jobs by Project

- URL: `http://localhost:8000/api/congviecbyduan/DA1687249796172`
- Method: `GET`

### 7. Update a Job

- URL: `http://localhost:8000/api/congviec/240620232018092977672`
- Method: `PUT`
- Body:
    ```json
    {
        "TenCongViec": "TEST EDIT",
        "MoTaCongViec": "Test edit",
        "NgayBatDau": "2023-05-14T17:00:00.000Z",
        "NgayKetThuc": "2023-07-14T17:00:00.000Z",
        "TrangThai": 3,
        "UuTien": 2,
        "MaDuAn": "DA1687249828346"
    }
    ```

### 8. Delete a Job

- URL: `http://localhost:8000/api/congviec/240620232018092977672`
- Method: `DELETE`

### 9. Permanently delete a Job

- URL: `http://localhost:8000/api/xoaCongViecVinhVien/240620232018092977672`
- Method: `DELETE`

### 10. Assign Job to Users

- URL: `http://localhost:8000/api/congviec/phanCongCongViec/290620231400489248165`
- Method: `POST`
- Body: Form Data
    - `files` (file):.
