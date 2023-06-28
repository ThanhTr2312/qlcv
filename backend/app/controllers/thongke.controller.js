const { config, connection } = require('../config/index');

// Thống kê theo trạng thái
const trangThaiCVMapping = {
    0: "Chưa bắt đầu",
    1: "Trạng thái 1",
    2: "Trạng thái 2",
    3: "Trạng thái 3",
    4: "Trạng thái 4",
    5: "Trạng thái 5",
};

const getTKCongViecTrangThai = ((req, res) => {
    const query = 'SELECT TrangThai, COUNT(*) as SoLuong FROM congviec GROUP BY TrangThai';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            const transformedResults = results.map(item => ({
                ...item,
                TrangThai: trangThaiCVMapping[item.TrangThai]
            }));
            res.json(transformedResults);
        }
    });
});

// Thống kê theo độ ưu tiên
// http://localhost:8000/api/congviec/uutien/thongke
const uuTienMapping = {
    1: "Ưu tiên 1",
    2: "Ưu tiên 2",
    3: "Ưu tiên 3",
    4: "Ưu tiên 4",
    5: "Ưu tiên 5",
};

const getTKCongViecUuTien = ((req, res) => {
    const query = 'SELECT UuTien, COUNT(*) as SoLuong FROM congviec GROUP BY UuTien';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            const transformedResults = results.map(item => ({
                ...item,
                UuTien: uuTienMapping[item.UuTien]
            }));
            res.json(transformedResults);
        }
    });
});
// Thống kê người thực hiện công việc
// Số lượng công việc được giao cho từng người theo trạng thái công việc

const getTKNDCongViecUuTien = ((req, res) => {
    const query = `
      SELECT congviec.TrangThai, COUNT(*) as SoLuong
      FROM nguoidung_congviec
      INNER JOIN congviec ON nguoidung_congviec.MaCongViec = congviec.MaCongViec
      GROUP BY congviec.TrangThai
    `;
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            const transformedResults = results.map(item => ({
                ...item,
                TrangThai: trangThaiCVMapping[item.TrangThai]
            }));
            res.json(transformedResults);
        }
    });
});

// Số lượng công việc trong tháng hiện tại của người dùng đó
const getTKNDCongViecTrongThang = ((req, res) => {
    const query = `
      SELECT
      nguoidung.MaNguoiDung,
      nguoidung.HoLot,
      nguoidung.Ten,
      COUNT(*) AS SoLuongCongViec
    FROM
      nguoidung
      INNER JOIN nguoidung_congviec ON nguoidung.MaNguoiDung = nguoidung_congviec.MaNguoiDung
      INNER JOIN congviec ON nguoidung_congviec.MaCongViec = congviec.MaCongViec
    WHERE
      (MONTH(congviec.NgayBatDau) <= MONTH(CURRENT_DATE())
      AND MONTH(congviec.NgayKetThuc) >= MONTH(CURRENT_DATE()))
    GROUP BY
      nguoidung.MaNguoiDung,
      nguoidung.HoLot,
      nguoidung.Ten;
      `;
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            res.json(results);
        }
    });
});

//   // Số lượng công việc đã hoàn thành của từng người.

//   // Số lượng công việc đang tiến hành của từng người.

//   // Thống kê người dùng
const getTKNguoiDung = ((req, res) => {
    const query = 'SELECT GioiTinh, COUNT(*) as SoLuong FROM nguoidung GROUP BY GioiTinh';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            res.json(results);
        }
    });
});

//   // Thống kê dự án
const trangThaiMapping = {
    0: "Bắt đầu",
    1: "Giai đoạn 1",
    2: "Giai đoạn 2",
    3: "Giai đoạn 3",
    4: "Giai đoạn 4",
    5: "Hoàn thành",
};

const getTKDuAn = ((req, res) => {
    const query = 'SELECT TrangThai, COUNT(*) as SoLuong FROM duan GROUP BY TrangThai';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            const transformedResults = results.map(item => ({
                ...item,
                TrangThai: trangThaiMapping[item.TrangThai]
            }));
            res.json(transformedResults);
        }
    });
});

module.exports = {
    getTKCongViecTrangThai,
    getTKCongViecUuTien,
    getTKNDCongViecUuTien,
    getTKNDCongViecTrongThang,
    getTKNguoiDung,
    getTKDuAn
}