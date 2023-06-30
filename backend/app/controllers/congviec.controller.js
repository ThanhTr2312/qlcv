const { BadRequestError, handle } = require("../helpers/errors");
const { config, connection } = require('../config/index');
const moment = require ('moment');
const xlsx = require('xlsx');
const fs = require('fs');

/// GET /api/congViec
// GET http://localhost:8000/api/congViec
const findAll = (req, res) => {
    const column = req.query.column;
    const type = req.query.type;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    res.header("Access-Control-Allow-Origin", "*");
    if (req.query.hasOwnProperty("sort")) {
      const query =
        "SELECT * FROM congviec WHERE trangthai != 6 ORDER BY " +
        column +
        " " +
        type;
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL: " + err.stack);
          return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        // Trả về kết quả dưới dạng JSON
        // res.json(results);
        if (results.length == 0) {
          return res.status(200).json({ error: "Không có công việc" });
        } else {
          res.json(results);
        }
      });
    } else if (
      req.query.hasOwnProperty("page") &&
      req.query.hasOwnProperty("limit")
    ) {
      const query = `SELECT * FROM congviec WHERE trangthai != 6 LIMIT ${limit} OFFSET ${offset}`;
  
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL: " + err.stack);
          return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: "Không có công việc" });
        } else {
          res.json(results);
        }
      });
    } else {
      // Thực hiện truy vấn
      const query = 'SELECT * FROM congviec WHERE trangthai != 6';
      connection.query(
        query,
        (err, results) => {
          if (err) {
            console.error("Lỗi truy vấn MySQL: " + err.stack);
            return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
          }
          // Trả về kết quả dưới dạng JSON
          // res.json(results);
          if (results.length == 0) {
            return res.status(404).json({ error: "Không có công việc" });
          } else {
            res.json(results);
          }
        }
      );
    }
  };



  // GET /api/congViec/:id
// GET http://localhost:8000/api/congviec/:id
const findid = (req, res) => {
    const maCongViec = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    const query = "SELECT * FROM congviec WHERE macongviec = ? AND trangthai != 6";
    // Thực hiện truy vấn
    connection.query(
      query,
      [maCongViec],
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL: " + err.stack);
          return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        // Trả về kết quả dưới dạng JSON
        if (results.length == 0) {
          return res.status(404).json({ error: "Không có công việc" });
        } else {
          res.json(results);
        }
      }
    );
  };

  
  // GET /api/timCongViec
// GET http://localhost:8000/api/timCongViec?search=HHHFH
const findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const searchTerm = req.query.search;
    // Kiểm tra nếu không có giá trị tìm kiếm được cung cấp
    if (!searchTerm) {
      return res.status(400).json({ error: "Thiếu thông tin tìm kiếm" });
    }
    // Thực hiện truy vấn với điều kiện tìm kiếm tên công việc
    const query = "SELECT * FROM congviec WHERE tencongviec LIKE '%" +searchTerm +"%'";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn MySQL: " + err.stack);
        return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      }
      // Trả về kết quả dưới dạng JSON
      if (results.length == 0) {
        return res.status(404).json({ error: "Không tìm thấy công việc" });
      } else {
        res.json(results);
      }
    });
  };
  

  
  // POST /api/congviec/:id
// POST http://localhost:8000/api/congviec/:id
const create = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const maDuAn = req.params.id;
    const {
      TenCongViec,
      MoTaCongViec,
      NgayBatDau,
      NgayKetThuc,
      TrangThai,
      UuTien,
    } = req.body;
    const maCongViec = moment().format('DDMMYYYYHHmmss')+ ''+Math.floor(Math.random() * 10000000);
    // Tạo một đối tượng công việc mới
    const project = {
      maCongViec,
      TenCongViec,
      MoTaCongViec,
      NgayBatDau,
      NgayKetThuc,
      TrangThai,
      UuTien,
      maDuAn
    };
    const query= "INSERT INTO congviec SET ?";
    // Thêm công việc vào cơ sở dữ liệu
    connection.query(query, project, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm công việc:", err);
        return res.status(500).json({ error: "Lỗi khi thêm công việc." });
      }
      return res
        .status(201)
        .json({ success: "Công việc mới đã được tạo thành công." });
    });
  };


  // PUT /api/congviec/:id
// PUT http://localhost:8000/api/congviec/:id
const update = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const maCongViec = req.params.id;
    const {
      TenCongViec,
      MoTaCongViec,
      NgayBatDau,
      NgayKetThuc,
      TrangThai,
      UuTien,
      MaDuAn
    } = req.body;
    const query =
      "UPDATE congviec SET TenCongViec = ?, MoTaCongViec = ?, NgayBatDau = ?, NgayKetThuc = ?, TrangThai = ?, UuTien = ?, MaDuAn= ? WHERE MaCongViec = ?;";
    connection.query(
      query,
      [
        TenCongViec,
        MoTaCongViec,
        NgayBatDau,
        NgayKetThuc,
        TrangThai,
        UuTien,
        MaDuAn,
        maCongViec,
      ],
      (error, results) => {
        if (error) {
          console.error("Error updating job:", error);
          return res
            .status(500)
            .json({ error: "Đã xảy ra lỗi trong quá trình cập nhật công việc." });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Công việc không tồn tại." });
        }
        return res.json({ message: "Cập nhật công việc thành công." });
      }
    );
  };



  // PATCH /api/congviec/:id
// PATCH http://localhost:8000/api/congviec/:id
const deleteTT = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const maCongViec = req.params.id;
    const TrangThai = 6;
    const query = "UPDATE congviec SET TrangThai = ? WHERE MaCongViec = ?;";
    connection.query(query, [TrangThai, maCongViec], (error, results) => {
      if (error) {
        console.error("Error updating project:", error);
        return res
          .status(500)
          .json({ error: "Đã xảy ra lỗi trong quá trình xóa công việc." });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Công việc không tồn tại." });
      }
      return res.json({ message: "Xóa công việc thành công." });
    });
  };


// DELETE /api/xoaCongViecVinhVien/:id
// DELETE http://localhost:8000/api/xoaCongViecVinhVien/:id
const deleteVV = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const maCongViec = req.params.id;
    const query = "SELECT * FROM nguoidung_congviec WHERE macongviec = ?";
    connection.query(query, [maCongViec], (error, results) => {
      if (error) {
        console.error("Error querying documents:", error);
        return res
          .status(500)
          .json({ error: "Đã xảy ra lỗi trong quá trình truy vấn công việc." });
      }
  
      // Gán giá trị NULL cho khóa ngoại mã công việc
      const updateQuery =
        "UPDATE nguoidung_congviec SET macongviec = NULL WHERE macongviec = ?";
      connection.query(
        updateQuery,
        [maCongViec],
        (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating documents:", updateError);
            return res.status(500).json({
              error: "Đã xảy ra lỗi trong quá trình cập nhật công việc.",
            });
          }
          // Tiếp tục xóa công việc sau khi đã gán giá trị NULL cho khóa ngoại
          const deleteQuery = "DELETE FROM congviec WHERE macongviec = ?";
          connection.query(
            deleteQuery,
            [maCongViec],
            (deleteError, deleteResults) => {
              if (deleteError) {
                console.error("Error deleting project:", deleteError);
                return res.status(500).json({
                  error: "Đã xảy ra lỗi trong quá trình xóa công việc.",
                });
              }
              if (deleteResults.affectedRows === 0) {
                return res
                  .status(404)
                  .json({ error: "Công việc không tồn tại." });
              }
              return res.json({ message: "Xóa công việc vĩnh viễn thành công." });
            }
          );
        }
      );
    });
  };


  // Phân công công việc
// POST http://localhost:8000/api/phanCongCongViec/:id
const phanCongCongViec = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const maCongViec = req.params.id;
    const { MaNguoiDung } = req.body;
    const taptin = req.files;
    const queryThemNguoiDung_CV ="INSERT INTO NguoiDung_CongViec (MaND_CV, MaNguoiDung, MaCongViec) VALUES ?";
    
    if (typeof MaNguoiDung === 'string') {
      const values = [[moment().format("DDMMYYYYHHmmss") +"" +Math.floor(Math.random() * 10000000), MaNguoiDung, maCongViec]];
  
      connection.query(
        queryThemNguoiDung_CV,
        [values],
        (err, result) => {
          if (err) {
            console.error("Lỗi khi phân công công việc:", err);
            return res.status(500).json({ error: "Lỗi khi phân công công việc." });
          }
  
          if (taptin.length === 0) {
            return res.status(200).json({ success: "Công việc đã được cập nhật thành công." });
          }
  
          // Code xử lý tập tin tại đây (nếu cần)
          const valuesTaiLieu = taptin.map((file) => {
            const maTaiLieuCV = moment().format("DDMMYYYYHHmmss") +"" +Math.floor(Math.random() * 10000000);
            const maCV_TL = moment().format("DDMMYYYYHHmmss") +"" +Math.floor(Math.random() * 15000000);
            return [maTaiLieuCV, file.originalname, maCV_TL];
          });
    
          const queryThemTaiLieuCV ="INSERT INTO TaiLieuCV (MaTaiLieuCV, TenTaiLieuCV) VALUES ?";
          const queryThemCV_TaiLieuCV ="INSERT INTO congviec_tailieucv (MaCV_TL, MaCongViec, MaTaiLieuCV, TrangThai) VALUES ?";
    
          connection.query(queryThemTaiLieuCV,[valuesTaiLieu.map((value) => [value[0], value[1]])],(err, result) => {
              if (err) {
                console.error("Lỗi khi thêm tài liệu:", err);
                return res.status(500).json({ error: "Lỗi khi thêm tài liệu." });
              }
    
              const valuesCV_TL = valuesTaiLieu.map((value) => [value[2], maCongViec, value[0], 1]);
    
              connection.query(queryThemCV_TaiLieuCV,[valuesCV_TL],(err, result) => {
                  if (err) {
                    console.error("Lỗi khi thêm tài liệu cho công việc:", err);
                    return res.status(500).json({ error: "Lỗi khi thêm tài liệu cho công việc." });
                  }
                  return res.status(201).json({success: "Tài liệu cho công việc đã được tạo thành công."});
                }
              );
            }
          );
        }
      );
    }else{
      const values = MaNguoiDung.map((maNguoiDung) => [moment().format("DDMMYYYYHHmmss") +"" +Math.floor(Math.random() * 10000000), maNguoiDung, maCongViec]);
    
      connection.query(queryThemNguoiDung_CV,[values],(err, result) => {
          if (err) {
            console.error("Lỗi khi phân công công việc:", err);
            return res.status(500).json({ error: "Lỗi khi phân công công việc." });
          }
  
          if (taptin.length === 0) {
            return res.status(200).json({ success: "Công việc đã được cập nhật thành công." });
          }
  
          const valuesTaiLieu = taptin.map((file) => {
            const maTaiLieuCV = moment().format("DDMMYYYYHHmmss") +"" +Math.floor(Math.random() * 10000000);
            const maCV_TL = moment().format("DDMMYYYYHHmmss") +"" +Math.floor(Math.random() * 15000000);
            return [maTaiLieuCV, file.originalname, maCV_TL];
          });
  
          const queryThemTaiLieuCV ="INSERT INTO TaiLieuCV (MaTaiLieuCV, TenTaiLieuCV) VALUES ?";
          const queryThemCV_TaiLieuCV ="INSERT INTO congviec_tailieucv (MaCV_TL, MaCongViec, MaTaiLieuCV, TrangThai) VALUES ?";
  
          connection.query(queryThemTaiLieuCV, [valuesTaiLieu.map((value) => [value[0], value[1]])], (err, result) => {
              if (err) {
                console.error("Lỗi khi thêm tài liệu:", err);
                return res.status(500).json({ error: "Lỗi khi thêm tài liệu." });
              }
  
              const valuesCV_TL = valuesTaiLieu.map((value) => [value[2], maCongViec, value[0], 1]);
  
              connection.query( queryThemCV_TaiLieuCV, [valuesCV_TL], (err, result) => {
                  if (err) {
                    console.error("Lỗi khi thêm tài liệu cho công việc:", err);
                    return res
                      .status(500)
                      .json({ error: "Lỗi khi thêm tài liệu cho công việc." });
                  }
                  return res
                    .status(201)
                    .json({
                      success: "Tài liệu cho công việc đã được tạo thành công.",
                    });
                }
              );
            }
          );
        });
    }
};


/// GET /api/congviecbyduan/:id
// GET http://localhost:8000/api/congviecbyduan/:id
const findByDuAn = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const maDuAn = req.params.id;
  const query = "SELECT * FROM congviec WHERE MaDuAn= ? AND trangthai != 6;";
    // Thực hiện truy vấn
    connection.query(
      query,
      [maDuAn],
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL: " + err.stack);
          return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        // Trả về kết quả dưới dạng JSON
        if (results.length == 0) {
          return res.status(404).json({ error: "Không có công việc" });
        } else {
          res.json(results);
        }
      }
    );
};


const excelDateToJSDate = (serial) => {
  if (typeof serial === 'number') {
    const utcDays = Math.floor(serial - 25569);
    const utcValue = utcDays * 86400;
    const dateInfo = new Date(utcValue * 1000);

    const year = dateInfo.getFullYear();
    const month = dateInfo.getMonth() + 1;
    const day = dateInfo.getDate();

    return `${year}-${month}-${day}`;
  }
  return serial;
};


/// POST /api/congviecfile/:id
// POST http://localhost:8000/api/congviecfile/:id
const createFromFile = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const maDuAn = req.params.id;
    // Đường dẫn tới file Excel đã được upload
    const filePath = req.files[0].path;
    
    // Đọc file Excel
    const workbook = xlsx.readFile(filePath);

    // Lấy danh sách tên các sheet trong file
    const sheetNames = workbook.SheetNames;

    // Chọn sheet đầu tiên
    const firstSheet = workbook.Sheets[sheetNames[0]];

    // Chuyển đổi sheet thành JSON object
    const jsonData = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });

    // Xóa file đã được đọc
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error('Lỗi khi xóa file:', error);
      }
    });

    // Tìm chỉ mục của cột NgayBatDau và NgayKetThuc
    const headerRow = jsonData[0];
    const ngayBatDauIndex = headerRow.indexOf('NgayBatDau');
    const ngayKetThucIndex = headerRow.indexOf('NgayKetThuc');

    // Chuyển đổi các giá trị ngày trong cột NgayBatDau và NgayKetThuc thành định dạng ngày-tháng-năm
    const convertedData = jsonData.map((row) => {
      const convertedRow = row.map((cell, index) => {
        if (index === ngayBatDauIndex || index === ngayKetThucIndex) {
          return excelDateToJSDate(cell);
        }
        return cell;
      });
      return convertedRow;
    });

    // Thực hiện truy vấn MySQL để thêm dữ liệu vào bảng
    const insertQuery = 'INSERT INTO congviec (MaCongViec, TenCongViec, MoTaCongViec, NgayBatDau, NgayKetThuc, TrangThai, UuTien, MaDuAn) VALUES ?';
    const values = convertedData.slice(1).map((row) => {
      const maCongViec = moment().format("DDMMYYYYHHmmss") + "" + Math.floor(Math.random() * 10000000);
      return [maCongViec, ...row, maDuAn];
    });

    connection.query(insertQuery, [values], (error, result) => {
      if (error) {
        console.error('Lỗi khi thêm dữ liệu vào MySQL:', error);
        res.status(500).json({ error: 'Lỗi khi thêm dữ liệu vào MySQL' });
        return;
      }
      // Trả về thông báo thành công
      res.json({ message: 'Dữ liệu đã được thêm vào cơ sở dữ liệu.' });
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Lỗi khi đọc file Excel:', error);
    res.status(500).json({ error: 'Lỗi khi đọc file Excel' });
  }
};



// SELECT *
// FROM nguoidung
// JOIN nguoidung_congviec ON nguoidung.MaNguoiDung = nguoidung_congviec.MaNguoiDung
// JOIN congviec ON congviec.MaCongViec = nguoidung_congviec.MaCongViec
// WHERE nguoidung_congviec.MaCongViec = '230620231910001704416';
/// GET /api/nguoidungbycongviec/:id
// GET http://localhost:8000/api/nguoidungbycongviec/:id
const findNguoiDungByCongViec = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const maCongViec = req.params.id;
  const query = "SELECT * FROM nguoidung JOIN nguoidung_congviec ON nguoidung.MaNguoiDung = nguoidung_congviec.MaNguoiDung JOIN congviec ON congviec.MaCongViec = nguoidung_congviec.MaCongViec WHERE nguoidung_congviec.MaCongViec = ?";
    // Thực hiện truy vấn
    connection.query(
      query,
      [maCongViec],
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL: " + err.stack);
          return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        // Trả về kết quả dưới dạng JSON
        if (results.length == 0) {
          return res.status(404).json({ error: "Không có công việc" });
        } else {
          res.json(results);
        }
      }
    );
};

// SELECT *
// FROM tailieucv
// JOIN congviec_tailieucv ON tailieucv.MaTaiLieuCV = congviec_tailieucv.MaTaiLieuCV
// JOIN congviec ON congviec.MaCongViec = congviec_tailieucv.MaCongViec
// WHERE congviec_tailieucv.MaCongViec = '230620231910001704416' AND congviec_tailieucv.TrangThai != 6;
/// GET /api/tailieubycongviec/:id
// GET http://localhost:8000/api/tailieubycongviec/:id
const findTaiLieuByCongViec = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const maCongViec = req.params.id;
  const query = "SELECT * FROM tailieucv JOIN congviec_tailieucv ON tailieucv.MaTaiLieuCV = congviec_tailieucv.MaTaiLieuCV JOIN congviec ON congviec.MaCongViec = congviec_tailieucv.MaCongViec WHERE congviec_tailieucv.MaCongViec = ? AND congviec_tailieucv.TrangThai != 6";
    // Thực hiện truy vấn
    connection.query(
      query,
      [maCongViec],
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL: " + err.stack);
          return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        // Trả về kết quả dưới dạng JSON
        if (results.length == 0) {
          return res.status(404).json({ error: "Không có tài liệu cho công việc "+ maCongViec });
        } else {
          res.json(results);
        }
      }
    );
};


// Sửa phân công công việc
// PUT http://localhost:8000/api/editPhanCongCongViec/:id
const editPhanCongCongViec = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const maCongViec = req.params.id;
  const { MaNguoiDung } = req.body;
  const taptin = req.files;

  // Xóa dữ liệu trong bảng congviec_tailieucv
  const queryXoaCongViec_TaiLieuCV = "DELETE FROM congviec_tailieucv WHERE MaCongViec = ?";
  connection.query(queryXoaCongViec_TaiLieuCV, [maCongViec], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa công việc - tài liệu công việc:", err);
      return res.status(500).json({ error: "Lỗi khi xóa công việc - tài liệu công việc." });
    }

    // Xóa dữ liệu trong bảng nguoidung_congviec
    const queryXoaNguoiDungCV = "DELETE FROM nguoidung_congviec WHERE MaCongViec = ?";
    connection.query(queryXoaNguoiDungCV, [maCongViec], (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa người dùng công việc:", err);
        return res.status(500).json({ error: "Lỗi khi xóa người dùng công việc." });
      }

      // Tiến hành thêm dữ liệu mới
      const queryThemNguoiDung_CV = "INSERT INTO NguoiDung_CongViec (MaND_CV, MaNguoiDung, MaCongViec) VALUES ?";

      if (typeof MaNguoiDung === "string") {
        const values = [[moment().format("DDMMYYYYHHmmss") + "" + Math.floor(Math.random() * 10000000), MaNguoiDung, maCongViec]];

        connection.query(queryThemNguoiDung_CV, [values], (err, result) => {
          if (err) {
            console.error("Lỗi khi phân công công việc:", err);
            return res.status(500).json({ error: "Lỗi khi phân công công việc." });
          }

          if (taptin.length === 0) {
            return res.status(200).json({ success: "Công việc đã được cập nhật thành công." });
          }

          // Code xử lý tập tin tại đây (nếu cần)
          const valuesTaiLieu = taptin.map((file) => {
            const maTaiLieuCV = moment().format("DDMMYYYYHHmmss") + "" + Math.floor(Math.random() * 10000000);
            const maCV_TL = moment().format("DDMMYYYYHHmmss") + "" + Math.floor(Math.random() * 15000000);
            return [maTaiLieuCV, file.originalname, maCV_TL];
          });

          const queryThemTaiLieuCV = "INSERT INTO TaiLieuCV (MaTaiLieuCV, TenTaiLieuCV) VALUES ?";
          const queryThemCV_TaiLieuCV = "INSERT INTO congviec_tailieucv (MaCV_TL, MaCongViec, MaTaiLieuCV, TrangThai) VALUES ?";

          connection.query(queryThemTaiLieuCV, [valuesTaiLieu.map((value) => [value[0], value[1]])], (err, result) => {
            if (err) {
              console.error("Lỗi khi thêm tài liệu:", err);
              return res.status(500).json({ error: "Lỗi khi thêm tài liệu." });
            }

            const valuesCV_TL = valuesTaiLieu.map((value) => [value[2], maCongViec, value[0], 1]);

            connection.query(queryThemCV_TaiLieuCV, [valuesCV_TL], (err, result) => {
              if (err) {
                console.error("Lỗi khi thêm tài liệu cho công việc:", err);
                return res.status(500).json({ error: "Lỗi khi thêm tài liệu cho công việc." });
              }
              return res.status(201).json({ success: "Tài liệu cho công việc đã được tạo thành công." });
            });
          });
        });
      } else {
        const values = MaNguoiDung.map((maNguoiDung) => [moment().format("DDMMYYYYHHmmss") + "" + Math.floor(Math.random() * 10000000), maNguoiDung, maCongViec]);

        connection.query(queryThemNguoiDung_CV, [values], (err, result) => {
          if (err) {
            console.error("Lỗi khi phân công công việc:", err);
            return res.status(500).json({ error: "Lỗi khi phân công công việc." });
          }

          if (taptin.length === 0) {
            return res.status(200).json({ success: "Công việc đã được cập nhật thành công." });
          }

          const valuesTaiLieu = taptin.map((file) => {
            const maTaiLieuCV = moment().format("DDMMYYYYHHmmss") + "" + Math.floor(Math.random() * 10000000);
            const maCV_TL = moment().format("DDMMYYYYHHmmss") + "" + Math.floor(Math.random() * 15000000);
            return [maTaiLieuCV, file.originalname, maCV_TL];
          });

          const queryThemTaiLieuCV = "INSERT INTO TaiLieuCV (MaTaiLieuCV, TenTaiLieuCV) VALUES ?";
          const queryThemCV_TaiLieuCV = "INSERT INTO congviec_tailieucv (MaCV_TL, MaCongViec, MaTaiLieuCV, TrangThai) VALUES ?";

          connection.query(queryThemTaiLieuCV, [valuesTaiLieu.map((value) => [value[0], value[1]])], (err, result) => {
            if (err) {
              console.error("Lỗi khi thêm tài liệu:", err);
              return res.status(500).json({ error: "Lỗi khi thêm tài liệu." });
            }

            const valuesCV_TL = valuesTaiLieu.map((value) => [value[2], maCongViec, value[0], 1]);

            connection.query(queryThemCV_TaiLieuCV, [valuesCV_TL], (err, result) => {
              if (err) {
                console.error("Lỗi khi thêm tài liệu cho công việc:", err);
                return res.status(500).json({ error: "Lỗi khi thêm tài liệu cho công việc." });
              }
              return res.status(201).json({ success: "Tài liệu cho công việc đã được tạo thành công." });
            });
          });
        });
      }
    });
  });
};

// SELECT CV.TenCongViec AS TenCongViec, TL.TenTaiLieuCV AS TenTaiLieu, CONCAT(ND.HoLot, ' ', ND.Ten) AS HoVaTen, CV.MoTaCongViec AS MoTaCongViec, CV.TrangThai AS TrangThaiCongViec
// FROM nguoidung ND
// JOIN nguoidung_congviec NDCV ON ND.MaNguoiDung = NDCV.MaNguoiDung
// JOIN congviec CV ON NDCV.MaCongViec = CV.MaCongViec
// JOIN congviec_tailieucv CVTL ON CV.MaCongViec = CVTL.MaCongViec
// JOIN tailieucv TL ON CVTL.MaTaiLieuCV = TL.MaTaiLieuCV
// WHERE CV.MaCongViec = '290620231535405103121';
const detailCongViec = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const maCongViec = req.params.id;
  const query = "SELECT CV.TenCongViec AS TenCongViec, TL.TenTaiLieuCV AS TenTaiLieu, CONCAT(ND.HoLot, ' ', ND.Ten) AS HoVaTen, CV.MoTaCongViec AS MoTaCongViec, CV.TrangThai AS TrangThaiCongViec FROM nguoidung ND JOIN nguoidung_congviec NDCV ON ND.MaNguoiDung = NDCV.MaNguoiDung JOIN congviec CV ON NDCV.MaCongViec = CV.MaCongViec JOIN congviec_tailieucv CVTL ON CV.MaCongViec = CVTL.MaCongViec JOIN tailieucv TL ON CVTL.MaTaiLieuCV = TL.MaTaiLieuCV WHERE CV.MaCongViec = ?;";
    // Thực hiện truy vấn
    connection.query(
      query,
      [maCongViec],
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL: " + err.stack);
          return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        //Trả về kết quả dưới dạng JSON
        if (results.length == 0) {
          return res.status(200).json({ success: "Không có "+ maCongViec });
        } else {
          res.json(results);
        }
        
      }
    );
};


module.exports = {
  findAll,
  findid,
  create,
  createFromFile,
  findOne,
  findByDuAn,
  update,
  deleteTT,
  deleteVV,
  phanCongCongViec,
  editPhanCongCongViec,
  findNguoiDungByCongViec, 
  findTaiLieuByCongViec,
    detailCongViec,
}

