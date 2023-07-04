# Website Quản lý Dự án

Đây là một ứng dụng web được phát triển bằng Node.js, Express, MySQL và React để quản lý các dự án và công việc trong một môi trường doanh nghiệp. Ứng dụng này cho phép người dùng thêm, chỉnh sửa và theo dõi tiến độ của các dự án và công việc trong một giao diện dễ sử dụng và thân thiện.

## Các tính năng

- Đăng nhập
- Quản lý dự án bao gồm thêm, sửa, xóa dự án
- Quản lý công việc bao gồm thêm, sửa, xóa công việc
- Phân công công việc cho thành viên trong dự án.
- Xem danh sách công việc và theo dõi tiến độ của từng công việc.
- Thống kê dự án và công việc
- Lưu trữ và quản lý tài liệu liên quan đến dự án và công việc.
- Quản lý người dùng bao gồm thêm, sửa, xóa người dùng.

## Cài đặt

1. Clone repository này về máy của bạn:

   ```
   git clone ttps://github.com/ThanhTr2312/qlcv.git
   ```

2. Di chuyển vào thư mục dự án:

   ```
   cd backend
   ```

3. Cài đặt các dependencies của server:

   ```
   npm install
   ```

4. Di chuyển vào thư mục client:

   ```
   cd frontend
   ```

5. Cài đặt các dependencies của client:

   ```
   npm install
   ```

6. Quay lại thư mục gốc:

   ```
   cd ..
   ```

7. Thiết lập cấu hình cơ sở dữ liệu MySQL: Tạo một cơ sở dữ liệu mới trong MySQL và ghi lại thông tin cấu hình.

8. Đặt cấu hình môi trường:

   Trong tệp `app/config/index.js`, chỉnh sửa cấu hình trực tiếp bằng cách thay đổi giá trị trong đối tượng `config.database`. Ví dụ:

     ```
     const config = {
         // ...
         database: {
                 host: 'your-database-host',
                 user: 'your-database-username',
                 password: 'your-database-password',
                 database: 'your-database-name',
             },
         // ...
     };
     ```

9. Chạy ứng dụng:

   - Chạy server:

     ```
     cd backend
     npm start
     ```

   - Chạy client:

     ```
     cd frontend
     npm start
     ```

   Ứng dụng sẽ được chạy tại `http://localhost:3000`.

## Công nghệ sử dụng

- Node.js
- Express
- MySQL
- React
- HTML/CSS

  ## APIs Collection

  Danh sách các API được tìm thấy trong `QuanLyCongViec.postman_collection.json`.

  
