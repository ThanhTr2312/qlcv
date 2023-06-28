const { BadRequestError } = require("./errors");

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Kiểm tra xem người dùng đã được xác thực chưa
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Lấy mã loại người dùng của người dùng
        const userRole = req.user.Role;

        // Kiểm tra quyền truy cập dựa trên mã loại người dùng
        if (!allowedRoles.includes(userRole)) {
            const errorMessage = `Access denied for role: ${userRole}`;
            return next(new BadRequestError(403, errorMessage));
        }

        // Người dùng có quyền truy cập, tiếp tục xử lý
        next();
    };
};

module.exports = {
    checkRole,
}