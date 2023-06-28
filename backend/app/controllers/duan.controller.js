const { config, connection } = require('../config/index');
const moment = require('moment');

function postDuAn(req, res) {
    // const {originalname} = req.file;
    const { TenDuAn, MoTaDuAn, NgayBatDau, NgayKetThuc, TrangThai } = req.body;
    const timestamp = moment().format('x');
    const MaDuAn = 'DA' + timestamp;
    const query = 'INSERT INTO duan (MaDuAn, TenDuAn, MoTaDuAn, NgayBatDau, NgayKetThuc, TrangThai) VALUES (?, ?, ?, ?, ?, ?)'
    connection.query(query, [MaDuAn, TenDuAn, MoTaDuAn, NgayBatDau, NgayKetThuc, TrangThai], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lối truy vấn cơ sở dữ liệu.' });
        } else {
            res.json({ message: 'Thêm dự án thành công' });
        }
    });
};

function deleteDuAn(req, res) {
    const id = req.params.id;
    const query = 'DELETE FROM duan WHERE MaDuAn = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Không tìm thấy dự án.' });
        } else {
            res.json({ message: 'Xóa dự án thành công.' });
        }
    });
};

function getAllDuAn(req, res) {
    const query = 'SELECT * FROM duan';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else {
            res.json(results);
        }
    });
};

function putDuAn(req, res) {
    const MaDuAn = req.params.id;
    const { TenDuAn, MoTaDuAn, NgayBatDau, NgayKetThuc, TrangThai } = req.body;
    const query = 'UPDATE duan SET TenDuAn= ?, MoTaDuAn = ?, NgayBatDau= ?, NgayKetThuc= ?, TrangThai= ? WHERE MaDuAn = ?';
    connection.query(query, [TenDuAn, MoTaDuAn, NgayBatDau, NgayKetThuc, TrangThai, MaDuAn], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn: ', error);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu.' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Không tìm thấy dự án.' });
        } else {
            res.json({ MaDuAn, TenDuAn, MoTaDuAn, NgayBatDau, NgayKetThuc, TrangThai });
        }
    });
};

function getDuAn(req, res) {
  const duanId = req.params.id;

  // Query SQL để tìm dự án theo id
  const query = 'SELECT * FROM duan WHERE MaDuAn = ?';

  connection.query(query, [duanId], (err, result) => {
    if (err) {
      console.error('Lỗi khi tìm dự án:', err);
      return res.status(500).json({ error: 'Lỗi khi tìm dự án.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy dự án.' });
    }

    // Trả về dự án tìm được
    const duan = result[0];
    return res.status(200).json(duan);
  });
};

module.exports = {
    postDuAn,
    deleteDuAn,
    getAllDuAn,
    putDuAn,
    getDuAn
}