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

# Task (CongViec) API

Provide information about the APIs related to "CongViec" (Job).

## 1. Get all Tasks

This API allows users to get all the tasks.

### Request

- Method: `GET`
- URL: `http://localhost:8000/api/congviec`

### Response

- Body:
```json
{[\n    {\n        \"MaCongViec\": \"290620231533462138889\",\n        \"TenCongViec\": \"Cong viec A\",\n        \"MoTaCongViec\": \"Mo ta cong viec A\",\n        \"NgayBatDau\": \"2023-06-14T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-14T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 1,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"290620231533464038125\",\n        \"TenCongViec\": \"Cong viec E\",\n        \"MoTaCongViec\": \"Mo ta cong viec E\",\n        \"NgayBatDau\": \"2023-06-18T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-18T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 1,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"290620231533464818686\",\n        \"TenCongViec\": \"Cong viec H\",\n        \"MoTaCongViec\": \"Mo ta cong viec H\",\n        \"NgayBatDau\": \"2023-06-21T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-21T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 1,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"29062023153346606794\",\n        \"TenCongViec\": \"Cong viec B\",\n        \"MoTaCongViec\": \"Mo ta cong viec B\",\n        \"NgayBatDau\": \"2023-06-15T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-15T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 0,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"290620231533467265767\",\n        \"TenCongViec\": \"Cong viec D\",\n        \"MoTaCongViec\": \"Mo ta cong viec D\",\n        \"NgayBatDau\": \"2023-06-17T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-17T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 1,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"290620231533467723433\",\n        \"TenCongViec\": \"Cong viec G\",\n        \"MoTaCongViec\": \"Mo ta cong viec G\",\n        \"NgayBatDau\": \"2023-06-20T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-20T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 1,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"290620231533468048956\",\n        \"TenCongViec\": \"Cong viec I\",\n        \"MoTaCongViec\": \"Mo ta cong viec I\",\n        \"NgayBatDau\": \"2023-06-22T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-22T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 1,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"290620231533468978578\",\n        \"TenCongViec\": \"Cong viec C\",\n        \"MoTaCongViec\": \"Mo ta cong viec C\",\n        \"NgayBatDau\": \"2023-06-16T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-16T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 1,\n        \"MaDuAn\": \"1234567890\"\n    },\n    {\n        \"MaCongViec\": \"290620231533469177816\",\n        \"TenCongViec\": \"Cong viec F\",\n        \"MoTaCongViec\": \"Mo ta cong viec F\",\n        \"NgayBatDau\": \"2023-06-19T17:00:00.000Z\",\n        \"NgayKetThuc\": \"2023-07-19T17:00:00.000Z\",\n        \"TrangThai\": 1,\n        \"UuTien\": 0,\n        \"MaDuAn\": \"1234567890\"\n    }\n]}
``` 

## 2. Get a specific Task

- URL: `http://localhost:8000/api/congviec/24062023195822330244`
- Method: `GET`

## 3. Create a new Task

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
