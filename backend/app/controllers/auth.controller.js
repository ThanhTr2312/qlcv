const { config, connection } = require('../config/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequestError } = require("../helpers/errors");

exports.login = (req, res, next) => {
    const { Username, Password } = req.body;

    connection.query(
        'SELECT * FROM nguoidung WHERE Username = ?', [Username],
        (error, results) => {
            if (error) {
                console.log(error);
                return next(new BadRequestError(500));
            }

            if (results.length > 0) {
                const user = results[0];
                const roles = {
                    '01': 'admin',
                    '02': 'director',
                    '03': 'manager',
                    '04': 'member'
                };
                // xử lý so mã hóa
                bcrypt.compare(Password, user.Password, function(err, isMatch) {
                    if (err) {
                        console.log(err);
                        return next(new BadRequestError(500));
                    }
                    if (isMatch) {
                        const role = roles[user.MaLoaiNguoiDung];

                        if (!role) {
                            return next(new BadRequestError(401, 'Invalid role'));
                        }

                        const token = jwt.sign({
                            MaNguoiDung: user.MaNguoiDung,
                            Username: user.Username,
                            MaLoaiNguoiDung: user.MaLoaiNguoiDung,
                            Role: role
                        }, config.jwt.secret, {
                            expiresIn: 86400, // 24 hours
                        });


                        res.status(200).send({
                            id: user.MaNguoiDung,
                            Username: user.Username,
                            MaLoaiNguoiDung: user.MaLoaiNguoiDung,
                            Role: role,
                            accessToken: token,
                        });
                    } else {
                        return next(new BadRequestError(401, 'Incorrect password'));
                    }

                }); //

            } else {
                return next(new BadRequestError(401, 'Incorrect username'));
            }
        }
    );
};