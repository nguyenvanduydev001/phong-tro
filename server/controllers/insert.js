const db = require('../models')
const asyncHandler = require('express-async-handler')
const { categories, roles, priceOptions, areaOptions } = require('../ultils/constants')
const chothuecanho = require('../data/chothuecanho.json')
const nhachotue = require('../data/nhachothue.json')
const chothuephongtro = require('../data/chothuephongtro.json')

const initData = asyncHandler(async (req, res) => {
    const [cateRs, roleRs, optionRs] = await Promise.all([
        db.Category.bulkCreate(categories),
        db.Role.bulkCreate(roles),
        db.Option.bulkCreate(priceOptions),
    ])
    await db.Option.bulkCreate(areaOptions)
    return res.json({
        success: true,
        mes: `${cateRs ? 'Inserted data' : 'Failed to insert'} table category - ${roleRs ? 'Inserted data' : 'Failed to insert'} table role - ${optionRs ? 'Inserted data' : 'Failed to insert'} table option`
    })
})
const mockup = asyncHandler(async (req, res) => {
    const chothuecanhodata = chothuecanho.body.map((el, idx) => ({
        images: el.images,
        title: el.header.title,
        star: el.header.star,
        address: el.header.address,
        description: el.mainContent.content?.join(', '),
        category: 3,
        price: Math.round(Math.random() * 100000) * 1000 + 500000,
        area: Math.round(Math.random() * 500) + 2,
        target: 'Tất cả',
        postedBy: 3 + idx,
        expiredDate: Date.now() + process.env.DEFAULT_DAYS * 24 * 3600 * 1000
    }))
    const chothuephongtrodata = chothuephongtro.body.map((el, idx) => ({
        images: el.images,
        title: el.header.title,
        star: el.header.star,
        address: el.header.address,
        description: el.mainContent.content?.join(', '),
        category: 1,
        price: Math.round(Math.random() * 100000) * 1000 + 500000,
        area: Math.round(Math.random() * 500) + 2,
        target: 'Tất cả',
        postedBy: 3 + idx,
        expiredDate: Date.now() + process.env.DEFAULT_DAYS * 24 * 3600 * 1000
    }))
    const nhachotuedata = nhachotue.body.map((el, idx) => ({
        images: el.images,
        title: el.header.title,
        star: el.header.star,
        address: el.header.address,
        description: el.mainContent.content?.join(', '),
        category: 2,
        price: Math.round(Math.random() * 100000) * 1000 + 500000,
        area: Math.round(Math.random() * 500) + 2,
        target: 'Tất cả',
        postedBy: 3 + idx,
        expiredDate: Date.now() + process.env.DEFAULT_DAYS * 24 * 3600 * 1000
    }))
    const userdata = [...chothuecanho.body, ...nhachotue.body, ...chothuephongtro.body].map(el => ({
        name: el.contact?.content[0]?.content,
        phone: el.contact?.content[1]?.content,
        password: '123456'
    })).filter((el, idx, self) => idx === self.findIndex(u => u.phone === el.phone))
    const user = await db.User.bulkCreate(userdata)
    const response = await db.Post.bulkCreate([...chothuecanhodata, ...chothuephongtrodata, ...nhachotuedata])
    return res.json({
        success: true,
        mes: 'OKE'
        // userdata
    })
})
module.exports = {
    initData,
    mockup
}