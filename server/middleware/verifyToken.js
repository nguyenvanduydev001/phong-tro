const jsonwebtoken = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(' ')[1]
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    mes: 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại'
                })
            }
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Bạn phải đăng nhập mới dùng được chức năng này'
        })
    }
}
const isAdmin = (req, res, next) => {
    const { role } = req.user
    if (+role !== 1010)
        throw new Error('Cần role Admin')
    next()
}

module.exports = {
    verifyToken,
    isAdmin,
}